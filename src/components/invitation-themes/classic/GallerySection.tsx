'use client';

import { useEffect, useRef, useState } from 'react';
import ImageReveal from '../../invitation-shared/ImageTiles';
import Sparkles from '../../invitation-shared/Sparkles';
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
      className="py-24 px-4 bg-[#0f1a12] text-[#f7f5ef] relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-600/5 rounded-full blur-3xl pointer-events-none" />
      <Sparkles />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-gold-400/80 tracking-[0.4em] text-[10px] uppercase font-sans block mb-4">
            Anılarımız
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-gold-300 mb-6 drop-shadow-lg">
            Bizim Hikayemiz
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-16 bg-gold-500/30" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold-500" />
            <div className="h-[1px] w-16 bg-gold-500/30" />
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
          <p className="text-gold-200/80 font-handwriting text-2xl md:text-3xl">
            {invitationData.brideName} &amp; {invitationData.groomName}
          </p>
        </div>
      </div>
    </section>
  );
}
