'use server';

export type OrderStatus = 'fulfilled' | 'shipped' | 'awaiting_shipment';
import { createClient } from '@/utils/supabase/server';

export const changeOrderStatus = async ({
  id,
  newStatus,
}: {
  id: string;
  newStatus: OrderStatus;
}) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('Order')
    .update({ status: newStatus })
    .eq('id', id);

  if (error) {
    console.error('Error updating order status:', error);
    throw error;
  }

  return data;
};
