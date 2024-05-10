'use server';

import { notFound } from 'next/navigation';
import { BASE_PRICE, PRODUCT_PRICES } from '@/config/products';
import { stripe } from '@/lib/stripe';
import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

type OrderStatus = 'awaiting_shipment' | 'shipped' | 'delivered' | 'cancelled';

type Order = {
  id: string;
  configurationid: string;
  userid: string;
  amount: number;
  ispaid: boolean;
  status: OrderStatus;
  shippingaddressid: string | null;
  billingaddressid: string | null;
  createdat: string;
  updated: string;
};

export const createCheckoutSession = async ({
  configId,
}: {
  configId: string;
}) => {
  const { data: configuration, error } = await supabase
    .from('configuration')
    .select('*')
    .eq('id', configId)
    .single();

  if (error || !configuration) {
    console.error('Error fetching configuration:', error);
    return notFound();
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('You need to be logged in');
  }

  const { finish, material } = configuration;

  let price = BASE_PRICE;
  if (finish === 'textured') price += PRODUCT_PRICES.finish.textured;
  if (material === 'polycarbonate')
    price += PRODUCT_PRICES.material.polycarbonate;

  let order: Order | undefined = undefined;

  const { data: existingOrder, error: existingOrderError } = await supabase
    .from('Order')
    .select('*')
    .eq('userid', user.id)
    .eq('configurationid', configuration.id)
    .single();

  console.log(user.id, configuration.id);

  if (existingOrder && !existingOrderError) {
    order = existingOrder;
  } else {
    const { data: newOrder, error: newOrderError } = await supabase
      .from('Order')
      .insert({
        amount: price / 100,
        userid: user.id,
        configurationid: configuration.id,
      })
      .single();

    if (newOrderError) {
      throw new Error('Failed to create order');
    }

    order = newOrder;
  }

  const product = await stripe.products.create({
    name: 'Custom iPhone Case',
    images: [configuration.imageurl],
    default_price_data: {
      currency: 'USD',
      unit_amount: price,
    },
  });

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${
      order!.id
    }`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
    payment_method_types: ['card'],
    mode: 'payment',
    shipping_address_collection: { allowed_countries: ['DE', 'US'] },
    metadata: {
      userid: user.id,
      orderid: order!.id,
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
  });

  return { url: stripeSession.url };
};
