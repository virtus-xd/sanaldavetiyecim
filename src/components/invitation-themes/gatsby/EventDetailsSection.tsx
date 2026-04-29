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
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-24 px-4 bg-[#0a0a0a] text-amber-100 relative overflow-hidden"
        >
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className={`text-center mb-24 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <h2 className="font-serif text-4xl md:text-5xl text-amber-500 mb-8 uppercase tracking-[0.2em] font-light">
                        Etkinlik Detayları
                    </h2>
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent to-amber-600/50"></div>
                        <div className="w-2 h-2 rotate-45 border border-amber-500 bg-amber-900/40"></div>
                        <div className="w-32 h-[1px] bg-gradient-to-l from-transparent to-amber-600/50"></div>
                    </div>
                </div>

                {/* Events Grid */}
                <div className="grid md:grid-cols-3 gap-10 mb-24">
                    {invitationData.events.map((event, index) => {
                        const Icon = getIcon(event.iconName);
                        return (
                            <div
                                key={index}
                                className={`group bg-black p-10 text-center transition-all duration-500 border-2 border-amber-900/30 hover:border-amber-600/80 shadow-[0_4px_20px_rgba(0,0,0,0.5)] ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
                                    }`}
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                <div className="w-16 h-16 bg-black border border-amber-500/50 rotate-45 flex items-center justify-center mx-auto mb-10 shadow-lg group-hover:scale-110 transition-transform duration-500 text-amber-500">
                                    <Icon className="w-6 h-6 -rotate-45" strokeWidth={1} />
                                </div>
                                <h3 className="font-serif text-xl text-amber-400 mb-4 uppercase tracking-[0.3em] font-light group-hover:text-amber-300">
                                    {event.title}
                                </h3>
                                <p className="text-amber-600 font-sans tracking-[0.4em] text-sm mb-6 border-b border-amber-900/40 pb-4 inline-block">
                                    {event.time}
                                </p>
                                <p className="text-amber-100/40 text-xs font-sans tracking-widest leading-relaxed uppercase">{event.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Map Section */}
                <div className={`bg-black border border-amber-700/30 shadow-2xl p-2 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
                    <div className="grid md:grid-cols-3 gap-0 border border-amber-900/40">
                        {/* Info Panel */}
                        <div className="p-12 flex flex-col justify-center space-y-8 md:border-r border-amber-900/40 bg-[#080808]">
                            <div className="flex flex-col items-center text-center gap-6">
                                <div className="p-4 border border-amber-600/50 rounded-full text-amber-500">
                                    <MapPin className="w-6 h-6" strokeWidth={1} />
                                </div>
                                <div>
                                    <h3 className="font-sans text-xl text-amber-600 mb-4 uppercase tracking-[0.3em]">Adres</h3>
                                    <p className="text-amber-200 font-serif text-xl mb-4">{invitationData.venue.name}</p>
                                    <p className="text-amber-100/50 font-sans text-xs tracking-widest mb-1">{invitationData.venue.addressLine1}</p>
                                    <p className="text-amber-100/50 font-sans text-xs tracking-widest">{invitationData.venue.addressLine2}</p>
                                </div>
                            </div>

                            <div className="flex justify-center pt-8">
                                <a
                                    href={invitationData.venue.googleMapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 border border-amber-600 text-amber-500 hover:bg-amber-600 hover:text-black transition-all duration-300 font-sans text-xs tracking-[0.3em] uppercase"
                                >
                                    Navigasyon
                                </a>
                            </div>
                        </div>

                        {/* Map Iframe */}
                        <div className="md:col-span-2 h-[400px] md:h-auto border-l border-amber-900/40">
                            <iframe
                                src={invitationData.venue.googleMapsEmbed}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                title="Mekan Konumu"
                                className="w-full h-full grayscale contrast-150 brightness-50 invert opacity-80 hover:opacity-100 transition-opacity duration-700"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
