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
            className="py-24 px-4 bg-white text-[#5D534A] relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-[#F4F1E1] opacity-60 pointer-events-none mix-blend-multiply" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className={`text-center mb-24 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <h2 className="font-serif text-4xl md:text-5xl text-[#4A5D23] mb-6 font-medium">Program & Mekan</h2>
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-24 h-px bg-gradient-to-r from-transparent to-[#A8C3A6]"></div>
                        <Heart className="w-5 h-5 text-[#8B9D77] fill-transparent" strokeWidth={1} />
                        <div className="w-24 h-px bg-gradient-to-l from-transparent to-[#A8C3A6]"></div>
                    </div>
                </div>

                {/* Events Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-24 border-y border-[#A8C3A6]/30 py-12">
                    {invitationData.events.map((event, index) => {
                        const Icon = getIcon(event.iconName);
                        return (
                            <div
                                key={index}
                                className={`group p-8 text-center transition-all duration-500 hover:bg-[#F4F1E1]/50 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
                                    }`}
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                <div className="w-14 h-14 border border-[#8B9D77] rounded flex items-center justify-center mx-auto mb-6 text-[#4A5D23] group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 bg-white">
                                    <Icon className="w-6 h-6" strokeWidth={1} />
                                </div>
                                <h3 className="font-serif text-xl text-[#3A5A40] mb-3 uppercase tracking-widest font-medium">
                                    {event.title}
                                </h3>
                                <p className="text-[#8B9D77] font-sans text-sm tracking-[0.2em] mb-4">
                                    {event.time}
                                </p>
                                <p className="text-[#6B705C] text-sm font-serif italic leading-relaxed">{event.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Map Section */}
                <div className={`bg-white rounded-lg overflow-hidden shadow-2xl shadow-[#A8C3A6]/20 border border-[#EED9C4] p-2 md:p-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
                    <div className="grid md:grid-cols-3 gap-0 border border-dashed border-[#A8C3A6]/60">
                        {/* Info Panel */}
                        <div className="p-10 flex flex-col justify-center space-y-8 md:border-r border-dashed border-[#A8C3A6]/60 bg-[#F9F7F0]">
                            <div className="flex flex-col items-center text-center gap-4">
                                <div className="p-4 bg-white shadow-sm border border-[#EED9C4] rounded-full text-[#8B9D77]">
                                    <MapPin className="w-6 h-6" strokeWidth={1} />
                                </div>
                                <div>
                                    <h3 className="font-serif text-2xl text-[#4A5D23] mb-4">Adres Bilgileri</h3>
                                    <p className="text-[#5D534A] font-medium font-sans border-b border-[#A8C3A6]/30 pb-2 inline-block mb-2">{invitationData.venue.name}</p>
                                    <p className="text-[#6B705C] font-sans text-xs uppercase tracking-wider mt-2">{invitationData.venue.addressLine1}</p>
                                    <p className="text-[#6B705C] font-sans text-xs uppercase tracking-wider mt-1">{invitationData.venue.addressLine2}</p>
                                </div>
                            </div>

                            <div className="flex justify-center pt-4">
                                <a
                                    href={invitationData.venue.googleMapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-3 bg-white border border-[#8B9D77] text-[#4A5D23] hover:bg-[#A8C3A6] hover:text-white transition-all duration-300 font-sans text-xs tracking-widest uppercase shadow-sm"
                                >
                                    Yol Tarifi Al
                                </a>
                            </div>
                        </div>

                        {/* Map Iframe */}
                        <div className="md:col-span-2 h-[400px] md:h-auto sepia-[0.5] contrast-90 hover:sepia-0 hover:contrast-100 transition-all duration-1000">
                            <iframe
                                src={invitationData.venue.googleMapsEmbed}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                title="Mekan Konumu"
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
