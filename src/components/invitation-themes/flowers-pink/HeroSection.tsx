'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useInvitationData } from '../InvitationContext';

export default function HeroSection() {
    const invitationData = useInvitationData();
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const weddingDate = new Date(invitationData.dateStr).getTime();
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = weddingDate - now;
            if (distance < 0) {
                clearInterval(timer);
                return;
            }
            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [invitationData.dateStr]);

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#fdfaf9] text-[#3a3f38]">
            <div className="absolute inset-0 bg-[url('/themes/flowers-pink/bg.webp')] bg-cover bg-center bg-no-repeat pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#fdfaf9] via-[#fdfaf9]/40 to-transparent pointer-events-none" />

            <div className="relative z-10 text-center px-6 md:px-12 animate-fade-in bg-white/70 backdrop-blur-md p-10 md:p-16 rounded-[4rem] border border-[#f0e4e4] shadow-[0_10px_40px_rgba(212,165,165,0.15)] max-w-3xl w-[92%] mt-32 md:mt-40 mb-12 flex flex-col items-center">
                
                <div className="text-[#8c9c90] tracking-[0.4em] text-xs uppercase animate-slide-up font-serif mt-2">
                    - {invitationData.topDecoration} -
                </div>

                <h1 className="font-handwriting text-6xl md:text-8xl text-[#4b5c51] animate-slide-up drop-shadow-sm mt-8 mb-6">
                    {invitationData.brideName} <span className="text-4xl md:text-6xl text-[#d4a5a5] px-2">&amp;</span> {invitationData.groomName}
                </h1>

                <div className="flex items-center justify-center w-full py-2 animate-slide-up delay-100">
                    <div className="h-[1px] w-24 bg-[#e6d5d5]"></div>
                </div>

                <p className="text-xl md:text-3xl text-[#7a8a7f] font-serif italic animate-slide-up delay-200 my-4">
                    {invitationData.eventType}
                </p>

                <div className="animate-slide-up delay-300 mt-6 mb-10 text-center">
                    <p className="text-lg md:text-xl text-[#4b5c51] font-serif tracking-[0.2em] uppercase mb-2">
                        {invitationData.dateDisplay}
                    </p>
                    <p className="text-[10px] md:text-xs text-[#8c9c90] font-sans tracking-[0.25em] uppercase">
                        {invitationData.timeDisplay}
                    </p>
                </div>

                <div className="flex justify-center gap-4 md:gap-8 animate-slide-up delay-400 pb-2 w-full max-w-md px-2">
                    {[{ label: 'GÜN', value: timeLeft.days }, { label: 'SAAT', value: timeLeft.hours }, { label: 'DAKİKA', value: timeLeft.minutes }, { label: 'SANİYE', value: timeLeft.seconds }].map((item) => (
                        <div key={item.label} className="text-center flex flex-col items-center flex-1">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-[#e6d5d5] flex items-center justify-center bg-[#fdfaf9] shadow-sm transition-transform hover:-translate-y-1 hover:border-[#d4a5a5] hover:shadow-lg hover:shadow-[#d4a5a5]/20">
                                <span className="text-xl md:text-2xl font-serif text-[#4b5c51]">{item.value}</span>
                            </div>
                            <div className="text-[8px] md:text-[9px] text-[#8c9c90] mt-3 font-sans tracking-[0.2em] uppercase font-medium">{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50">
                <ChevronDown className="w-8 h-8 text-[#8c9c90]" strokeWidth={1} />
            </div>
        </section>
    );
}
