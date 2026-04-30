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
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-orange-50 text-stone-900">
            {/* Autumn Watercolor Background */}
            <div
                className="absolute inset-0 bg-[url('/themes/autumn/bg.png')] bg-cover bg-center bg-no-repeat opacity-50 pointer-events-none mix-blend-multiply"
            />
            {/* Warm gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-orange-100/80 via-transparent to-orange-50/60 pointer-events-none" />

            <div className="relative z-10 text-center px-6 animate-fade-in space-y-10 bg-white/70 backdrop-blur-md p-10 md:p-14 rounded-full border-4 border-double border-amber-900/20 shadow-xl max-w-4xl">

                {/* Top Decoration */}
                <div className="text-amber-800 tracking-[0.4em] text-xs uppercase animate-slide-up font-serif font-semibold">
                    {invitationData.topDecoration}
                </div>

                {/* Names */}
                <h1 className="font-handwriting text-7xl md:text-9xl text-rose-950 animate-slide-up drop-shadow-sm leading-tight">
                    {invitationData.brideName} <span className="text-5xl md:text-7xl text-amber-600 font-serif px-2">&amp;</span> {invitationData.groomName}
                </h1>

                {/* Divider Line */}
                <div className="flex items-center justify-center gap-2 py-2 animate-slide-up delay-100">
                    <div className="h-[1px] w-8 bg-amber-700"></div>
                    <div className="w-2 h-2 rounded-full border border-amber-800"></div>
                    <div className="h-[1px] w-8 bg-amber-700"></div>
                </div>

                {/* Event Type */}
                <p className="text-2xl md:text-3xl text-stone-700 font-light font-serif italic animate-slide-up delay-200">
                    {invitationData.eventType}
                </p>

                {/* Date */}
                <div className="animate-slide-up delay-300">
                    <p className="text-xl md:text-2xl text-rose-950 font-serif tracking-widest uppercase mb-1">
                        {invitationData.dateDisplay}
                    </p>
                    <p className="text-xs text-stone-600 font-sans tracking-widest uppercase">
                        {invitationData.timeDisplay}
                    </p>
                </div>

                {/* Countdown - Warm Autumn Style */}
                <div className="flex justify-center gap-4 md:gap-8 mt-12 animate-slide-up delay-400 pb-8">
                    {[
                        { label: 'GÜN', value: timeLeft.days },
                        { label: 'SAAT', value: timeLeft.hours },
                        { label: 'DAKİKA', value: timeLeft.minutes },
                        { label: 'SANİYE', value: timeLeft.seconds },
                    ].map((item) => (
                        <div key={item.label} className="text-center flex flex-col items-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-md rotate-45 border border-amber-800/30 shadow-inner flex items-center justify-center bg-orange-50/80 transition-all duration-500 hover:bg-rose-50 hover:border-amber-600">
                                <span className="text-2xl md:text-3xl font-serif text-rose-900 -rotate-45">
                                    {item.value}
                                </span>
                            </div>
                            <div className="text-[10px] text-amber-800 mt-6 font-sans tracking-[0.2em] font-semibold uppercase">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Scroll Indicator */}
            <div
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce opacity-80"
            >
                <ChevronDown className="w-8 h-8 text-rose-950" strokeWidth={2} />
            </div>

        </section>
    );
}
