'use client';

/**
 * Ana sayfa hero bölümü — tam ekran, gradient arka plan, animasyonlu içerik.
 */
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

const floatVariants: Variants = {
  animate: {
    y: [-8, 8, -8],
    transition: { duration: 5, repeat: Infinity, ease: [0.4, 0, 0.6, 1] },
  },
};

export function HeroSection() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-cream"
      aria-label="Ana Sayfa Hero"
    >
      {/* Dekoratif arka plan şekilleri */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* Yüzen dekoratif elementler */}
      <motion.div
        variants={floatVariants}
        animate="animate"
        className="absolute top-16 right-[12%] w-12 h-12 rounded-xl bg-primary/15 backdrop-blur-sm border border-primary/20 hidden lg:block"
        aria-hidden="true"
      />
      <motion.div
        variants={floatVariants}
        animate="animate"
        style={{ animationDelay: '1.5s' }}
        className="absolute bottom-24 right-[20%] w-8 h-8 rounded-full bg-secondary/30 border border-secondary hidden lg:block"
        aria-hidden="true"
      />
      <motion.div
        variants={floatVariants}
        animate="animate"
        style={{ animationDelay: '3s' }}
        className="absolute top-1/3 left-[8%] w-6 h-6 rounded-lg bg-accent/15 hidden lg:block"
        aria-hidden="true"
      />

      <Container className="relative z-10 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          {/* Üst etiket */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            <Sparkles size={14} aria-hidden="true" />
            Dijital Davetiye Hizmeti
          </motion.div>

          {/* Ana başlık */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-800 leading-tight mb-6"
          >
            Hayalinizdeki Davetiyeyi{' '}
            <span className="text-primary relative">
              Dijitale Taşıyoruz
              <span
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/40 rounded-full"
                aria-hidden="true"
              />
            </span>
          </motion.h1>

          {/* Alt başlık */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-500 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            Düğün, nişan, söz ve kına organizasyonlarınız için şık dijital davetiye siteleri
            hazırlıyoruz. Tek bir link ile tüm misafirlerinize ulaşın.
          </motion.p>

          {/* CTA butonları */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg">
              <Link href="/tasarimlar" className="flex items-center gap-2">
                Tasarımları İncele
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/siparis">Hemen Sipariş Ver</Link>
            </Button>
          </motion.div>

          {/* İstatistikler */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto"
          >
            {[
              { value: '500+',   label: 'Mutlu Çift' },
              { value: '24 sa',  label: 'Hızlı Teslimat' },
              { value: '%100',   label: 'Memnuniyet' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-2xl md:text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-neutral-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>

      {/* Alt dalga dekorasyon */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
