import { notFound } from 'next/navigation';
import DesignPreview from './design-preview';
import { createClient } from '@/utils/supabase/server';

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const supabase = createClient();
  const { id } = searchParams;

  if (!id || typeof id !== 'string') {
    return notFound();
  }

  const { data: configuration, error } = await supabase
    .from('configuration')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !configuration) {
    console.error('Error fetching configuration:', error);
    return notFound();
  }

  return <DesignPreview configuration={configuration} />;
};

export default Page;
