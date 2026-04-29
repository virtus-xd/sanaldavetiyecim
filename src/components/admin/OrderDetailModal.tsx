'use client';

/**
 * Sipariş detay modal — durum güncelleme ve teslim URL girişi.
 */
import { useState }    from 'react';
import { useRouter }   from 'next/navigation';
import { Eye, ExternalLink } from 'lucide-react';
import { Modal }       from '@/components/ui/Modal';
import { Button }      from '@/components/ui/Button';
import { Select }      from '@/components/ui/Select';
import { Input }       from '@/components/ui/Input';
import { OrderStatusBadge } from './OrderStatusBadge';
import { formatPrice, formatDate } from '@/lib/utils';
import { EVENT_TYPES, ORDER_STATUSES, PAYMENT_STATUSES, PAYMENT_STATUS_COLORS } from '@/lib/constants';
import type { OrderStatus, PaymentStatus } from '@/types';

const STATUS_OPTIONS  = Object.entries(ORDER_STATUSES).map(([value, label]) => ({ value, label }));
const PAYMENT_OPTIONS = Object.entries(PAYMENT_STATUSES).map(([value, label]) => ({ value, label }));

interface OrderDetailModalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  order: Record<string, any>;
}

export function OrderDetailModal({ order }: OrderDetailModalProps) {
  const router    = useRouter();
  const [open,    setOpen]    = useState(false);
  const [status,  setStatus]  = useState<OrderStatus>(order.status);
  const [url,     setUrl]     = useState(order.delivered_url ?? '');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(order.payment_status ?? 'beklemede');
  const [saving,  setSaving]  = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await fetch(`/api/admin/orders/${order.id}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        status,
        deliveredUrl: url || undefined,
        paymentStatus,
      }),
    });
    setSaving(false);
    setOpen(false);
    router.refresh();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-1.5 rounded-lg text-neutral-400 hover:text-primary hover:bg-primary/5 transition-colors"
        aria-label="Sipariş detayını gör"
      >
        <Eye size={15} />
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title={`Sipariş: ${order.order_number}`} size="lg">
        <div className="flex flex-col gap-5">
          {/* Bilgiler */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {[
              ['Müşteri',    order.customer_name],
              ['E-posta',    order.customer_email],
              ['Telefon',    order.customer_phone],
              ['Tür',        EVENT_TYPES[order.event_type as keyof typeof EVENT_TYPES] ?? order.event_type],
              ['Tarih',      order.event_date ? formatDate(order.event_date) : '-'],
              ['Mekan',      order.event_venue ?? '-'],
              ['Adres',      order.event_location ?? '-'],
              ['Çift',       `${order.groom_name ?? ''} & ${order.bride_name ?? ''}`],
              ['Tutar',      formatPrice(Number(order.total_price))],
              ['Sipariş Tarihi', formatDate(order.created_at)],
            ].map(([label, value]) => (
              <div key={label} className="bg-neutral-50 rounded-lg p-3">
                <p className="text-xs text-neutral-400 mb-0.5">{label}</p>
                <p className="font-medium text-neutral-700 text-sm">{value}</p>
              </div>
            ))}
          </div>

          {order.custom_message && (
            <div className="bg-neutral-50 rounded-lg p-3 text-sm">
              <p className="text-xs text-neutral-400 mb-1">Özel Mesaj</p>
              <p className="text-neutral-700">{order.custom_message}</p>
            </div>
          )}

          {/* Ödeme Durumu */}
          <div className="border-t border-neutral-100 pt-4 flex flex-col gap-3">
            <p className="font-semibold text-neutral-700 text-sm">Ödeme Durumu</p>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${PAYMENT_STATUS_COLORS[order.payment_status as PaymentStatus] ?? PAYMENT_STATUS_COLORS.beklemede}`}>
                {PAYMENT_STATUSES[order.payment_status as PaymentStatus] ?? 'Beklemede'}
              </span>
              <span className="text-neutral-400 text-xs">→</span>
              <Select
                options={PAYMENT_OPTIONS}
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
                className="flex-1"
              />
            </div>
          </div>

          {/* Sipariş Durumu Güncelleme */}
          <div className="border-t border-neutral-100 pt-4 flex flex-col gap-3">
            <p className="font-semibold text-neutral-700 text-sm">Sipariş Durumu</p>
            <div className="flex items-center gap-3">
              <OrderStatusBadge status={order.status as OrderStatus} />
              <span className="text-neutral-400 text-xs">→</span>
              <Select
                options={STATUS_OPTIONS}
                value={status}
                onChange={(e) => setStatus(e.target.value as OrderStatus)}
                className="flex-1"
              />
            </div>
            <Input
              label="Teslim URL (tamamlandığında)"
              placeholder="https://davetiye.sanaldavetiyecim.com/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          {/* Davetiye Önizleme */}
          {(order.delivered_url || order.status === 'tamamlandi') && (
            <div className="border-t border-neutral-100 pt-4">
              <a
                href={order.delivered_url || `/davetiye/${order.order_number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <ExternalLink size={14} />
                Davetiyeyi Önizle
              </a>
            </div>
          )}

          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setOpen(false)}>İptal</Button>
            <Button loading={saving} onClick={handleSave}>Kaydet</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
