'use client';

/**
 * Sipariş sorgulama formu — /api/orders/[orderNumber] endpoint'ine bağlı.
 */
import { useState } from 'react';
import { useForm }  from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search, Clock, CheckCircle2, Package, XCircle } from 'lucide-react';
import { orderQuerySchema, type OrderQueryValues } from '@/lib/validations';
import { ORDER_STATUSES } from '@/lib/constants';
import { Input }   from '@/components/ui/Input';
import { Button }  from '@/components/ui/Button';
import type { OrderStatus } from '@/types';


const STATUS_ICONS: Record<OrderStatus, React.ElementType> = {
  beklemede:    Clock,
  hazirlaniyor: Package,
  tamamlandi:   CheckCircle2,
  iptal:        XCircle,
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  beklemede:    'text-yellow-600 bg-yellow-50 border-yellow-200',
  hazirlaniyor: 'text-blue-600   bg-blue-50   border-blue-200',
  tamamlandi:   'text-green-600  bg-green-50  border-green-200',
  iptal:        'text-red-600    bg-red-50    border-red-200',
};

const PROGRESS_STEPS: OrderStatus[] = ['beklemede', 'hazirlaniyor', 'tamamlandi'];

export function OrderQueryForm() {
  type QueryResult = { orderNumber: string; customerName: string; status: OrderStatus; eventType: string; createdAt?: string; deliveredUrl?: string | null };
  const [result,  setResult]  = useState<QueryResult | null>(null);
  const [notFound, setNotFound] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrderQueryValues>({ resolver: zodResolver(orderQuerySchema) });

  const onSubmit = async (data: OrderQueryValues) => {
    const query = encodeURIComponent(data.query);
    const res   = await fetch(`/api/orders/${query}`);
    if (!res.ok) {
      setResult(null);
      setNotFound(true);
      return;
    }
    const json = await res.json();
    // API tek sipariş döner
    setResult({
      orderNumber:  json.orderNumber,
      customerName: json.customerName,
      status:       json.status as OrderStatus,
      eventType:    json.eventType,
      createdAt:    json.createdAt,
    });
    setNotFound(false);
  };

  const StatusIcon = result ? STATUS_ICONS[result.status] : null;
  const progressIndex = result ? PROGRESS_STEPS.indexOf(result.status) : -1;

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 flex flex-col gap-4">
        <Input
          label="Sipariş Numarası veya E-posta"
          placeholder="SDC-2024-XXXX veya email@ornek.com"
          leftIcon={<Search size={15} />}
          error={errors.query?.message}
          {...register('query')}
        />
        <Button type="submit" loading={isSubmitting} className="w-full">
          Sorgula
        </Button>
      </form>

      {/* Sonuç */}
      {notFound && (
        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center">
          <XCircle size={32} className="text-red-400 mx-auto mb-3" />
          <p className="font-semibold text-red-700 mb-1">Sipariş Bulunamadı</p>
          <p className="text-sm text-red-500">
            Girdiğiniz bilgilere ait sipariş bulunamadı. Sipariş numarası veya e-posta adresinizi kontrol edin.
          </p>
        </div>
      )}

      {result && (
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 flex flex-col gap-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs text-neutral-400 mb-1">Sipariş Numarası</p>
              <p className="font-display font-bold text-lg text-neutral-800">{result.orderNumber}</p>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${STATUS_COLORS[result.status]}`}>
              {StatusIcon && <StatusIcon size={14} aria-hidden="true" />}
              {ORDER_STATUSES[result.status]}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-neutral-400 text-xs">Müşteri</p>
              <p className="font-medium text-neutral-700">{result.customerName}</p>
            </div>
            <div>
              <p className="text-neutral-400 text-xs">Organizasyon</p>
              <p className="font-medium text-neutral-700">{result.eventType}</p>
            </div>
          </div>

          {/* İlerleme */}
          {result.status !== 'iptal' && (
            <div>
              <p className="text-xs text-neutral-400 mb-3">Sipariş İlerlemesi</p>
              <div className="relative flex justify-between">
                <div className="absolute top-4 left-4 right-4 h-0.5 bg-neutral-200" aria-hidden="true">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: progressIndex >= 1 ? (progressIndex >= 2 ? '100%' : '50%') : '0%' }}
                  />
                </div>
                {PROGRESS_STEPS.map((s, i) => (
                  <div key={s} className="flex flex-col items-center gap-1.5 z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-colors ${i <= progressIndex ? 'bg-primary border-primary text-white' : 'bg-white border-neutral-200 text-neutral-300'}`}>
                      {i < progressIndex ? '✓' : i + 1}
                    </div>
                    <span className="text-[10px] text-neutral-500">{ORDER_STATUSES[s]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.status === 'tamamlandi' && (
            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <p className="font-semibold text-green-700 text-sm mb-1">Davetiyeliniz Hazır!</p>
              <a href="#" className="text-green-600 text-sm underline hover:no-underline">
                Davetiye Linkinizi Görüntüleyin →
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
