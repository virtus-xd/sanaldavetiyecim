/**
 * Sipariş formu — Adım 1: Organizasyon bilgileri.
 */
import { useFormContext } from 'react-hook-form';
import { Input }    from '@/components/ui/Input';
import { Select }   from '@/components/ui/Select';
import { EVENT_TYPE_OPTIONS } from '@/lib/constants';
import type { OrderFormValues } from '@/lib/validations';

export function Step1Event() {
  const {
    register,
    formState: { errors },
  } = useFormContext<OrderFormValues>();

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-display text-xl font-semibold text-neutral-800">
        Organizasyon Bilgileri
      </h2>

      <Select
        label="Organizasyon Türü"
        required
        options={EVENT_TYPE_OPTIONS}
        placeholder="Seçiniz..."
        error={errors.eventType?.message}
        {...register('eventType')}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Damat / Erkek Adı"
          placeholder="Örn: Ahmet Yılmaz"
          required
          error={errors.groomName?.message}
          {...register('groomName')}
        />
        <Input
          label="Gelin / Kadın Adı"
          placeholder="Örn: Ayşe Kaya"
          required
          error={errors.brideName?.message}
          {...register('brideName')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Etkinlik Tarihi"
          type="date"
          required
          error={errors.eventDate?.message}
          {...register('eventDate')}
        />
        <Input
          label="Etkinlik Saati"
          type="time"
          required
          error={errors.eventTime?.message}
          {...register('eventTime')}
        />
      </div>

      <Input
        label="Mekan Adı"
        placeholder="Örn: Grand Hotel Ballroom"
        required
        error={errors.eventVenue?.message}
        {...register('eventVenue')}
      />

      <Input
        label="Mekan Adresi / Konumu"
        placeholder="Örn: Bağcılar Cad. No:5, İstanbul"
        required
        error={errors.eventLocation?.message}
        {...register('eventLocation')}
      />
    </div>
  );
}
