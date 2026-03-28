/**
 * Admin — Tasarım Yönetimi
 */
import type { Metadata } from 'next';
import { createAdminClient } from '@/lib/supabase/server';
import { formatPrice }        from '@/lib/utils';
import { EVENT_TYPES, TEMPLATE_STYLES } from '@/lib/constants';
import { TemplateToggle }     from '@/components/admin/TemplateToggle';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Tasarımlar — Admin' };

export default async function AdminTasarimlarPage() {
  const supabase = createAdminClient();
  const { data: templates } = await supabase
    .from('templates')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-5xl space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-neutral-800">Tasarımlar</h1>
        <span className="text-sm text-neutral-400">{templates?.length ?? 0} tasarım</span>
      </div>

      <div className="bg-white rounded-xl border border-neutral-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-400 uppercase">Tasarım</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-400 uppercase hidden sm:table-cell">Kategori</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-400 uppercase hidden md:table-cell">Stil</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-neutral-400 uppercase">Fiyat</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-neutral-400 uppercase">Aktif</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-neutral-400 uppercase">Popüler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {(!templates || templates.length === 0) ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm text-neutral-400">
                    Tasarım bulunamadı.
                  </td>
                </tr>
              ) : (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (templates as any[]).map((t) => (
                  <tr key={t.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {t.preview_images?.[0] && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={t.preview_images[0]}
                            alt={t.name}
                            className="w-10 h-10 rounded-lg object-cover shrink-0"
                          />
                        )}
                        <div>
                          <p className="font-medium text-neutral-800">{t.name}</p>
                          <p className="text-xs text-neutral-400">{t.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-neutral-500 hidden sm:table-cell">
                      {EVENT_TYPES[t.category as keyof typeof EVENT_TYPES]}
                    </td>
                    <td className="px-4 py-3 text-neutral-500 hidden md:table-cell">
                      {TEMPLATE_STYLES[t.style as keyof typeof TEMPLATE_STYLES]}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-neutral-700">
                      {formatPrice(Number(t.price))}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <TemplateToggle id={t.id} field="is_active" value={t.is_active} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <TemplateToggle id={t.id} field="is_popular" value={t.is_popular} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
