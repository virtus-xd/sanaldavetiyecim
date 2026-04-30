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
        'relative w-full min-h-[100svh] overflow-hidden flex flex-col items-center justify-center text-center px-4',
        className,
      )}
      aria-label="Ana Sayfa Hero"
    >
      {/* Watercolor floral background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/images/hero-theme-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
        aria-hidden="true"
      />
      {/* Soft fade to blend bottom into page */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(244,236,223,0) 0%, rgba(244,236,223,0) 55%, rgba(244,236,223,0.85) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center -mt-48 md:-mt-60">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 90, damping: 18 }}
          className="mb-2"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/sanaldavetiyecim-logo.png"
            alt="Sanal Davetiyecim"
            className="h-32 w-32 sm:h-40 sm:w-40 md:h-44 md:w-44 object-contain"
            loading="eager"
          />
        </motion.div>

        {/* Tagline pill */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_VARIANTS}
          className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#dddddd] bg-white/70 px-3.5 py-1 text-[11px] md:text-xs font-medium text-[#555555] backdrop-blur-md shadow-sm"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          {tagline}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black leading-[1.05] max-w-4xl"
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
          className="mt-4 max-w-xl text-sm md:text-base text-[#555555] leading-relaxed"
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
            className="mt-6 inline-flex items-center justify-center px-7 py-2.5 rounded-full bg-accent text-white text-xs md:text-sm font-semibold tracking-wide shadow-lg hover:bg-[#bf0038] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 transition-colors"
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
