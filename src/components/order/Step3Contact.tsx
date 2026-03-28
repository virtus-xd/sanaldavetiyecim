/**
 * Sipariş formu — Adım 3: İletişim bilgileri.
 */
import { useFormContext } from 'react-hook-form';
import { User, Mail, Phone } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import type { OrderFormValues } from '@/lib/validations';

export function Step3Contact() {
  const {
    register,
    formState: { errors },
  } = useFormContext<OrderFormValues>();

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-display text-xl font-semibold text-neutral-800">
        İletişim Bilgileri
      </h2>

      <Input
        label="Ad Soyad"
        placeholder="Örn: Ayşe Kaya"
        required
        leftIcon={<User size={15} />}
        error={errors.customerName?.message}
        {...register('customerName')}
      />

      <Input
        label="E-posta Adresi"
        type="email"
        placeholder="ornek@email.com"
        required
        leftIcon={<Mail size={15} />}
        hint="Davetiye linkiniz bu adrese gönderilecektir"
        error={errors.customerEmail?.message}
        {...register('customerEmail')}
      />

      <Input
        label="Telefon / WhatsApp"
        type="tel"
        placeholder="0555 123 45 67"
        required
        leftIcon={<Phone size={15} />}
        hint="Gerektiğinde iletişim kurmak ve WhatsApp üzerinden bilgilendirme yapmak için"
        error={errors.customerPhone?.message}
        {...register('customerPhone')}
      />

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
        <p className="font-medium mb-1">Bilgileriniz güvende</p>
        <p className="text-blue-600">
          Kişisel bilgileriniz yalnızca sipariş işlemi için kullanılır ve üçüncü taraflarla paylaşılmaz.
        </p>
      </div>
    </div>
  );
}
