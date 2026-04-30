import { AnimatedMarqueeHero } from '@/components/ui/hero-3';
import { THEME_REGISTRY } from '@/components/invitation-themes/themes.config';

const ENVELOPE_IMAGES = Object.values(THEME_REGISTRY).map((t) => t.envelope.desktop);

export function HeroSection() {
  return (
    <AnimatedMarqueeHero
      tagline="500+ mutlu çift bizi tercih etti"
      title={
        <>
          Özel anlarınız için
          <br />
          <span className="font-display italic">dijital davetiye</span>
        </>
      }
      description="Düğün, nişan, söz ve kına organizasyonlarınız için şık dijital davetiye siteleri hazırlıyoruz. Tek link ile tüm misafirlerinize ulaşın."
      ctaText="TASARIMLARI İNCELE"
      ctaHref="/tasarimlar"
      images={ENVELOPE_IMAGES}
    />
  );
}
