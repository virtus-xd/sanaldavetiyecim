'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useInvitationData } from '../InvitationContext';

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
            className="py-32 px-6 bg-neutral-950 text-white relative font-sans"
        >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
                
                {/* Left Column: Title & Timeline */}
                <div className={`md:w-1/2 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-16">Program</h2>
                    
                    <div className="space-y-12 border-l border-neutral-800 pl-8 ml-4">
                        {invitationData.events.map((event, index) => (
                            <div key={index} className="relative group">
                                {/* Dot */}
                                <div className="absolute -left-[37px] top-2 w-3 h-3 bg-neutral-800 rounded-full group-hover:bg-white transition-colors"></div>
                                
                                <p className="text-neutral-500 font-medium mb-1 tracking-widest text-sm">{event.time}</p>
                                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">{event.title}</h3>
                                <p className="text-neutral-400 font-light leading-relaxed max-w-sm">{event.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Location */}
                <div className={`md:w-1/2 flex flex-col justify-between ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                    
                    <div>
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12">Mekan</h2>
                        
                        <div className="space-y-2 mb-12">
                            <p className="text-3xl font-medium tracking-tight">{invitationData.venue.name}</p>
                            <p className="text-neutral-400 text-lg">{invitationData.venue.addressLine1}</p>
                            <p className="text-neutral-400 text-lg">{invitationData.venue.addressLine2}</p>
                            
                            <a 
                                href={invitationData.venue.googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 mt-6 text-sm tracking-[0.2em] uppercase font-semibold border-b border-white pb-1 hover:text-neutral-400 hover:border-neutral-400 transition-colors"
                            >
                                Yol Tarifi Al <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Minimalist Map Frame */}
                    <div className="w-full h-[300px] md:h-[400px] bg-neutral-900 grayscale hover:grayscale-0 transition-all duration-700 ease-in-out">
                        <iframe
                            src={invitationData.venue.googleMapsEmbed}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            title="Mekan Konumu"
                            className="w-full h-full opacity-60 hover:opacity-100 transition-opacity duration-700"
                        ></iframe>
                    </div>

                </div>

            </div>
        </section>
    );
}
