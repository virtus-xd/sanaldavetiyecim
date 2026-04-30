import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { AnimatedMarqueeHero } from '@/components/ui/hero-3';
import { THEME_REGISTRY } from '@/components/invitation-themes/themes.config';

const ENVELOPE_IMAGES = Object.values(THEME_REGISTRY).map((t) => t.envelope.desktop);

const CATEGORIES = [
  { label: 'Düğün',    href: '/tasarimlar?tur=dugun' },
  { label: 'Nişan',    href: '/tasarimlar?tur=nisan' },
  { label: 'Söz',      href: '/tasarimlar?tur=soz' },
  { label: 'Kına',     href: '/tasarimlar?tur=kina' },
  { label: 'Modern',   href: '/tasarimlar?stil=modern' },
  { label: 'Klasik',   href: '/tasarimlar?stil=klasik' },
  { label: 'Lüks',     href: '/tasarimlar?stil=luks' },
  { label: 'Romantik', href: '/tasarimlar?stil=romantik' },
];

export function HeroSection() {
  return (
    <>
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

      <div className="border-t border-[#eeeeee] bg-white">
        <Container>
          <div className="py-5 flex items-center gap-3 overflow-x-auto scrollbar-hide">
            <span className="text-sm font-semibold text-black shrink-0">Kategoriye göre:</span>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="shrink-0 px-4 py-2 bg-[#f9f9f9] border border-[#eeeeee] text-sm text-[#333333] font-medium hover:border-[#999999] hover:bg-white transition-colors rounded-sm"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
