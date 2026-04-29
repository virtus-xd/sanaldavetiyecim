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
            className="py-24 px-4 bg-orange-50 text-stone-900 relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/30 via-transparent to-transparent pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className={`text-center mb-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <h2 className="font-serif text-4xl md:text-6xl text-rose-950 mb-6 font-medium">Etkinlik Programı</h2>
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-8 h-px bg-amber-700"></div>
                        <Heart className="w-5 h-5 text-amber-600 fill-amber-100" strokeWidth={1.5} />
                        <div className="w-8 h-px bg-amber-700"></div>
                    </div>
                </div>

                {/* Events Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {invitationData.events.map((event, index) => {
                        const Icon = getIcon(event.iconName);
                        return (
                            <div
                                key={index}
                                className={`group bg-white/60 backdrop-blur-sm rounded-tr-3xl rounded-bl-3xl rounded-tl-md rounded-br-md p-10 text-center transition-all duration-300 hover:bg-orange-100/50 hover:-translate-y-2 border border-amber-900/10 shadow-lg ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
                                    }`}
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                <div className="w-16 h-16 bg-rose-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-110 transition-transform duration-300 text-orange-50 border-4 border-orange-100">
                                    <Icon className="w-7 h-7" strokeWidth={1.5} />
                                </div>
                                <h3 className="font-serif text-2xl text-rose-950 mb-3 group-hover:text-amber-700 transition-colors font-medium">
                                    {event.title}
                                </h3>
                                <p className="text-stone-600 font-semibold text-lg mb-4 font-sans tracking-wide">
                                    {event.time}
                                </p>
                                <p className="text-stone-500 text-sm font-serif italic leading-relaxed">{event.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Map Section */}
                <div className={`bg-white/80 rounded-tr-3xl rounded-bl-3xl overflow-hidden shadow-2xl border-2 border-amber-900/10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
                    <div className="grid md:grid-cols-3 gap-0">
                        {/* Info Panel */}
                        <div className="p-10 flex flex-col justify-center space-y-6 md:border-r border-amber-900/10 bg-orange-50/50">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-amber-100 rounded-full text-amber-700 border border-amber-200">
                                    <MapPin className="w-6 h-6" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className="font-serif text-2xl text-rose-950 mb-2 font-medium">Ulaşım</h3>
                                    <p className="text-stone-800 font-medium font-sans">{invitationData.venue.name}</p>
                                    <p className="text-stone-600 font-sans text-sm mt-1">{invitationData.venue.addressLine1}</p>
                                    <p className="text-stone-600 font-sans text-sm">{invitationData.venue.addressLine2}</p>
                                </div>
                            </div>

                            <a
                                href={invitationData.venue.googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-flex items-center justify-center px-8 py-3 bg-amber-700 hover:bg-rose-900 text-orange-50 rounded-full transition-all duration-300 font-sans text-xs font-semibold tracking-widest uppercase shadow-md hover:shadow-lg"
                            >
                                Konuma Git <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                        </div>

                        {/* Map Iframe */}
                        <div className="md:col-span-2 h-[400px] md:h-auto">
                            <iframe
                                src={invitationData.venue.googleMapsEmbed}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                title="Mekan Konumu"
                                className="w-full h-full sepia-[0.3] contrast-125 hover:sepia-0 hover:contrast-100 transition-all duration-700"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
