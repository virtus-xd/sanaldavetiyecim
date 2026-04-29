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
            className="py-24 px-4 bg-[#E8DCCB] text-[#4A3B32] relative overflow-hidden"
        >
            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 bg-[#FAF6F0] opacity-50 pointer-events-none mix-blend-soft-light" />

            <div className="max-w-5xl mx-auto relative z-10">

                {/* Header */}
                <div className={`text-center mb-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <h2 className="font-serif text-5xl md:text-6xl text-[#5C4033] mb-6">Program & Mekan</h2>
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="w-2 h-2 rounded-full bg-[#A68A64]"></div>
                        <div className="w-2 h-2 rounded-full bg-[#A68A64]"></div>
                        <div className="w-2 h-2 rounded-full bg-[#A68A64]"></div>
                    </div>
                </div>

                {/* Events Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-24">
                    {invitationData.events.map((event, index) => {
                        const Icon = getIcon(event.iconName);
                        return (
                            <div
                                key={index}
                                className={`bg-[#FAF6F0] rounded-sm p-8 text-center border border-[#D4C3B3] shadow-md transition-all duration-300 hover:shadow-lg ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
                                    }`}
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                <div className="w-14 h-14 border border-[#A68A64] rounded-full flex items-center justify-center mx-auto mb-6 text-[#8B7355]">
                                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                                </div>
                                <h3 className="font-serif text-2xl text-[#5C4033] mb-2">
                                    {event.title}
                                </h3>
                                <div className="h-px w-8 bg-[#A68A64] mx-auto mb-3"></div>
                                <p className="text-[#8B7355] font-semibold text-lg mb-4 font-sans tracking-widest">
                                    {event.time}
                                </p>
                                <p className="text-[#7A6A5A] text-sm font-sans leading-relaxed italic">{event.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Map Section */}
                <div className={`bg-[#FAF6F0] border border-[#D4C3B3] p-[8px] shadow-xl ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
                    <div className="grid md:grid-cols-2 gap-0 border border-[#D4C3B3]">
                        
                        {/* Info Panel */}
                        <div className="p-10 md:p-14 flex flex-col justify-center space-y-6 md:border-r border-[#D4C3B3]">
                            <div className="flex flex-col items-center text-center gap-4">
                                <MapPin className="w-10 h-10 text-[#A68A64] mb-2" strokeWidth={1} />
                                <div>
                                    <h3 className="font-serif text-3xl text-[#5C4033] mb-4">Mekan</h3>
                                    <p className="text-[#7A6A5A] font-semibold font-sans text-lg">{invitationData.venue.name}</p>
                                    <p className="text-[#8B7355] font-sans mt-2">{invitationData.venue.addressLine1}</p>
                                    <p className="text-[#8B7355] font-sans">{invitationData.venue.addressLine2}</p>
                                </div>
                            </div>

                            <div className="flex justify-center pt-6">
                                <a
                                    href={invitationData.venue.googleMapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-3 bg-[#5C4033] hover:bg-[#4A3B32] text-[#FAF6F0] transition-colors font-sans text-sm tracking-widest uppercase"
                                >
                                    Haritada Aç
                                </a>
                            </div>
                        </div>

                        {/* Map Iframe */}
                        <div className="h-[300px] md:h-auto sepia hover:sepia-0 transition-all duration-500">
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
