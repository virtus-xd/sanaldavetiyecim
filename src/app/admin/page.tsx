/**
 * Admin Dashboard — özet kartları ve son siparişler.
 */
export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { ShoppingBag, Clock, CheckCircle2, Mail, ArrowUpRight } from 'lucide-react';
import { createAdminClient } from '@/lib/supabase/server';
import { formatPrice, formatDate } from '@/lib/utils';
import { ORDER_STATUSES } from '@/lib/constants';
import type { OrderStatus } from '@/types';

async function getDashboardData() {
  const supabase = createAdminClient();

  const [
    { count: totalOrders },
    { count: pendingOrders },
    { count: unreadMessages },
    { count: completedOrders },
    { data: recentOrders },
  ] = await Promise.all([
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'beklemede'),
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('is_read', false),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'tamamlandi'),
    supabase
      .from('orders')
      .select('id, order_number, customer_name, event_type, status, total_price, created_at')
      .order('created_at', { ascending: false })
      .limit(6),
  ]);

  return {
    totalOrders:     totalOrders     ?? 0,
    pendingOrders:   pendingOrders   ?? 0,
    unreadMessages:  unreadMessages  ?? 0,
    completedOrders: completedOrders ?? 0,
    recentOrders:    recentOrders    ?? [],
  };
}

const STATUS_STYLES: Record<OrderStatus, { label: string; color: string; bg: string; dot: string }> = {
  beklemede:    { label: 'Beklemede',   color: '#FBBF24', bg: 'rgba(251,191,36,0.08)',  dot: '#FBBF24' },
  hazirlaniyor: { label: 'Hazırlanıyor',color: '#60A5FA', bg: 'rgba(96,165,250,0.08)',  dot: '#60A5FA' },
  tamamlandi:   { label: 'Tamamlandı',  color: '#34D399', bg: 'rgba(52,211,153,0.08)',  dot: '#34D399' },
  iptal:        { label: 'İptal',       color: '#F87171', bg: 'rgba(248,113,113,0.08)', dot: '#F87171' },
};

export default async function AdminDashboard() {
  const { totalOrders, pendingOrders, unreadMessages, completedOrders, recentOrders } = await getDashboardData();

  const stats = [
    {
      label: 'Toplam Sipariş',
      value: totalOrders,
      icon: ShoppingBag,
      iconColor: '#60A5FA',
      iconBg: 'rgba(96,165,250,0.1)',
    },
    {
      label: 'Bekleyen',
      value: pendingOrders,
      icon: Clock,
      iconColor: '#FBBF24',
      iconBg: 'rgba(251,191,36,0.1)',
    },
    {
      label: 'Okunmamış Mesaj',
      value: unreadMessages,
      icon: Mail,
      iconColor: '#A78BFA',
      iconBg: 'rgba(167,139,250,0.1)',
    },
    {
      label: 'Tamamlanan',
      value: completedOrders,
      icon: CheckCircle2,
      iconColor: '#34D399',
      iconBg: 'rgba(52,211,153,0.1)',
    },
  ];

  return (
    <div className="max-w-5xl space-y-7">

      {/* Başlık */}
      <div className="flex items-end justify-between">
        <div>
          <h1
            className="text-[22px] font-semibold text-admin-text leading-tight"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Dashboard
          </h1>
          <p className="text-admin-muted text-[13px] mt-1">Sanal Davetiyecim yönetim paneli</p>
        </div>
        <div
          className="text-[11px] text-admin-muted px-2.5 py-1 rounded-md"
          style={{ border: '1px solid #1D2029', background: '#13151B' }}
        >
          {new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </div>

      {/* Stat kartları */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-5"
            style={{ background: '#13151B', border: '1px solid #1D2029' }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center mb-4"
              style={{ background: stat.iconBg }}
            >
              <stat.icon size={16} style={{ color: stat.iconColor }} aria-hidden="true" />
            </div>
            <p
              className="text-[28px] font-bold text-admin-text leading-none mb-1.5"
              style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '-1px' }}
            >
              {stat.value}
            </p>
            <p className="text-admin-muted text-[12px]">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Son siparişler */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: '#13151B', border: '1px solid #1D2029' }}
      >
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: '1px solid #1D2029' }}
        >
          <h2 className="text-admin-text text-[13.5px] font-semibold">Son Siparişler</h2>
          <Link
            href="/admin/siparisler"
            className="flex items-center gap-1 text-[12px] text-admin-muted hover:text-admin-gold transition-colors"
          >
            Tümünü Gör
            <ArrowUpRight size={13} />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="py-14 text-center text-[13px] text-admin-muted">
            Henüz sipariş yok.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #1D2029' }}>
                  {['Sipariş No', 'Müşteri', 'Tür', 'Durum', 'Tutar'].map((h, i) => (
                    <th
                      key={h}
                      className={`px-5 py-3 text-left text-[10.5px] font-semibold tracking-wider uppercase text-admin-muted ${
                        i === 2 ? 'hidden sm:table-cell' : ''
                      } ${i === 4 ? 'hidden md:table-cell text-right' : ''}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(recentOrders as any[]).map((order, idx) => {
                  const s = STATUS_STYLES[order.status as OrderStatus];
                  return (
                    <tr
                      key={order.id}
                      className="group transition-colors"
                      style={{
                        borderBottom: idx < recentOrders.length - 1 ? '1px solid #1D2029' : 'none',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td className="px-5 py-3.5">
                        <span
                          className="text-[11.5px] font-mono"
                          style={{ color: '#B8860B' }}
                        >
                          {order.order_number}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-[13px] font-medium text-admin-text">
                          {order.customer_name}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 hidden sm:table-cell">
                        <span className="text-[12px] text-admin-muted capitalize">
                          {order.event_type}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className="inline-flex items-center gap-1.5 text-[11.5px] font-medium px-2.5 py-1 rounded-full"
                          style={{ color: s.color, background: s.bg }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: s.dot }}
                          />
                          {s.label}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 hidden md:table-cell text-right">
                        <span className="text-[13px] font-medium text-admin-text">
                          {formatPrice(Number(order.total_price))}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
