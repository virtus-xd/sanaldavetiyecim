'use client';

/**
 * Özellikler bölümü — 4 özellik kartı, scroll animasyonlu.
 */
import { motion } from 'framer-motion';
import { Palette, Zap, Smartphone, Share2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { useScrollAnimation, staggerContainerVariants, fadeUpVariants } from '@/hooks/useScrollAnimation';

const features = [
  {
    icon:        Palette,
    title:       'Özgün Tasarımlar',
    description: 'Her davetiye size özel hazırlanır. Kişisel bilgileriniz ve tercihleriniz doğrultusunda benzersiz bir tasarım oluşturulur.',
    color:       'bg-primary/10 text-primary',
  },
  {
    icon:        Zap,
    title:       'Hızlı Teslimat',
    description: 'Siparişiniz 24-48 saat içinde tamamlanır. Özel günlerinize yetişmek için hızlı çalışıyoruz.',
    color:       'bg-secondary/30 text-secondary-dark',
  },
  {
    icon:        Smartphone,
    title:       'Mobil Uyumlu',
    description: 'Davetiyelerin tüm cihazlarda kusursuz görünmesi için her tasarım mobil öncelikli hazırlanır.',
    color:       'bg-accent/10 text-accent',
  },
  {
    icon:        Share2,
    title:       'Kolay Paylaşım',
    description: 'Tek bir link ile WhatsApp, SMS veya sosyal medya üzerinden tüm misafirlerinize ulaşın.',
    color:       'bg-green-100 text-green-700',
  },
];

export function FeaturesSection() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="py-20 md:py-28 bg-white" aria-label="Özellikler">
      <Container>
        <SectionTitle
          title="Neden Bizi Tercih Etmelisiniz?"
          subtitle="Dijital davetiyelerde kalite, hız ve kişiselleştirmeyi bir arada sunuyoruz."
          className="mb-14"
        />

        <motion.div
          ref={ref}
          variants={staggerContainerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeUpVariants}
              className="flex flex-col items-center text-center p-6 rounded-2xl border border-neutral-100 hover:border-primary/20 hover:shadow-md transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon size={26} aria-hidden="true" />
              </div>
              <h3 className="font-display font-semibold text-lg text-neutral-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
