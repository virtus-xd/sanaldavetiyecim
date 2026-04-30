/**
 * Admin — Tasarım Yönetimi
 */
import type { Metadata } from 'next';
import { createAdminClient } from '@/lib/supabase/server';
import { TemplateRow } from '@/components/admin/TemplateRow';

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
                <th className="text-right px-4 py-3 text-xs font-semibold text-neutral-400 uppercase">Fiyat</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-neutral-400 uppercase">Aktif</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-neutral-400 uppercase">Popüler</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-neutral-400 uppercase">Düzenle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {(!templates || templates.length === 0) ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-sm text-neutral-400">
                    Tasarım bulunamadı.
                  </td>
                </tr>
              ) : (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (templates as any[]).map((t) => (
                  <TemplateRow key={t.id} template={t} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
