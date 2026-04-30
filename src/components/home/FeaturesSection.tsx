'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';

const features = [
  {
    title:       'Geniş tasarım koleksiyonu',
    description: 'Her zevke uygun onlarca şablon arasından seçin. Modern, klasik, romantik ve daha fazlası.',
  },
  {
    title:       'Stressiz hazırlık süreci',
    description: 'Sipariş verdikten sonra 24-48 saat içinde davetiyeniz hazır. Siz sadece paylaşın.',
  },
  {
    title:       'Sınırsız misafir erişimi',
    description: 'Tek link ile WhatsApp, SMS veya sosyal medya üzerinden sınırsız kişiye ulaşın.',
  },
];

const GRID_IMAGES = [
  '/themes/classic/preview-section-1.png',
  '/themes/gatsby/preview-section-1.png',
  '/themes/floral/preview-section-1.png',
  '/themes/starry/preview-section-1.png',
  '/themes/rustic/preview-section-1.png',
  '/themes/autumn/preview-section-1.png',
];

export function FeaturesSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-20 md:py-28 bg-[#ecf4ff]" aria-label="Özellikler">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Sol: Başlık + Accordion */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight mb-10">
              Güzel tasarım ile<br />zahmetsiz organizasyon
            </h2>

            <div className="flex flex-col divide-y divide-[#c6deff]">
              {features.map((f, i) => (
                <div key={f.title} className="py-4">
                  <button
                    className="w-full flex items-center justify-between text-left gap-4 group"
                    onClick={() => setOpen(open === i ? -1 : i)}
                    aria-expanded={open === i}
                  >
                    <span className={`text-base font-semibold transition-colors ${open === i ? 'text-primary' : 'text-black group-hover:text-primary'}`}>
                      {f.title}
                    </span>
                    <span className={`text-xl font-light text-[#555555] shrink-0 transition-transform ${open === i ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>
                  {open === i && (
                    <p className="mt-2 text-sm text-[#555555] leading-relaxed pr-8">
                      {f.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sağ: Görsel ızgarası */}
          <div className="grid grid-cols-3 gap-2">
            {GRID_IMAGES.map((src, i) => (
              <div
                key={i}
                className="aspect-[3/4] overflow-hidden bg-[#e2efff] rounded-sm"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Davetiye tasarımı ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
