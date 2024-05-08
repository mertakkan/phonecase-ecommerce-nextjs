'use server';
import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

export type OrderStatus = 'fulfilled' | 'shipped' | 'awaiting_shipment';
export type PhoneModel =
  | 'iphonex'
  | 'iphone11'
  | 'iphone12'
  | 'iphone13'
  | 'iphone14'
  | 'iphone15';
export type CaseMaterial = 'silicone' | 'polycarbonate';
export type CaseFinish = 'smooth' | 'textured';
export type CaseColor = 'black' | 'blue' | 'rose';

export type SaveConfigArgs = {
  color: CaseColor;
  finish: CaseFinish;
  material: CaseMaterial;
  model: PhoneModel;
  configId: string;
};

export async function saveConfig({
  color,
  finish,
  material,
  model,
  configId,
}: SaveConfigArgs) {
  const { error } = await supabase
    .from('configuration')
    .update({ color, finish, material, model })
    .eq('id', configId);

  if (error) {
    throw new Error('Failed to save configuration');
  }
}
