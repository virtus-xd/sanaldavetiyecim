/**
 * Müşteri yorumu veri erişim fonksiyonları — Supabase.
 */
import { createClient } from '@/lib/supabase/server';
import type { Testimonial } from '@/types';

function mapRow(row: Record<string, unknown>): Testimonial {
  return {
    id:           row.id           as string,
    customerName: row.customer_name as string,
    eventType:    (row.event_type  as string) ?? '',
    comment:      row.comment      as string,
    rating:       row.rating       as number,
    isVisible:    row.is_visible   as boolean,
    createdAt:    row.created_at   as string,
  };
}

/** Görünür yorumları döndürür */
export async function getVisibleTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_visible', true)
    .order('created_at', { ascending: false });

  if (error) { console.error('getVisibleTestimonials error:', error); return []; }
  return (data ?? []).map((r) => mapRow(r as Record<string, unknown>));
}
