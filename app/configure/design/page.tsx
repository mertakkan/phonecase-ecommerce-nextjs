import { notFound } from 'next/navigation';
import DesignConfigurator from './design-configurator';
import { createClient } from '@/utils/supabase/client';

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
const supabase = createClient();

const Page = async ({ searchParams }: PageProps) => {
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

  const { imageUrl, width, height } = configuration;

  return (
    <DesignConfigurator
      configId={configuration.id}
      imageDimensions={{ width, height }}
      imageUrl={imageUrl}
    />
  );
};

export default Page;
