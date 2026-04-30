'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { Template } from '@/types';
import { Container } from '@/components/ui/Container';

interface PopularTemplatesProps {
  templates: Template[];
}

export function PopularTemplates({ templates }: PopularTemplatesProps) {
  return (
    <section className="py-20 md:py-28 bg-white" aria-label="Popüler Tasarımlar">
      <Container>
        {/* Başlık */}
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-black">Popüler tasarımlar</h2>
          <Link
            href="/tasarimlar"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            Tümünü gör
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {templates.map((template) => (
            <Link
              key={template.id}
              href={`/tasarimlar/${template.slug}`}
              className="group block"
            >
              {/* Görsel */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#f9f9f9] mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={template.previewImages[0]}
                  alt={`${template.name} davetiye tasarımı`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {template.isPopular && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-white text-[11px] font-semibold tracking-wide">
                    POPÜLER
                  </div>
                )}
              </div>

              {/* Bilgi */}
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-black leading-tight group-hover:text-primary transition-colors">
                    {template.name}
                  </h3>
                  <span className="text-sm font-bold text-black shrink-0">
                    {formatPrice(template.price)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobil "Tümünü gör" */}
        <div className="mt-10 flex justify-center sm:hidden">
          <Link
            href="/tasarimlar"
            className="inline-flex items-center gap-2 px-6 py-2.5 border border-black text-black text-sm font-semibold hover:bg-black hover:text-white transition-colors"
          >
            Tüm Tasarımları Gör
            <ArrowRight size={14} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
