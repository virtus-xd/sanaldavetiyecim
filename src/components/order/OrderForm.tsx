'use client';

/**
 * Çok adımlı sipariş formu ana bileşeni.
 * React Hook Form + Zod validasyonu, 4 adım.
 */
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import {
  orderFormSchema,
  step1Schema, step2Schema, step3Schema, step4Schema,
  type OrderFormValues,
} from '@/lib/validations';
import { Button }        from '@/components/ui/Button';
import { OrderStepper }  from './OrderStepper';
import { Step1Event }    from './Step1Event';
import { Step2Design }   from './Step2Design';
import { Step3Contact }  from './Step3Contact';
import { Step4Summary }  from './Step4Summary';

const STEP_SCHEMAS = [step1Schema, step2Schema, step3Schema, step4Schema];

const stepVariants = {
  enter:  (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

export function OrderForm() {
  const searchParams = useSearchParams();
  const [step,       setStep]       = useState(1);
  const [direction,  setDirection]  = useState(1);
  const [submitted,  setSubmitted]  = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const methods = useForm<OrderFormValues>({
    resolver:      zodResolver(orderFormSchema),
    defaultValues: {
      eventType:       'dugun',
      groomName:       '',
      brideName:       '',
      eventDate:       '',
      eventTime:       '',
      eventVenue:      '',
      eventLocation:   '',
      templateId:      searchParams.get('tasarim') ?? null,
      customMessage:   '',
      additionalNotes: '',
      customerName:    '',
      customerEmail:   '',
      customerPhone:   '',
      termsAccepted:   false,
    },
    mode: 'onChange',
  });

  const next = async () => {
    const schema = STEP_SCHEMAS[step - 1];
    const fields = Object.keys(schema.shape) as (keyof OrderFormValues)[];
    const valid  = await methods.trigger(fields);
    if (!valid) return;
    setDirection(1);
    setStep((s) => s + 1);
  };

  const prev = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const onSubmit = async (data: OrderFormValues) => {
    try {
      const res = await fetch('/api/orders', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        methods.setError('root', { message: json.error ?? 'Sipariş gönderilemedi.' });
        return;
      }
      setOrderNumber(json.orderNumber);
      setSubmitted(true);
    } catch {
      methods.setError('root', { message: 'Sunucu hatası. Lütfen tekrar deneyin.' });
    }
  };

  if (submitted) {
    return <SuccessScreen orderNumber={orderNumber} />;
  }

  return (
    <FormProvider {...methods}>
      <div className="max-w-2xl mx-auto">
        {/* Adım göstergesi */}
        <div className="mb-10 px-2">
          <OrderStepper currentStep={step} />
        </div>

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 md:p-8 min-h-[400px] overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              >
                {step === 1 && <Step1Event />}
                {step === 2 && <Step2Design />}
                {step === 3 && <Step3Contact />}
                {step === 4 && <Step4Summary />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Genel hata mesajı */}
          {methods.formState.errors.root && (
            <p className="mt-3 text-sm text-red-500 text-center" role="alert">
              {methods.formState.errors.root.message}
            </p>
          )}

          {/* Navigasyon butonları */}
          <div className="flex items-center justify-between mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={prev}
              disabled={step === 1}
              className={step === 1 ? 'invisible' : ''}
            >
              Geri
            </Button>

            <span className="text-sm text-neutral-400">{step} / 4</span>

            {step < 4 ? (
              <Button type="button" onClick={next}>
                Devam Et
              </Button>
            ) : (
              <Button type="submit" loading={methods.formState.isSubmitting}>
                Siparişi Gönder
              </Button>
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  );
}

function SuccessScreen({ orderNumber }: { orderNumber: string }) {
  return (
    <div className="max-w-md mx-auto text-center py-12 flex flex-col items-center gap-5">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
        <CheckCircle2 size={40} className="text-green-500" />
      </div>
      <h2 className="font-display text-2xl font-bold text-neutral-800">
        Siparişiniz Alındı!
      </h2>
      <p className="text-neutral-500 leading-relaxed">
        Siparişiniz başarıyla oluşturuldu. 24-48 saat içinde davetiyeniz hazırlanacak
        ve e-posta adresinize gönderilecektir.
      </p>
      <div className="bg-primary/5 border border-primary/20 rounded-xl px-6 py-4 w-full">
        <p className="text-xs text-neutral-500 mb-1">Sipariş Numaranız</p>
        <p className="font-display text-xl font-bold text-primary tracking-wider">{orderNumber}</p>
      </div>
      <p className="text-sm text-neutral-400">
        Bu numarayı kaydederek siparişinizi{' '}
        <a href="/siparis-sorgula" className="text-primary underline hover:no-underline">
          sipariş sorgulama
        </a>{' '}
        sayfasından takip edebilirsiniz.
      </p>
    </div>
  );
}
