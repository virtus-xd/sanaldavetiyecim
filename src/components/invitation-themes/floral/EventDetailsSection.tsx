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
            className="py-24 px-4 bg-white text-stone-800 relative overflow-hidden"
        >
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className={`text-center mb-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <h2 className="font-serif text-4xl md:text-5xl text-rose-800 mb-6 font-medium">Etkinlik Detayları</h2>
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-12 h-px bg-rose-200"></div>
                        <Heart className="w-4 h-4 text-rose-300" />
                        <div className="w-12 h-px bg-rose-200"></div>
                    </div>
                </div>

                {/* Events Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {invitationData.events.map((event, index) => {
                        const Icon = getIcon(event.iconName);
                        return (
                            <div
                                key={index}
                                className={`group bg-rose-50/50 rounded-[2rem] p-10 text-center transition-all duration-300 hover:bg-rose-100 hover:-translate-y-2 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
                                    }`}
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 text-rose-400">
                                    <Icon className="w-7 h-7" strokeWidth={1.5} />
                                </div>
                                <h3 className="font-serif text-2xl text-stone-800 mb-3 group-hover:text-rose-700 transition-colors">
                                    {event.title}
                                </h3>
                                <p className="text-rose-500 font-medium text-lg mb-4 font-sans tracking-wide">
                                    {event.time}
                                </p>
                                <p className="text-stone-500 text-sm font-sans leading-relaxed">{event.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Map Section */}
                <div className={`bg-rose-50 rounded-[2rem] overflow-hidden shadow-xl ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
                    <div className="grid md:grid-cols-3 gap-0">
                        {/* Info Panel */}
                        <div className="p-10 flex flex-col justify-center space-y-6 md:border-r border-rose-100 bg-white/50 backdrop-blur">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-rose-100 rounded-full text-rose-500">
                                    <MapPin className="w-6 h-6" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className="font-serif text-2xl text-stone-800 mb-2">Mekan</h3>
                                    <p className="text-stone-600 font-medium font-sans">{invitationData.venue.name}</p>
                                    <p className="text-stone-500 font-sans text-sm mt-1">{invitationData.venue.addressLine1}</p>
                                    <p className="text-stone-500 font-sans text-sm">{invitationData.venue.addressLine2}</p>
                                </div>
                            </div>

                            <a
                                href={invitationData.venue.googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-flex items-center justify-center px-8 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-full transition-all duration-300 font-sans text-sm tracking-wider uppercase group shadow-md hover:shadow-lg"
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
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
