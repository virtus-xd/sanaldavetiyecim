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
            className="py-24 px-4 bg-slate-950 text-slate-200 relative overflow-hidden"
        >
            <div className="absolute inset-x-0 -top-40 max-w-ful h-[800px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className={`text-center mb-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 font-light">Gecenin Akışı</h2>
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-24 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
                        <Heart className="w-4 h-4 text-slate-500 fill-slate-800" strokeWidth={1} />
                        <div className="w-24 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
                    </div>
                </div>

                {/* Events Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {invitationData.events.map((event, index) => {
                        const Icon = getIcon(event.iconName);
                        return (
                            <div
                                key={index}
                                className={`group bg-slate-900/40 backdrop-blur-md rounded-2xl p-10 text-center transition-all duration-500 hover:bg-slate-800/60 border border-slate-800 hover:border-slate-700 hover:-translate-y-2 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
                                    }`}
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                <div className="w-16 h-16 bg-slate-800/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500 text-indigo-300 border border-slate-700">
                                    <Icon className="w-6 h-6" strokeWidth={1} />
                                </div>
                                <h3 className="font-serif text-2xl text-white mb-3 group-hover:text-indigo-200 transition-colors font-light">
                                    {event.title}
                                </h3>
                                <p className="text-slate-400 font-sans text-sm tracking-[0.2em] mb-4 uppercase">
                                    {event.time}
                                </p>
                                <p className="text-slate-500 text-sm font-sans leading-relaxed font-light">{event.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Map Section */}
                <div className={`bg-slate-900/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-800 shadow-2xl ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
                    <div className="grid md:grid-cols-3 gap-0">
                        {/* Info Panel */}
                        <div className="p-10 flex flex-col justify-center space-y-6 md:border-r border-slate-800">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-slate-800 rounded-full text-indigo-300 border border-slate-700">
                                    <MapPin className="w-5 h-5" strokeWidth={1} />
                                </div>
                                <div>
                                    <h3 className="font-serif text-2xl text-white mb-2 font-light">Mekan</h3>
                                    <p className="text-slate-300 font-medium font-sans">{invitationData.venue.name}</p>
                                    <p className="text-slate-500 font-sans text-sm mt-1">{invitationData.venue.addressLine1}</p>
                                    <p className="text-slate-500 font-sans text-sm">{invitationData.venue.addressLine2}</p>
                                </div>
                            </div>

                            <a
                                href={invitationData.venue.googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-flex items-center justify-center px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 rounded-full transition-all duration-300 font-sans text-xs tracking-[0.2em] uppercase group"
                            >
                                Yol Tarifi Al <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                        </div>

                        {/* Map Iframe */}
                        <div className="md:col-span-2 h-[400px] md:h-auto bg-[#0f172a] invert hue-rotate-180 opacity-80 hover:opacity-100 transition-opacity duration-1000">
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
