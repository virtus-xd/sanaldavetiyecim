'use client';

import { Clock, MapPin, Heart, Calendar } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useInvitationData } from '../InvitationContext';

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
    <section ref={sectionRef} className="py-24 px-4 bg-[#f9f6f0] text-[#5c4a3d] relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className={`text-center mb-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="font-serif text-4xl md:text-5xl text-[#4a3b32] mb-6">Program &amp; Mekan</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-[#d5cabb]" />
            <Heart className="w-5 h-5 text-[#b5a397] fill-[#f9f6f0]" strokeWidth={1.5} />
            <div className="w-16 h-px bg-[#d5cabb]" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {invitationData.events.map((event, index) => {
            const Icon = getIcon(event.iconName);
            return (
              <div
                key={index}
                className={`group bg-[#fdfdfb] border border-[#f0ebd8] p-8 rounded-t-[10rem] rounded-b-md text-center shadow-lg shadow-[#d5cabb]/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-16 h-16 border-2 border-[#d5cabb] rounded-full flex items-center justify-center mx-auto mb-8 mt-4 text-[#8c7b6d] group-hover:scale-110 transition-all duration-500">
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl text-[#4a3b32] mb-3 uppercase tracking-widest">{event.title}</h3>
                <div className="w-8 h-px bg-[#d5cabb] mx-auto mb-4" />
                <p className="text-[#8c7b6d] font-sans text-xs tracking-[0.2em] mb-4 uppercase">{event.time}</p>
                <p className="text-[#6b5b4e] text-sm font-sans leading-relaxed px-2">{event.description}</p>
              </div>
            );
          })}
        </div>

        <div className={`bg-[#fdfdfb] border border-[#f0ebd8] rounded-[2rem] overflow-hidden shadow-xl shadow-[#d5cabb]/20 p-3 md:p-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
          <div className="grid md:grid-cols-3 gap-0 border border-[#f0ebd8] rounded-[1.5rem] overflow-hidden">

            <div className="p-10 flex flex-col justify-center space-y-8 md:border-r border-[#f0ebd8] bg-[#f9f6f0]">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-4 border border-[#d5cabb] rounded-full text-[#8c7b6d]">
                  <MapPin className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-[#4a3b32] mb-4">Adres Bilgileri</h3>
                  <p className="text-[#5c4a3d] font-serif text-lg mb-2">{invitationData.venue.name}</p>
                  <p className="text-[#8c7b6d] font-sans text-[10px] tracking-widest mt-2 uppercase">{invitationData.venue.addressLine1}</p>
                  {invitationData.venue.addressLine2 ? (
                    <p className="text-[#8c7b6d] font-sans text-[10px] tracking-widest mt-1 uppercase">{invitationData.venue.addressLine2}</p>
                  ) : null}
                </div>
              </div>
              {invitationData.venue.googleMapsUrl ? (
                <div className="flex justify-center pt-4">
                  <a
                    href={invitationData.venue.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 border border-[#d5cabb] text-[#5c4a3d] hover:bg-[#5c4a3d] hover:text-[#f9f6f0] transition-colors font-sans text-[10px] tracking-widest uppercase rounded-sm shadow-sm"
                  >
                    Yol Tarifi Al
                  </a>
                </div>
              ) : null}
            </div>

            {invitationData.venue.googleMapsEmbed ? (
              <div className="md:col-span-2 h-[400px] md:h-auto sepia-[0.3] contrast-90 hover:sepia-0 hover:contrast-100 transition-all duration-700">
                <iframe
                  src={invitationData.venue.googleMapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Mekan Konumu"
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className="md:col-span-2 min-h-[260px] md:min-h-0 bg-[url('/themes/boho/bg.png')] bg-cover bg-center opacity-60" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
