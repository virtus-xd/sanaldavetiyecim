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
            className="py-24 px-4 bg-white text-slate-800 relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-sky-50/30 opacity-50 pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className={`text-center mb-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <h2 className="font-serif text-4xl md:text-5xl text-cyan-900 mb-6 font-medium">Etkinlik Detayları</h2>
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-12 h-px bg-teal-200"></div>
                        <Heart className="w-5 h-5 text-teal-400 fill-teal-100" strokeWidth={1.5} />
                        <div className="w-12 h-px bg-teal-200"></div>
                    </div>
                </div>

                {/* Events Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {invitationData.events.map((event, index) => {
                        const Icon = getIcon(event.iconName);
                        return (
                            <div
                                key={index}
                                className={`group bg-sky-50/50 rounded-3xl p-10 text-center transition-all duration-300 hover:bg-sky-100 hover:-translate-y-2 border border-sky-100 shadow-sm ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
                                    }`}
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                <div className="w-16 h-16 bg-white rounded-2xl rotate-3 flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 text-teal-600 border border-teal-100">
                                    <Icon className="w-7 h-7 -rotate-3 group-hover:-rotate-6 transition-all" strokeWidth={1.5} />
                                </div>
                                <h3 className="font-serif text-2xl text-cyan-900 mb-3 group-hover:text-cyan-700 transition-colors">
                                    {event.title}
                                </h3>
                                <p className="text-teal-600 font-medium text-lg mb-4 font-sans tracking-wide">
                                    {event.time}
                                </p>
                                <p className="text-slate-500 text-sm font-sans leading-relaxed">{event.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Map Section */}
                <div className={`bg-sky-50/50 rounded-3xl overflow-hidden shadow-lg border border-sky-100 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
                    <div className="grid md:grid-cols-3 gap-0">
                        {/* Info Panel */}
                        <div className="p-10 flex flex-col justify-center space-y-6 md:border-r border-sky-200 bg-white/50 backdrop-blur">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-sky-100 rounded-full text-teal-600">
                                    <MapPin className="w-6 h-6" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className="font-serif text-2xl text-cyan-900 mb-2">Mekan</h3>
                                    <p className="text-slate-700 font-medium font-sans">{invitationData.venue.name}</p>
                                    <p className="text-slate-500 font-sans text-sm mt-1">{invitationData.venue.addressLine1}</p>
                                    <p className="text-slate-500 font-sans text-sm">{invitationData.venue.addressLine2}</p>
                                </div>
                            </div>

                            <a
                                href={invitationData.venue.googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-flex items-center justify-center px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-full transition-all duration-300 font-sans text-sm tracking-widest uppercase group shadow-md hover:shadow-lg"
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
                                className="w-full h-full hue-rotate-[160deg] contrast-125 saturate-50 hover:hue-rotate-0 hover:contrast-100 hover:saturate-100 transition-all duration-700"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
