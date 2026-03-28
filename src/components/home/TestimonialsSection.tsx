'use client';

/**
 * Müşteri yorumları bölümü — yatay kaydırmalı carousel.
 */
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import type { Testimonial } from '@/types';
import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { useScrollAnimation, fadeInVariants } from '@/hooks/useScrollAnimation';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} yıldız`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'fill-primary text-primary' : 'text-neutral-200'}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useScrollAnimation();

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  return (
    <section className="py-20 md:py-28 bg-cream overflow-hidden" aria-label="Müşteri Yorumları">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionTitle
            title="Mutlu Çiftler Ne Diyor?"
            subtitle="Hizmetimizden memnun kalan çiftlerin yorumları."
            align="left"
          />

          {/* Kaydırma butonları */}
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-xl border border-neutral-200 bg-white flex items-center justify-center text-neutral-500 hover:border-primary hover:text-primary transition-colors"
              aria-label="Önceki yorum"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-xl border border-neutral-200 bg-white flex items-center justify-center text-neutral-500 hover:border-primary hover:text-primary transition-colors"
              aria-label="Sonraki yorum"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <motion.div
          ref={ref}
          variants={fadeInVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.id}
                className="flex-none w-72 md:w-80 snap-start bg-white rounded-2xl p-6 border border-neutral-100 hover:border-primary/20 hover:shadow-md transition-all duration-300"
              >
                <Quote
                  size={28}
                  className="text-primary/20 mb-4 fill-primary/10"
                  aria-hidden="true"
                />

                <p className="text-neutral-600 text-sm leading-relaxed mb-5 line-clamp-4">
                  &ldquo;{testimonial.comment}&rdquo;
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-neutral-800 text-sm">
                      {testimonial.customerName}
                    </p>
                    <p className="text-neutral-400 text-xs mt-0.5">{testimonial.eventType}</p>
                  </div>
                  <StarRating rating={testimonial.rating} />
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
