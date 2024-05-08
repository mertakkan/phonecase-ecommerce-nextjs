import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { z } from 'zod';
import sharp from 'sharp';
import { createClient } from '@/utils/supabase/client';

const f = createUploadthing();

const supabase = createClient();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { configId } = metadata.input;

      const res = await fetch(file.url);
      const buffer = await res.arrayBuffer();

      const imgMetadata = await sharp(buffer).metadata();
      const { width, height } = imgMetadata;

      if (!configId) {
        const { data: configuration, error } = await supabase
          .from('configuration')
          .insert({
            imageurl: file.url,
            height: height || 500,
            width: width || 500,
          })
          .select('id')
          .single();

        if (error) {
          throw new Error('Failed to create configuration');
        }

        return { configId: configuration.id };
      } else {
        const { data: updatedConfiguration, error } = await supabase
          .from('configuration')
          .update({ croppedimageurl: file.url })
          .eq('id', configId)
          .select('id')
          .single();

        if (error) {
          throw new Error('Failed to update configuration');
        }

        return { configId: updatedConfiguration.id };
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
