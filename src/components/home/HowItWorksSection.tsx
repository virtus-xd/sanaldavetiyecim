'use client';

/**
 * Nasıl çalışır bölümü — 4 numaralı adım, bağlantı çizgili.
 */
import { motion } from 'framer-motion';
import { MousePointerClick, FileEdit, Wand2, Send } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { useScrollAnimation, staggerContainerVariants, fadeUpVariants } from '@/hooks/useScrollAnimation';

const steps = [
  {
    number: '01',
    icon:   MousePointerClick,
    title:  'Tasarım Seçin',
    description:
      'Portföyümüzdeki onlarca tasarım arasından organizasyonunuza en uygun olanı seçin ya da özel tasarım isteyin.',
  },
  {
    number: '02',
    icon:   FileEdit,
    title:  'Bilgilerinizi Girin',
    description:
      'Çiftin isimleri, etkinlik tarihi, saat, mekan ve özel mesajınızı sipariş formumuza girin.',
  },
  {
    number: '03',
    icon:   Wand2,
    title:  'Biz Hazırlayalım',
    description:
      '24-48 saat içinde tüm bilgilerinizi içeren özel davetiye sitenizi hazırlayıp size iletiyoruz.',
  },
  {
    number: '04',
    icon:   Send,
    title:  'Paylaşın',
    description:
      'Davetiye linkinizi WhatsApp, SMS veya sosyal medya üzerinden tüm misafirlerinize gönderin.',
  },
];

export function HowItWorksSection() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="py-20 md:py-28 bg-white" aria-label="Nasıl Çalışır">
      <Container>
        <SectionTitle
          title="Nasıl Çalışır?"
          subtitle="Dört basit adımda hayalinizdeki davetiye sitenize kavuşun."
          className="mb-16"
        />

        <div className="relative">
          {/* Bağlantı çizgisi (masaüstü) */}
          <div
            className="hidden lg:block absolute top-10 left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20"
            aria-hidden="true"
          />

          <motion.div
            ref={ref}
            variants={staggerContainerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={fadeUpVariants}
                className="flex flex-col items-center text-center relative"
              >
                {/* Adım numarası + ikon */}
                <div className="relative mb-5">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <step.icon size={28} className="text-primary" aria-hidden="true" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center font-display">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-display font-semibold text-lg text-neutral-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
