/**
 * Admin — Yorum Yönetimi
 */
import type { Metadata } from 'next';
import { createAdminClient } from '@/lib/supabase/server';
import { Star }              from 'lucide-react';
import { TestimonialToggle } from '@/components/admin/TestimonialToggle';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Yorumlar — Admin' };

export default async function YorumlarPage() {
  const supabase = createAdminClient();
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-4xl space-y-5">
      <h1 className="font-display text-2xl font-bold text-neutral-800">Yorumlar</h1>

      <div className="flex flex-col gap-3">
        {(!testimonials || testimonials.length === 0) ? (
          <div className="bg-white rounded-xl border border-neutral-100 py-16 text-center text-sm text-neutral-400">
            Henüz yorum yok.
          </div>
        ) : (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (testimonials as any[]).map((t) => (
            <div
              key={t.id}
              className={`bg-white rounded-xl border shadow-sm p-5 flex gap-4 ${
                t.is_visible ? 'border-neutral-100' : 'border-dashed border-neutral-200 opacity-60'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-neutral-800 text-sm">{t.customer_name}</p>
                  {t.event_type && (
                    <span className="text-xs bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded-full">
                      {t.event_type}
                    </span>
                  )}
                </div>
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={i < t.rating ? 'fill-primary text-primary' : 'text-neutral-200'}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">{t.comment}</p>
              </div>
              <TestimonialToggle id={t.id} visible={t.is_visible} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
