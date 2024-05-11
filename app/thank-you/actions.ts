'use server';

import { createClient } from '@/utils/supabase/server';

export const getPaymentStatus = async ({ orderId }: { orderId: string }) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('You need to be logged in');
  }

  const { data: order, error } = await supabase
    .from('Order')
    .select(
      `
    *,
    billingaddress:billingaddress(*),
    configuration:configuration(*),
    shippingaddress:shippingaddress(*),
    user:profiles(*)
  `
    )
    .eq('id', orderId)
    .eq('userid', user.id)
    .single();

  if (error) {
    console.error('Error fetching order:', error);
    throw new Error('This order does not exist.');
  }

  if (order.ispaid) {
    return order;
  } else {
    return false;
  }
};
