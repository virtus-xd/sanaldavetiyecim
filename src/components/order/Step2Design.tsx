'use client';

/**
 * Sipariş formu — Adım 2: Tasarım tercihi.
 */
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { useTemplates } from '@/hooks/useTemplates';
import { Textarea }     from '@/components/ui/Textarea';
import { Badge }        from '@/components/ui/Badge';
import { EVENT_TYPES }  from '@/lib/constants';
import type { OrderFormValues } from '@/lib/validations';
import { Check } from 'lucide-react';

export function Step2Design() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<OrderFormValues>();

  const selectedId              = watch('templateId');
  const { templates, loading }  = useTemplates();

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-display text-xl font-semibold text-neutral-800">
        Tasarım Tercihi
      </h2>

      {/* Tasarım seçimi */}
      <div>
        <p className="text-sm font-medium text-neutral-700 mb-3">
          Tasarım Seçin <span className="text-neutral-400 font-normal">(opsiyonel)</span>
        </p>

        {loading && (
          <p className="text-sm text-neutral-400 mb-3">Tasarımlar yükleniyor...</p>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
          {templates.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setValue('templateId', selectedId === t.id ? null : t.id)}
              className={cn(
                'relative rounded-xl overflow-hidden border-2 transition-all duration-150 text-left',
                selectedId === t.id
                  ? 'border-primary shadow-md shadow-primary/20'
                  : 'border-neutral-200 hover:border-primary/40'
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.previewImages[0]}
                alt={t.name}
                className="w-full h-24 object-cover"
                loading="lazy"
              />
              <div className="p-2">
                <p className="text-xs font-semibold text-neutral-800 truncate">{t.name}</p>
                <Badge variant="primary" className="mt-1 text-[10px] px-1.5 py-0">
                  {EVENT_TYPES[t.category]}
                </Badge>
              </div>
              {selectedId === t.id && (
                <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <Check size={12} className="text-white" aria-hidden="true" />
                </div>
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setValue('templateId', null)}
          className={cn(
            'w-full py-3 rounded-xl border-2 border-dashed text-sm font-medium transition-colors',
            selectedId === null
              ? 'border-primary text-primary bg-primary/5'
              : 'border-neutral-200 text-neutral-500 hover:border-primary/40 hover:text-primary'
          )}
        >
          Özel tasarım istiyorum (siz karar verin)
        </button>
      </div>

      <Textarea
        label="Özel Mesaj"
        placeholder="Örn: Sevgili misafirlerimiz, bu mutlu günümüzde sizinle olmak istiyoruz..."
        hint="Davetiyede görünecek özel mesajınızı yazın (opsiyonel, max 500 karakter)"
        error={errors.customMessage?.message}
        rows={4}
        {...register('customMessage')}
      />

      <Textarea
        label="Ek Notlar"
        placeholder="Örn: Davet kartı rengi krem olsun, çiçek deseni eklenebilir..."
        hint="Tasarımcıya iletmek istediğiniz özel notlar (opsiyonel, max 300 karakter)"
        error={errors.additionalNotes?.message}
        rows={3}
        {...register('additionalNotes')}
      />
    </div>
  );
}
