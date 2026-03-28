'use client';

/**
 * Alt CTA banner — dikkat çekici gradient bant, sipariş sayfasına yönlendirir.
 */
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function CTABanner() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section
      className="py-20 md:py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #B8860B 0%, #800020 50%, #B8860B 100%)',
        backgroundSize: '200% 200%',
      }}
      aria-label="Sipariş Ver"
    >
      {/* Dekoratif daireler */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/3" />
      </div>

      <Container className="relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 text-white/70 text-sm font-medium mb-4">
            <Heart size={14} className="fill-white/70" aria-hidden="true" />
            Özel Gününüz Yaklaşıyor
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Haydi Başlayalım!
          </h2>

          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-10">
            Hayalinizdeki davetiyeyi oluşturmak için sadece birkaç dakikanızı ayırın.
            24-48 saat içinde davetiyeniz hazır olsun.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-cream hover:text-primary-dark shadow-lg"
            >
              <Link href="/siparis" className="flex items-center gap-2">
                Hemen Sipariş Ver
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="text-white hover:bg-white/10 border border-white/30"
            >
              <Link href="/tasarimlar">Tasarımları İncele</Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
