'use server';

import { createClient } from '@/utils/supabase/server';

export const getAuthStatus = async () => {
  const supabase = createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    console.error('Error getting user:', authError);
    throw authError;
  }

  if (!user) {
    return { success: false };
  }

  return { success: true, user };
};
