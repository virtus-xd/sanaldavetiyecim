/**
 * Sipariş durum rozeti.
 */
import { ORDER_STATUSES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { OrderStatus } from '@/types';

const colors: Record<OrderStatus, string> = {
  beklemede:    'bg-yellow-100 text-yellow-700',
  hazirlaniyor: 'bg-blue-100   text-blue-700',
  tamamlandi:   'bg-green-100  text-green-700',
  iptal:        'bg-red-100    text-red-700',
};

export function OrderStatusBadge({ status, className }: { status: OrderStatus; className?: string }) {
  return (
    <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', colors[status], className)}>
      {ORDER_STATUSES[status]}
    </span>
  );
}
