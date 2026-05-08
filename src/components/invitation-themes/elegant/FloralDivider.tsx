'use client';

import { useEffect, useRef, useState } from 'react';

interface FloralDividerProps {
  /** public/themes/elegant/ altındaki görsel adı, örn: "divider-1.png" */
  imageName?: string;
  /** Opsiyonel yükseklik (px). Varsayılan: 120 */
  height?: number;
  /** Arka plan rengi (üst ve alt bölümlerle uyum için) */
  bgColor?: string;
}

export default function FloralDivider({
  imageName = 'divider-1.png',
  height = 120,
  bgColor = '#faf8f5',
}: FloralDividerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [imgError, setImgError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 },
    );
    if (node) observer.observe(node);
    return () => { if (node) observer.unobserve(node); };
  }, []);

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ height: `${height}px`, backgroundColor: bgColor }}
    >
      {!imgError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/themes/elegant/${imageName}`}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-6">
            <div className="w-24 md:w-40 h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e]/50 to-[#c9a96e]/50" />
            <div className="w-2 h-2 rotate-45 border border-[#c9a96e]/50" />
            <div className="w-3 h-3 rotate-45 border border-[#c9a96e]/40" />
            <div className="w-2 h-2 rotate-45 border border-[#c9a96e]/50" />
            <div className="w-24 md:w-40 h-[1px] bg-gradient-to-l from-transparent via-[#c9a96e]/50 to-[#c9a96e]/50" />
          </div>
        </div>
      )}
    </div>
  );
}
