'use client';

/**
 * Scroll ile tetiklenen fade-in animasyon hook'u.
 * Framer Motion `useInView` tabanlı.
 */
import { useRef } from 'react';
import { useInView } from 'framer-motion';

interface UseScrollAnimationOptions {
  /** Görünürlük eşiği (0-1) */
  threshold?: number;
  /** Sadece bir kez tetikle */
  once?:      boolean;
  /** Tetikleme öncesi marj */
  margin?:    string;
}

export function useScrollAnimation({
  threshold = 0.1,
  once      = true,
  margin    = '0px 0px -50px 0px',
}: UseScrollAnimationOptions = {}) {
  const ref     = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inView  = useInView(ref, { once, margin: margin as any, amount: threshold });

  return { ref, inView };
}

import type { Variants } from 'framer-motion';

/** Fade-up animasyon varyantları */
export const fadeUpVariants: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y:       0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

/** Staggered children için konteyner varyantı */
export const staggerContainerVariants: Variants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

/** Fade-in (dikey kayma yok) */
export const fadeInVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity:    1,
    transition: { duration: 0.4 },
  },
};
