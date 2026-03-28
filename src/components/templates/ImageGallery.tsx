'use client';

/**
 * Tasarım detay sayfasındaki görsel galerisi.
 */
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  alt:    string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActive((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="flex flex-col gap-3">
      {/* Ana görsel */}
      <div className="relative rounded-2xl overflow-hidden bg-neutral-100 aspect-[4/3]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[active]}
          alt={`${alt} — görsel ${active + 1}`}
          className="w-full h-full object-cover"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center text-neutral-700 hover:bg-white transition-colors"
              aria-label="Önceki görsel"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center text-neutral-700 hover:bg-white transition-colors"
              aria-label="Sonraki görsel"
            >
              <ChevronRight size={18} />
            </button>

            {/* Gösterge */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={cn(
                    'rounded-full transition-all duration-200',
                    i === active ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/60'
                  )}
                  aria-label={`Görsel ${i + 1}`}
                  aria-current={i === active}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Küçük resimler */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                'flex-1 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-150',
                i === active ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
              )}
              aria-label={`Görsel ${i + 1}`}
              aria-current={i === active}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
