/**
 * Admin — Mesaj Yönetimi
 */
import type { Metadata } from 'next';
import { createAdminClient } from '@/lib/supabase/server';
import { formatDate }         from '@/lib/utils';
import { MessageCard }        from '@/components/admin/MessageCard';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Mesajlar — Admin' };

export default async function MesajlarPage() {
  const supabase = createAdminClient();
  const { data: messages } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const unread = (messages ?? []).filter((m: any) => !m.is_read).length;

  return (
    <div className="max-w-4xl space-y-5">
      <div className="flex items-center gap-3">
        <h1 className="font-display text-2xl font-bold text-neutral-800">Mesajlar</h1>
        {unread > 0 && (
          <span className="px-2 py-0.5 bg-primary text-white text-xs rounded-full font-semibold">
            {unread} okunmadı
          </span>
        )}
      </div>

      {(!messages || messages.length === 0) ? (
        <div className="bg-white rounded-xl border border-neutral-100 py-16 text-center text-neutral-400 text-sm">
          Henüz mesaj yok.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {(messages as any[]).map((msg) => (
            <MessageCard key={msg.id} message={msg} />
          ))}
        </div>
      )}
    </div>
  );
}
