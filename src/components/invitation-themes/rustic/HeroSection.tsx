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
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#FAF6F0] text-[#4A3B32]">
            
            {/* Rustic Background Image */}
            <div
                className="absolute inset-0 bg-[url('/invitation-assets/rustic-bg.png')] bg-cover bg-center bg-no-repeat opacity-60 pointer-events-none"
            />
            {/* Warm overlay */}
            <div className="absolute inset-0 bg-[#E8DCCB]/30 pointer-events-none mix-blend-multiply" />

            <div className="relative z-10 text-center px-6 animate-fade-in space-y-10 bg-[#FAF6F0]/80 backdrop-blur-sm p-12 md:p-20 rounded-t-full rounded-b-xl border border-[#D4C3B3] shadow-2xl max-w-3xl">

                {/* Top Decoration */}
                <div className="text-[#8B7355] tracking-[0.4em] text-xs uppercase animate-slide-up font-serif">
                    ~ {invitationData.topDecoration} ~
                </div>

                {/* Names */}
                <h1 className="font-handwriting text-7xl md:text-9xl text-[#5C4033] animate-slide-up drop-shadow-sm">
                    {invitationData.brideName} <span className="text-4xl md:text-6xl text-[#A68A64] font-serif">&amp;</span> {invitationData.groomName}
                </h1>

                {/* Divider Line */}
                <div className="flex items-center justify-center gap-4 py-2 animate-slide-up delay-100">
                    <div className="h-px w-24 bg-[#D4C3B3]"></div>
                </div>

                {/* Event Type */}
                <p className="text-2xl md:text-3xl text-[#8B7355] font-light font-serif italic animate-slide-up delay-200">
                    {invitationData.eventType}
                </p>

                {/* Date */}
                <div className="animate-slide-up delay-300">
                    <p className="text-xl md:text-2xl text-[#5C4033] font-serif tracking-widest uppercase mb-1">
                        {invitationData.dateDisplay}
                    </p>
                    <p className="text-xs text-[#8B7355] font-sans tracking-widest uppercase">
                        {invitationData.timeDisplay}
                    </p>
                </div>

                {/* Countdown - Warm Paper Design */}
                <div className="flex justify-center gap-4 md:gap-8 mt-12 animate-slide-up delay-400">
                    {[
                        { label: 'GÜN', value: timeLeft.days },
                        { label: 'SAAT', value: timeLeft.hours },
                        { label: 'DAKİKA', value: timeLeft.minutes },
                        { label: 'SANİYE', value: timeLeft.seconds },
                    ].map((item) => (
                        <div key={item.label} className="text-center flex flex-col items-center">
                            <div className="w-16 h-20 md:w-20 md:h-24 border-t-2 border-b-2 border-[#D4C3B3] flex items-center justify-center bg-[#FAF6F0]/90 transition-all duration-500 hover:bg-white relative">
                                <span className="text-3xl md:text-4xl font-serif text-[#5C4033]">
                                    {item.value}
                                </span>
                            </div>
                            <div className="text-[10px] text-[#A68A64] mt-3 font-sans tracking-[0.2em] uppercase font-semibold">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Scroll Indicator */}
            <div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce opacity-70"
            >
                <ChevronDown className="w-8 h-8 text-[#5C4033]" strokeWidth={1.5} />
            </div>

        </section>
    );
}
