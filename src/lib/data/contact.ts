/**
 * İletişim mesajı veri erişim fonksiyonları — Supabase.
 */
import { createAdminClient } from '@/lib/supabase/server';
import type { ContactFormValues } from '@/lib/validations';

/** Yeni iletişim mesajı kaydet */
export async function createContactMessage(data: ContactFormValues): Promise<{ success: boolean; error: string | null }> {
  const supabase = createAdminClient();

  const { error } = await supabase.from('contact_messages').insert({
    name:    data.name,
    email:   data.email,
    phone:   data.phone ?? null,
    message: data.message,
  });

  if (error) {
    console.error('createContactMessage error:', error);
    return { success: false, error: 'Mesaj gönderilemedi. Lütfen tekrar deneyin.' };
  }

  return { success: true, error: null };
}
