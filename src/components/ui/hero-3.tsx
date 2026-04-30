'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedMarqueeHeroProps {
  tagline:     string;
  title:       React.ReactNode;
  description: string;
  ctaText:     string;
  ctaHref?:    string;
  images:      string[];
  className?:  string;
}

const FADE_IN_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show:   {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 20 },
  },
};

export const AnimatedMarqueeHero: React.FC<AnimatedMarqueeHeroProps> = ({
  tagline,
  title,
  description,
  ctaText,
  ctaHref = '/tasarimlar',
  images,
  className,
}) => {
  // Çift seferde duplicate ederek seamless döngü için yeterli kare üret
  const loopImages = [...images, ...images];

  return (
    <section
      className={cn(
        'relative w-full min-h-[100svh] overflow-hidden bg-cream flex flex-col items-center justify-center text-center px-4',
        className,
      )}
      aria-label="Ana Sayfa Hero"
    >
      {/* Soft radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255,251,245,0) 0%, rgba(255,251,245,0.6) 70%, rgba(255,247,236,1) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center -mt-12 md:-mt-20">
        {/* Tagline pill */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_VARIANTS}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#dddddd] bg-white/70 px-4 py-1.5 text-xs md:text-sm font-medium text-[#555555] backdrop-blur-md shadow-sm"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          {tagline}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black leading-[1.05] max-w-4xl"
        >
          {typeof title === 'string'
            ? title.split(' ').map((word, i) => (
                <motion.span key={i} variants={FADE_IN_VARIANTS} className="inline-block">
                  {word}&nbsp;
                </motion.span>
              ))
            : title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial="hidden"
          animate="show"
          variants={FADE_IN_VARIANTS}
          transition={{ delay: 0.4 }}
          className="mt-5 max-w-xl text-base md:text-lg text-[#555555] leading-relaxed"
        >
          {description}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_VARIANTS}
          transition={{ delay: 0.55 }}
        >
          <Link
            href={ctaHref}
            className="mt-8 inline-flex items-center justify-center px-8 py-3 rounded-full bg-accent text-white text-sm font-semibold tracking-wide shadow-lg hover:bg-[#bf0038] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 transition-colors"
          >
            {ctaText}
          </Link>
        </motion.div>
      </div>

      {/* Animated envelope marquee */}
      <div
        className="absolute bottom-0 left-0 w-full h-[38%] md:h-[42%] z-0 [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]"
        aria-hidden="true"
      >
        <motion.div
          className="flex gap-5 md:gap-6 will-change-transform"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ ease: 'linear', duration: 50, repeat: Infinity }}
        >
          {loopImages.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] h-48 sm:h-56 md:h-72 lg:h-80 flex-shrink-0 rounded-2xl overflow-hidden shadow-xl"
              style={{ rotate: `${index % 2 === 0 ? -2.5 : 4}deg` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
