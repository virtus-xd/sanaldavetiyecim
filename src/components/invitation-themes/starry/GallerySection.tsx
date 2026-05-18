'use client';

import { useEffect, useRef, useState } from 'react';
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
      className="py-24 px-4 bg-slate-950 text-slate-100 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/themes/starry/bg.webp')] bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none mix-blend-screen" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-transparent to-slate-950/90 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-slate-400 tracking-[0.5em] text-[10px] uppercase font-sans block mb-4">
            Anılarımız
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 font-light drop-shadow-[0_0_15px_rgba(199,210,254,0.25)]">
            Bizim Hikayemiz
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-slate-500 to-transparent" />
            <div className="w-1.5 h-1.5 bg-slate-300 rotate-45" />
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-slate-500 to-transparent" />
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
          <p className="text-slate-300 font-handwriting text-2xl md:text-3xl tracking-wide">
            {invitationData.brideName} &amp; {invitationData.groomName}
          </p>
        </div>
      </div>
    </section>
  );
}
