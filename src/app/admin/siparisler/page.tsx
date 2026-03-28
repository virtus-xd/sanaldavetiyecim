/**
 * Admin — Sipariş Yönetimi
 */
import type { Metadata } from 'next';
import { createAdminClient } from '@/lib/supabase/server';
import { formatPrice, formatDate } from '@/lib/utils';
import { ORDER_STATUSES }    from '@/lib/constants';
import { OrderStatusBadge }  from '@/components/admin/OrderStatusBadge';
import { OrderDetailModal }  from '@/components/admin/OrderDetailModal';
import type { OrderStatus }  from '@/types';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Siparişler — Admin' };

interface PageProps {
  searchParams: Promise<{ durum?: string; q?: string }>;
}

async function getOrders(status?: string, q?: string) {
  const supabase = createAdminClient();
  let query = supabase
    .from('orders')
    .select('*, templates(name)')
    .order('created_at', { ascending: false });

  if (status && status !== 'hepsi') query = query.eq('status', status);
  if (q) query = query.or(`customer_name.ilike.%${q}%,order_number.ilike.%${q}%`);

  const { data } = await query;
  return data ?? [];
}

export default async function SiparislerPage({ searchParams }: PageProps) {
  const params  = await searchParams;
  const orders  = await getOrders(params.durum, params.q);

  const statusOptions: { value: string; label: string }[] = [
    { value: 'hepsi',       label: 'Tümü' },
    { value: 'beklemede',   label: 'Beklemede' },
    { value: 'hazirlaniyor',label: 'Hazırlanıyor' },
    { value: 'tamamlandi',  label: 'Tamamlandı' },
    { value: 'iptal',       label: 'İptal' },
  ];

  return (
    <div className="max-w-6xl space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-neutral-800">Siparişler</h1>
        <span className="text-sm text-neutral-400">{orders.length} sipariş</span>
      </div>

      {/* Filtreler */}
      <div className="bg-white rounded-xl border border-neutral-100 p-4 flex flex-wrap gap-3">
        {statusOptions.map((opt) => (
          <a
            key={opt.value}
            href={`/admin/siparisler?durum=${opt.value}`}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              (params.durum ?? 'hepsi') === opt.value
                ? 'bg-primary text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {opt.label}
          </a>
        ))}
        <form className="ml-auto">
          <input
            name="q"
            defaultValue={params.q}
            placeholder="Sipariş no veya müşteri ara..."
            className="h-8 px-3 text-xs rounded-lg border border-neutral-200 bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-primary w-52"
          />
        </form>
      </div>

      {/* Tablo */}
      <div className="bg-white rounded-xl border border-neutral-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-400 uppercase">Sipariş No</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-400 uppercase">Müşteri</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-400 uppercase hidden sm:table-cell">Tür</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-400 uppercase hidden md:table-cell">Tarih</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-400 uppercase">Durum</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-neutral-400 uppercase hidden lg:table-cell">Tutar</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-sm text-neutral-400">
                    Sipariş bulunamadı.
                  </td>
                </tr>
              ) : (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (orders as any[]).map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-neutral-600">{order.order_number}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-neutral-800">{order.customer_name}</p>
                      <p className="text-xs text-neutral-400">{order.customer_email}</p>
                    </td>
                    <td className="px-4 py-3 text-neutral-500 capitalize hidden sm:table-cell">{order.event_type}</td>
                    <td className="px-4 py-3 text-neutral-500 hidden md:table-cell">{formatDate(order.created_at)}</td>
                    <td className="px-4 py-3">
                      <OrderStatusBadge status={order.status as OrderStatus} />
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-neutral-700 hidden lg:table-cell">
                      {formatPrice(Number(order.total_price))}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <OrderDetailModal order={order} />
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
