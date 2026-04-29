'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/Container';

const PREVIEW_IMAGES = [
  '/template-previews/floral_cover.png',
  '/template-previews/gatsby_cover.png',
  '/template-previews/starry_cover.png',
  '/template-previews/classic_cover.png',
];

export function HeroSection() {
  return (
    <section className="bg-[#fffbf5] pt-14 overflow-hidden" aria-label="Ana Sayfa Hero">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[480px] py-14 lg:py-20">

          {/* Sol: Metin */}
          <div className="max-w-[520px]">
            <h1 className="text-[2.6rem] md:text-[3.2rem] lg:text-[3.6rem] font-bold text-black leading-[1.1] tracking-tight mb-6">
              Özel anlarınız için dijital davetiye
            </h1>
            <p className="text-[#555555] text-base md:text-lg leading-relaxed mb-8 max-w-[420px]">
              Düğün, nişan, söz ve kına organizasyonlarınız için şık dijital davetiye siteleri hazırlıyoruz. Tek link ile tüm misafirlerinize ulaşın.
            </p>
            <Link
              href="/tasarimlar"
              className="inline-flex items-center justify-center px-7 py-3 border border-black text-black text-sm font-semibold hover:bg-black hover:text-white transition-colors tracking-wide"
            >
              TASARIMLARI İNCELE
            </Link>

            {/* İstatistikler */}
            <div className="mt-12 flex items-center gap-8">
              {[
                { value: '500+',  label: 'Mutlu Çift' },
                { value: '24 sa', label: 'Hızlı Teslimat' },
                { value: '%100',  label: 'Memnuniyet' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl font-bold text-black">{stat.value}</div>
                  <div className="text-xs text-[#767676] mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sağ: Davetiye kartı mockupları */}
          <div className="relative hidden lg:block h-[440px]">
            {/* Arka kart */}
            <div className="absolute top-4 right-24 w-52 h-[300px] shadow-xl rotate-[-4deg] overflow-hidden rounded-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PREVIEW_IMAGES[0]}
                alt="Davetiye örneği"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Ön kart */}
            <div className="absolute top-12 right-4 w-56 h-[320px] shadow-2xl rotate-[3deg] overflow-hidden rounded-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PREVIEW_IMAGES[1]}
                alt="Davetiye örneği"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Sol kart */}
            <div className="absolute bottom-8 left-0 w-44 h-[260px] shadow-xl rotate-[-2deg] overflow-hidden rounded-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PREVIEW_IMAGES[2]}
                alt="Davetiye örneği"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </Container>

      {/* Kategori chips — PP "Explore by category" */}
      <div className="border-t border-[#eeeeee] bg-white">
        <Container>
          <div className="py-5 flex items-center gap-3 overflow-x-auto scrollbar-hide">
            <span className="text-sm font-semibold text-black shrink-0">Kategoriye göre:</span>
            {[
              { label: 'Düğün',  href: '/tasarimlar?tur=dugun' },
              { label: 'Nişan',  href: '/tasarimlar?tur=nisan' },
              { label: 'Söz',    href: '/tasarimlar?tur=soz' },
              { label: 'Kına',   href: '/tasarimlar?tur=kina' },
              { label: 'Modern', href: '/tasarimlar?stil=modern' },
              { label: 'Klasik', href: '/tasarimlar?stil=klasik' },
              { label: 'Lüks',   href: '/tasarimlar?stil=luks' },
              { label: 'Romantik', href: '/tasarimlar?stil=romantik' },
            ].map((cat) => (
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
    </section>
  );
}
