/**
 * Admin — Sipariş Yönetimi
 */
import type { Metadata } from 'next';
import { createAdminClient } from '@/lib/supabase/server';
import { formatPrice, formatDate } from '@/lib/utils';
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

const STATUS_STYLES: Record<OrderStatus, { label: string; color: string; bg: string; dot: string }> = {
  beklemede:    { label: 'Beklemede',    color: '#FBBF24', bg: 'rgba(251,191,36,0.08)',  dot: '#FBBF24' },
  hazirlaniyor: { label: 'Hazırlanıyor', color: '#60A5FA', bg: 'rgba(96,165,250,0.08)',  dot: '#60A5FA' },
  tamamlandi:   { label: 'Tamamlandı',   color: '#34D399', bg: 'rgba(52,211,153,0.08)',  dot: '#34D399' },
  iptal:        { label: 'İptal',        color: '#F87171', bg: 'rgba(248,113,113,0.08)', dot: '#F87171' },
};

const statusOptions = [
  { value: 'hepsi',        label: 'Tümü' },
  { value: 'beklemede',    label: 'Beklemede' },
  { value: 'hazirlaniyor', label: 'Hazırlanıyor' },
  { value: 'tamamlandi',   label: 'Tamamlandı' },
  { value: 'iptal',        label: 'İptal' },
];

export default async function SiparislerPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const orders = await getOrders(params.durum, params.q);
  const active = params.durum ?? 'hepsi';

  return (
    <div className="max-w-6xl space-y-5">

      {/* Başlık */}
      <div className="flex items-end justify-between">
        <div>
          <h1
            className="text-[22px] font-semibold text-admin-text"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Siparişler
          </h1>
          <p className="text-admin-muted text-[13px] mt-0.5">{orders.length} sipariş</p>
        </div>
      </div>

      {/* Filtreler + arama */}
      <div
        className="rounded-xl px-4 py-3 flex flex-wrap items-center gap-2"
        style={{ background: '#13151B', border: '1px solid #1D2029' }}
      >
        <div className="flex flex-wrap gap-1.5">
          {statusOptions.map((opt) => (
            <a
              key={opt.value}
              href={`/admin/siparisler?durum=${opt.value}`}
              className="px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all"
              style={
                active === opt.value
                  ? {
                      background: 'rgba(184,134,11,0.12)',
                      color: '#D4A017',
                      border: '1px solid rgba(184,134,11,0.25)',
                    }
                  : {
                      background: 'transparent',
                      color: '#696C7B',
                      border: '1px solid #252830',
                    }
              }
            >
              {opt.label}
            </a>
          ))}
        </div>
        <form className="ml-auto">
          <input
            name="q"
            defaultValue={params.q}
            placeholder="Sipariş no veya müşteri ara..."
            className="h-8 px-3 text-[12.5px] rounded-lg outline-none w-52 transition-all"
            style={{
              background: '#0D0F14',
              border: '1px solid #252830',
              color: '#E8EAF0',
            }}
          />
        </form>
      </div>

      {/* Tablo */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: '#13151B', border: '1px solid #1D2029' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid #1D2029' }}>
                {[
                  { label: 'Sipariş No', cls: '' },
                  { label: 'Müşteri',    cls: '' },
                  { label: 'Tür',        cls: 'hidden sm:table-cell' },
                  { label: 'Tarih',      cls: 'hidden md:table-cell' },
                  { label: 'Durum',      cls: '' },
                  { label: 'Tutar',      cls: 'hidden lg:table-cell text-right' },
                  { label: '',           cls: '' },
                ].map((h, i) => (
                  <th
                    key={i}
                    className={`px-4 py-3 text-left text-[10.5px] font-semibold tracking-wider uppercase text-admin-muted ${h.cls}`}
                  >
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-14 text-center text-[13px] text-admin-muted">
                    Sipariş bulunamadı.
                  </td>
                </tr>
              ) : (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (orders as any[]).map((order, idx) => {
                  const s = STATUS_STYLES[order.status as OrderStatus];
                  return (
                    <tr
                      key={order.id}
                      style={{ borderBottom: idx < orders.length - 1 ? '1px solid #1D2029' : 'none' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td className="px-4 py-3.5">
                        <span className="text-[11.5px] font-mono" style={{ color: '#B8860B' }}>
                          {order.order_number}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <p className="text-[13px] font-medium text-admin-text">{order.customer_name}</p>
                        <p className="text-[11.5px] text-admin-muted mt-0.5">{order.customer_email}</p>
                      </td>
                      <td className="px-4 py-3.5 hidden sm:table-cell">
                        <span className="text-[12.5px] text-admin-muted capitalize">{order.event_type}</span>
                      </td>
                      <td className="px-4 py-3.5 hidden md:table-cell">
                        <span className="text-[12.5px] text-admin-muted">{formatDate(order.created_at)}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className="inline-flex items-center gap-1.5 text-[11.5px] font-medium px-2.5 py-1 rounded-full"
                          style={{ color: s.color, background: s.bg }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.dot }} />
                          {s.label}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 hidden lg:table-cell text-right">
                        <span className="text-[13px] font-medium text-admin-text">
                          {formatPrice(Number(order.total_price))}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <OrderDetailModal order={order} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
