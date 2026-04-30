'use client';

import { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Testimonial } from '@/types';
import { Container } from '@/components/ui/Container';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} yıldız`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={i < rating ? 'fill-black text-black' : 'fill-[#dddddd] text-[#dddddd]'}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  return (
    <section className="py-20 md:py-28 border-t border-[#d9cfb8]" aria-label="Müşteri Yorumları">
      <Container>
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-1">Mutlu çiftler ne diyor?</h2>
            <p className="text-sm text-[#767676]">Hizmetimizden memnun kalan çiftlerin yorumları.</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 border border-[#d9cfb8] bg-blush-soft flex items-center justify-center text-[#555555] hover:border-sage hover:text-black transition-colors"
              aria-label="Önceki yorum"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 border border-[#d9cfb8] bg-blush-soft flex items-center justify-center text-[#555555] hover:border-sage hover:text-black transition-colors"
              aria-label="Sonraki yorum"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((t) => (
            <article
              key={t.id}
              className="flex-none w-72 snap-start bg-blush-soft border border-[#e6dcc4] p-6 hover:border-sage transition-colors"
            >
              <StarRating rating={t.rating} />
              <p className="text-sm text-[#333333] leading-relaxed my-4 line-clamp-4">
                &ldquo;{t.comment}&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold text-black">{t.customerName}</p>
                <p className="text-xs text-[#767676] mt-0.5">{t.eventType}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
