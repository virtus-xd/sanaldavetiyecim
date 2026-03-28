'use client';

/**
 * İletişim formu bileşeni.
 * Faz 6'da /api/contact endpoint'ine bağlanacak.
 */
import { useState }  from 'react';
import { useForm }   from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2 } from 'lucide-react';
import { contactFormSchema, type ContactFormValues } from '@/lib/validations';
import { Input }    from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button }   from '@/components/ui/Button';

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactFormSchema) });

  const onSubmit = async (data: ContactFormValues) => {
    const res = await fetch('/api/contact', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data),
    });
    if (res.ok) {
      setSent(true);
    }
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center text-center py-10 gap-4">
        <CheckCircle2 size={48} className="text-green-500" />
        <h3 className="font-display font-semibold text-neutral-800 text-lg">Mesajınız Gönderildi!</h3>
        <p className="text-neutral-500 text-sm">
          En kısa sürede size dönüş yapacağız.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Ad Soyad"
        placeholder="Adınız Soyadınız"
        required
        error={errors.name?.message}
        {...register('name')}
      />
      <Input
        label="E-posta"
        type="email"
        placeholder="ornek@email.com"
        required
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label="Telefon"
        type="tel"
        placeholder="0555 123 45 67"
        error={errors.phone?.message}
        {...register('phone')}
      />
      <Textarea
        label="Mesajınız"
        placeholder="Merhaba, davetiye hakkında bilgi almak istiyorum..."
        required
        rows={5}
        error={errors.message?.message}
        {...register('message')}
      />
      <Button type="submit" loading={isSubmitting} className="w-full">
        Mesajı Gönder
      </Button>
    </form>
  );
}
