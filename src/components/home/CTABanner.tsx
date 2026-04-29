'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export function CTABanner() {
  return (
    <section className="py-20 md:py-24 bg-black" aria-label="Sipariş Ver">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#999999] text-sm font-medium uppercase tracking-widest mb-4">
            Özel Gününüz Yaklaşıyor
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Haydi başlayalım
          </h2>
          <p className="text-[#767676] text-base md:text-lg leading-relaxed mb-10">
            Hayalinizdeki davetiyeyi oluşturmak için sadece birkaç dakikanızı ayırın.
            24-48 saat içinde davetiyeniz hazır olsun.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/siparis"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-black text-sm font-semibold hover:bg-[#eeeeee] transition-colors tracking-wide"
            >
              HEMEN SİPARİŞ VER
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/tasarimlar"
              className="inline-flex items-center justify-center px-8 py-3 border border-[#555555] text-[#999999] text-sm font-semibold hover:border-white hover:text-white transition-colors tracking-wide"
            >
              TASARIMLARI İNCELE
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
