/**
 * Admin Dashboard — özet kartları ve son siparişler.
 */
export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { ShoppingBag, Clock, CheckCircle2, Mail, TrendingUp } from 'lucide-react';
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
    { data: recentOrders },
  ] = await Promise.all([
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'beklemede'),
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('is_read', false),
    supabase
      .from('orders')
      .select('id, order_number, customer_name, event_type, status, total_price, created_at')
      .order('created_at', { ascending: false })
      .limit(5),
  ]);

  return {
    totalOrders:    totalOrders ?? 0,
    pendingOrders:  pendingOrders ?? 0,
    unreadMessages: unreadMessages ?? 0,
    recentOrders:   recentOrders ?? [],
  };
}

const STATUS_COLORS: Record<OrderStatus, string> = {
  beklemede:    'text-yellow-600 bg-yellow-50',
  hazirlaniyor: 'text-blue-600 bg-blue-50',
  tamamlandi:   'text-green-600 bg-green-50',
  iptal:        'text-red-600 bg-red-50',
};

export default async function AdminDashboard() {
  const { totalOrders, pendingOrders, unreadMessages, recentOrders } = await getDashboardData();

  const stats = [
    { label: 'Toplam Sipariş',   value: totalOrders,    icon: ShoppingBag,  color: 'bg-blue-50 text-blue-600'   },
    { label: 'Bekleyen Sipariş', value: pendingOrders,  icon: Clock,        color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Okunmamış Mesaj',  value: unreadMessages, icon: Mail,         color: 'bg-purple-50 text-purple-600' },
    { label: 'Tamamlanan',       value: '-',            icon: CheckCircle2, color: 'bg-green-50 text-green-600'  },
  ];

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-neutral-800">Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">Hoş geldiniz. İşte güncel özet.</p>
      </div>

      {/* Özet kartları */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-neutral-100 p-5 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
              <stat.icon size={20} aria-hidden="true" />
            </div>
            <p className="font-display text-2xl font-bold text-neutral-800">{stat.value}</p>
            <p className="text-xs text-neutral-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Son siparişler */}
      <div className="bg-white rounded-xl border border-neutral-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
          <h2 className="font-semibold text-neutral-800 flex items-center gap-2">
            <TrendingUp size={16} className="text-primary" aria-hidden="true" />
            Son Siparişler
          </h2>
          <Link href="/admin/siparisler" className="text-xs text-primary hover:underline">
            Tümünü Gör →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="py-12 text-center text-sm text-neutral-400">Henüz sipariş yok.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider">Sipariş No</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider">Müşteri</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider hidden sm:table-cell">Tür</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider">Durum</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider hidden md:table-cell">Tutar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(recentOrders as any[]).map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-5 py-3 font-mono text-xs text-neutral-600">{order.order_number}</td>
                    <td className="px-5 py-3 font-medium text-neutral-800">{order.customer_name}</td>
                    <td className="px-5 py-3 text-neutral-500 capitalize hidden sm:table-cell">{order.event_type}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[order.status as OrderStatus]}`}>
                        {ORDER_STATUSES[order.status as OrderStatus]}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right font-medium text-neutral-700 hidden md:table-cell">
                      {formatPrice(Number(order.total_price))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
