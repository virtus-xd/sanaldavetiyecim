'use client';

import { useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';
import ImageReveal from '../../invitation-shared/ImageTiles';
import { useInvitationData } from '../InvitationContext';

export default function GallerySection() {
  const invitationData = useInvitationData();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 },
    );
    if (node) observer.observe(node);
    return () => { if (node) observer.unobserve(node); };
  }, []);

  const photos = invitationData.gallery ?? [];
  if (photos.length < 3) return null;

  const row1 = [photos[0], photos[1], photos[2]];
  const row2 = photos.length >= 6 ? [photos[3], photos[4], photos[5]] : null;

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 bg-[#fdfaf9] text-[#3a3f38] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/themes/flowers-pink/bg.webp')] bg-cover bg-center opacity-15 pointer-events-none mix-blend-multiply" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-[#8c9c90] tracking-[0.4em] text-[10px] uppercase font-sans block mb-4">
            Anılarımız
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#4b5c51] mb-6">
            Bizim Hikayemiz
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-[#e6d5d5]" />
            <Heart className="w-5 h-5 text-[#d4a5a5]" strokeWidth={1.5} />
            <div className="w-16 h-px bg-[#e6d5d5]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4">
          <div
            className={`flex items-center justify-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.3s' }}
          >
            <div className="transform scale-[0.65] md:scale-100 origin-center">
              <ImageReveal leftImage={row1[0]} middleImage={row1[1]} rightImage={row1[2]} />
            </div>
          </div>

          {row2 ? (
            <div
              className={`flex items-center justify-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.5s' }}
            >
              <div className="transform scale-[0.65] md:scale-100 origin-center">
                <ImageReveal leftImage={row2[0]} middleImage={row2[1]} rightImage={row2[2]} />
              </div>
            </div>
          ) : null}
        </div>

        <div
          className={`text-center mt-10 md:mt-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.6s' }}
        >
          <p className="text-[#7a8a7f] font-handwriting text-2xl md:text-3xl">
            {invitationData.brideName} &amp; {invitationData.groomName}
          </p>
        </div>
      </div>
    </section>
  );
}
