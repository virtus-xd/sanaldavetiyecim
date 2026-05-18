'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useInvitationData } from '../InvitationContext';

export default function HeroSection() {
  const invitationData = useInvitationData();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

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
    }, []);

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#F4F1E1] text-[#5D534A]">
            {/* Vintage Paper Background */}
            <div
                className="absolute inset-0 bg-[url('/themes/vintage/bg.webp')] bg-cover bg-center bg-no-repeat opacity-40 pointer-events-none mix-blend-multiply flex items-center justify-center"
            >
            </div>
            {/* Subtle vintage vignette overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.1)_100%)] pointer-events-none" />

            <div className="relative z-10 text-center px-6 animate-fade-in space-y-10 bg-white/40 backdrop-blur-sm p-12 md:p-16 rounded-[4rem] border-2 border-double border-[#A8C3A6]/40 shadow-xl max-w-4xl">

                {/* Top Decoration */}
                <div className="text-[#8B9D77] tracking-[0.4em] text-xs uppercase animate-slide-up font-serif opacity-80">
                    ❦ {invitationData.topDecoration} ❦
                </div>

                {/* Names */}
                <h1 className="font-handwriting text-6xl md:text-8xl text-[#4A5D23] animate-slide-up leading-tight opacity-90">
                    {invitationData.brideName} <span className="text-4xl md:text-6xl text-[#A8C3A6] mx-2 font-serif">&amp;</span> {invitationData.groomName}
                </h1>

                {/* Event Type */}
                <div className="flex flex-col items-center justify-center gap-4 py-2 animate-slide-up delay-100">
                    <p className="text-xl md:text-2xl text-[#6B705C] font-serif tracking-[0.3em] uppercase opacity-90">
                        {invitationData.eventType}
                    </p>
                    <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#8B9D77] to-transparent"></div>
                </div>

                {/* Date */}
                <div className="animate-slide-up delay-300">
                    <p className="text-lg md:text-xl text-[#3A5A40] font-serif tracking-widest uppercase mb-1">
                        {invitationData.dateDisplay}
                    </p>
                    <p className="text-[10px] text-[#A3B18A] font-sans tracking-[0.3em] uppercase font-semibold">
                        {invitationData.timeDisplay}
                    </p>
                </div>

                {/* Countdown - Postcard Stamp Style */}
                <div className="flex justify-center gap-6 md:gap-10 mt-12 animate-slide-up delay-400">
                    {[
                        { label: 'GÜN', value: timeLeft.days },
                        { label: 'SAAT', value: timeLeft.hours },
                        { label: 'DAK', value: timeLeft.minutes },
                        { label: 'SAN', value: timeLeft.seconds },
                    ].map((item) => (
                        <div key={item.label} className="text-center flex flex-col items-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 border border-dashed border-[#A8C3A6] flex items-center justify-center bg-[#F4F1E1]/80 hover:bg-white transition-all duration-300 shadow-[2px_2px_5px_rgba(0,0,0,0.05)]">
                                <span className="text-2xl md:text-3xl font-serif text-[#4A5D23] opacity-80">
                                    {item.value}
                                </span>
                            </div>
                            <div className="text-[9px] md:text-[10px] text-[#6B705C] mt-4 font-sans tracking-[0.2em] uppercase font-medium border-b border-[#A8C3A6]/30 pb-1">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Scroll Indicator */}
            <div
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50"
            >
                <ChevronDown className="w-8 h-8 text-[#A8C3A6]" strokeWidth={1.5} />
            </div>

        </section>
    );
}
