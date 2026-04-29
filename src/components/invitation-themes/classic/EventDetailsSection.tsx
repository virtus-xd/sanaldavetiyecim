'use client';

import { Clock, MapPin, Heart, Calendar } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Sparkles from '../../invitation-shared/Sparkles';
import { useInvitationData } from '../InvitationContext';

// İkon eşleme yardimcisi (String isimden Lucide ikonuna)
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
            className="py-24 px-4 bg-[#0f1a12] text-[#f7f5ef] relative overflow-hidden"
        >
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-600/5 rounded-full blur-3xl pointer-events-none" />

            <Sparkles />

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Header */}
                <div className={`text-center mb-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <h2 className="font-serif text-5xl md:text-6xl text-gold-300 mb-6 drop-shadow-lg">Etkinlik Detayları</h2>
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="h-[1px] w-12 bg-gold-500/30"></div>
                        <div className="w-1.5 h-1.5 rotate-45 bg-gold-500"></div>
                        <div className="h-[1px] w-12 bg-gold-500/30"></div>
                    </div>
                    <p className="text-xl text-gray-400 font-light font-sans max-w-2xl mx-auto">
                        Sözümüz {invitationData.venue.name}nde Gerçekleşecektir
                    </p>
                </div>

                {/* Events Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {invitationData.events.map((event, index) => {
                        const Icon = getIcon(event.iconName);
                        return (
                            <div
                                key={index}
                                className={`group relative bg-white/5 backdrop-blur-sm border border-gold-500/10 rounded-xl p-8 text-center transition-all duration-300 hover:bg-white/10 hover:border-gold-500/30 hover:-translate-y-2 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
                                    }`}
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-gold-500/20 to-gold-900/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-gold-500/20">
                                    <Icon className="w-7 h-7 text-gold-300" />
                                </div>
                                <h3 className="font-serif text-2xl text-gold-100 mb-3 group-hover:text-gold-300 transition-colors">
                                    {event.title}
                                </h3>
                                <p className="text-gold-400 font-medium text-lg mb-4 font-sans tracking-wide">
                                    {event.time}
                                </p>
                                <p className="text-gray-400 text-sm font-sans leading-relaxed">{event.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Map Section */}
                <div className={`relative bg-gradient-to-br from-[#162419] to-[#0f1a12] rounded-2xl border border-gold-500/10 p-1 shadow-2xl overflow-hidden ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>

                    <div className="grid md:grid-cols-3 gap-0">

                        {/* Info Panel */}
                        <div className="p-10 flex flex-col justify-center space-y-6 md:border-r border-gold-500/10">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gold-500/10 rounded-full text-gold-400">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-serif text-2xl text-gold-200 mb-2">Mekan</h3>
                                    <p className="text-gray-300 font-medium font-sans">{invitationData.venue.name}</p>
                                    <p className="text-gray-500 font-sans text-sm mt-1">{invitationData.venue.addressLine1}</p>
                                    <p className="text-gray-500 font-sans text-sm">{invitationData.venue.addressLine2}</p>
                                </div>
                            </div>

                            <a
                                href={invitationData.venue.googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-flex items-center justify-center px-8 py-3 bg-gold-600/20 hover:bg-gold-600/30 text-gold-300 hover:text-gold-200 border border-gold-500/30 rounded-full transition-all duration-300 font-sans text-sm tracking-wider uppercase group"
                            >
                                Konuma Git <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                        </div>

                        {/* Map Iframe */}
                        <div className="md:col-span-2 h-[400px] md:h-auto bg-[#1a1a1a] grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
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
