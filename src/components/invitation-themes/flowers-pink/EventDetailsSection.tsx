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
            { threshold: 0.1 }
        );
        if (node) observer.observe(node);
        return () => { if (node) observer.unobserve(node); };
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-4 bg-[#fdfaf9] text-[#3a3f38] relative overflow-hidden">
            <div className="max-w-5xl mx-auto relative z-10">
                <div className={`text-center mb-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <h2 className="font-serif text-4xl md:text-5xl text-[#4b5c51] mb-6">Program & Mekan</h2>
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-16 h-px bg-[#e6d5d5]"></div>
                        <Heart className="w-5 h-5 text-[#d4a5a5]" strokeWidth={1.5} />
                        <div className="w-16 h-px bg-[#e6d5d5]"></div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {invitationData.events.map((event, index) => {
                        const Icon = getIcon(event.iconName);
                        return (
                            <div key={index} className={`group bg-white border border-[#f4ebeb] p-8 rounded-[3rem] text-center shadow-md shadow-[#e6d5d5]/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#e6d5d5]/40 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${index * 0.15}s` }}>
                                <div className="w-16 h-16 bg-[#fdfaf9] border border-[#f0e4e4] rounded-full flex items-center justify-center mx-auto mb-6 text-[#8c9c90] group-hover:scale-110 group-hover:text-[#d4a5a5] transition-all duration-500">
                                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                                </div>
                                <h3 className="font-serif text-xl text-[#4b5c51] mb-3 uppercase tracking-widest">{event.title}</h3>
                                <p className="text-[#d4a5a5] font-sans text-xs tracking-[0.2em] mb-4 uppercase">{event.time}</p>
                                <p className="text-[#7a8a7f] text-sm font-sans leading-relaxed px-2">{event.description}</p>
                            </div>
                        );
                    })}
                </div>

                <div className={`bg-white border border-[#f4ebeb] rounded-[3rem] overflow-hidden shadow-xl shadow-[#e6d5d5]/30 p-3 md:p-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
                    <div className="grid md:grid-cols-3 gap-0 border border-[#f4ebeb] rounded-[2rem] overflow-hidden">
                        
                        <div className="p-10 flex flex-col justify-center space-y-8 md:border-r border-[#f4ebeb] bg-[#fdfaf9]">
                            <div className="flex flex-col items-center text-center gap-4">
                                <div className="p-4 bg-white border border-[#f0e4e4] rounded-full text-[#d4a5a5]">
                                    <MapPin className="w-6 h-6" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className="font-serif text-2xl text-[#4b5c51] mb-4">Adres Bilgileri</h3>
                                    <p className="text-[#5c6e62] font-serif text-lg mb-2">{invitationData.venue.name}</p>
                                    <p className="text-[#8c9c90] font-sans text-[10px] tracking-widest mt-2 uppercase">{invitationData.venue.addressLine1}</p>
                                    <p className="text-[#8c9c90] font-sans text-[10px] tracking-widest mt-1 uppercase">{invitationData.venue.addressLine2}</p>
                                </div>
                            </div>
                            <div className="flex justify-center pt-4">
                                <a href={invitationData.venue.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-white border border-[#e6d5d5] text-[#7a8a7f] hover:bg-[#d4a5a5] hover:text-white hover:border-[#d4a5a5] transition-colors font-sans text-[10px] tracking-widest uppercase rounded-full shadow-sm">
                                    Yol Tarifi Al
                                </a>
                            </div>
                        </div>
                        
                        <div className="md:col-span-2 h-[400px] md:h-auto sepia-[0.1] contrast-95 hover:sepia-0 hover:contrast-100 transition-all duration-700">
                            <iframe src={invitationData.venue.googleMapsEmbed} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Mekan Konumu" className="w-full h-full"></iframe>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>
    );
}
