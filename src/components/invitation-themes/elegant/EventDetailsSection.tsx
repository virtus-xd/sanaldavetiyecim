'use client';

import { Clock, MapPin, Heart, Calendar } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useInvitationData } from '../InvitationContext';
import FloralDivider from './FloralDivider';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Clock': return Clock;
    case 'Heart': return Heart;
    case 'Calendar': return Calendar;
    default: return Clock;
  }
};

export default function EventDetailsSection() {
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

  return (
    <>
      <FloralDivider imageName="divider-2.webp" height={140} />
      <section ref={sectionRef} className="py-20 md:py-28 px-4 bg-[#faf8f5] text-[#3d3229] relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">

          <div className={`text-center mb-16 md:mb-24 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <span className="text-[#c9a96e] tracking-[0.5em] text-[10px] uppercase font-sans block mb-4">
              Program & Detaylar
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#3d3229] mb-6">
              Özel Günümüz
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-[#c9a96e]/50" />
              <Heart className="w-4 h-4 text-[#c9a96e]" strokeWidth={1.5} fill="#c9a96e" fillOpacity={0.15} />
              <div className="w-20 h-[1px] bg-gradient-to-l from-transparent to-[#c9a96e]/50" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-28">
            {invitationData.events.map((event, index) => {
              const Icon = getIcon(event.iconName);

              return (
                <div
                  key={index}
                  className={`group relative rounded-3xl overflow-hidden shadow-lg shadow-[#c9a96e]/10 transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#c9a96e]/20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-[#f5f0e8] via-[#faf8f5] to-[#f5f0e8]" />

                  <div className="relative z-10 flex flex-col items-center justify-center text-center p-8 md:p-10 min-h-[320px] bg-white/60 backdrop-blur-[2px]">

                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-[1px] bg-[#c9a96e]/40" />
                      <div className="w-1.5 h-1.5 rotate-45 bg-[#c9a96e]/40" />
                      <div className="w-8 h-[1px] bg-[#c9a96e]/40" />
                    </div>

                    <div className="w-14 h-14 rounded-full border border-[#c9a96e]/30 flex items-center justify-center mb-5 text-[#c9a96e] group-hover:scale-110 group-hover:border-[#c9a96e]/60 transition-all duration-500 bg-white/70">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>

                    <h3 className="font-serif text-xl md:text-2xl text-[#3d3229] mb-2 tracking-wider uppercase">
                      {event.title}
                    </h3>

                    <p className="text-3xl md:text-4xl font-handwriting text-[#c9a96e] mb-4">
                      {event.time}
                    </p>

                    <p className="text-[#6b5c4c] text-sm font-sans leading-relaxed max-w-[220px] mx-auto">
                      {event.description}
                    </p>

                    <div className="flex items-center gap-3 mt-6">
                      <div className="w-8 h-[1px] bg-[#c9a96e]/40" />
                      <div className="w-1.5 h-1.5 rotate-45 bg-[#c9a96e]/40" />
                      <div className="w-8 h-[1px] bg-[#c9a96e]/40" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={`relative rounded-3xl overflow-hidden shadow-xl shadow-[#c9a96e]/15 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>

            <div className="grid md:grid-cols-5 gap-0 bg-white/80 backdrop-blur-sm">

              <div className="md:col-span-2 p-10 md:p-12 flex flex-col justify-center items-center text-center space-y-6 border-b md:border-b-0 md:border-r border-[#c9a96e]/15">

                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-[1px] bg-[#c9a96e]/40" />
                  <div className="w-1.5 h-1.5 rotate-45 bg-[#c9a96e]/30" />
                  <div className="w-8 h-[1px] bg-[#c9a96e]/40" />
                </div>

                <div className="p-3 border border-[#c9a96e]/30 rounded-full text-[#c9a96e]">
                  <MapPin className="w-6 h-6" strokeWidth={1.5} />
                </div>

                <div>
                  <h3 className="font-serif text-2xl md:text-3xl text-[#3d3229] mb-4">Mekan</h3>
                  <p className="text-[#6b5c4c] font-serif text-lg mb-2">{invitationData.venue.name}</p>
                  <p className="text-[#8a7b6b] font-sans text-[10px] tracking-[0.2em] mt-2 uppercase leading-relaxed">
                    {invitationData.venue.addressLine1}
                  </p>
                  {invitationData.venue.addressLine2 ? (
                    <p className="text-[#8a7b6b] font-sans text-[10px] tracking-[0.2em] mt-1 uppercase leading-relaxed">
                      {invitationData.venue.addressLine2}
                    </p>
                  ) : null}
                </div>

                {invitationData.venue.googleMapsUrl ? (
                  <a
                    href={invitationData.venue.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 border border-[#c9a96e]/40 text-[#6b5c4c] hover:bg-[#c9a96e] hover:text-white hover:border-[#c9a96e] transition-all duration-500 font-sans text-[10px] tracking-[0.25em] uppercase rounded-full"
                  >
                    Yol Tarifi Al
                  </a>
                ) : null}

                <div className="flex items-center gap-3 mt-2">
                  <div className="w-8 h-[1px] bg-[#c9a96e]/40" />
                  <div className="w-1.5 h-1.5 rotate-45 bg-[#c9a96e]/30" />
                  <div className="w-8 h-[1px] bg-[#c9a96e]/40" />
                </div>
              </div>

              {invitationData.venue.googleMapsEmbed ? (
                <div className="md:col-span-3 h-[400px] md:h-auto">
                  <iframe
                    src={invitationData.venue.googleMapsEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'sepia(0.08) contrast(0.95)' }}
                    allowFullScreen
                    loading="lazy"
                    title="Mekan Konumu"
                    className="w-full h-full hover:filter-none transition-all duration-700"
                  />
                </div>
              ) : (
                <div className="md:col-span-3 min-h-[260px] md:min-h-0 flex items-center justify-center bg-[url('/themes/elegant/bg-desktop.webp')] bg-cover bg-center opacity-90" />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
