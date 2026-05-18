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
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950 text-slate-100">
            {/* Starry Sky Background */}
            <div
                className="absolute inset-0 bg-[url('/themes/starry/bg.webp')] bg-cover bg-center bg-no-repeat opacity-60 pointer-events-none mix-blend-screen"
            />
            {/* Soft gradient overlay for dark atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/80 pointer-events-none" />

            <div className="relative z-10 text-center px-6 animate-fade-in space-y-12 bg-slate-900/40 backdrop-blur-xl p-10 md:p-14 rounded-[40px] border border-slate-700/50 shadow-2xl shadow-indigo-500/10 max-w-4xl">

                {/* Top Decoration */}
                <div className="text-slate-400 tracking-[0.5em] text-xs uppercase animate-slide-up font-sans font-light">
                    {invitationData.topDecoration}
                </div>

                {/* Names */}
                <h1 className="font-serif text-6xl md:text-8xl text-white animate-slide-up drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] font-light">
                    {invitationData.brideName} <span className="text-3xl md:text-5xl text-indigo-300 mx-2 italic">&amp;</span> {invitationData.groomName}
                </h1>

                {/* Divider Line */}
                <div className="flex items-center justify-center gap-4 py-2 animate-slide-up delay-100">
                    <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-slate-500 to-transparent"></div>
                    <div className="w-1.5 h-1.5 bg-slate-300 rotate-45"></div>
                    <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-slate-500 to-transparent"></div>
                </div>

                {/* Event Type */}
                <p className="text-2xl md:text-3xl text-slate-300 font-light font-handwriting animate-slide-up delay-200 tracking-wide">
                    {invitationData.eventType}
                </p>

                {/* Date */}
                <div className="animate-slide-up delay-300">
                    <p className="text-xl md:text-2xl text-white font-sans font-light tracking-[0.2em] mb-2 uppercase">
                        {invitationData.dateDisplay}
                    </p>
                    <p className="text-xs text-slate-400 font-sans tracking-widest">
                        {invitationData.timeDisplay}
                    </p>
                </div>

                {/* Countdown - Minimal Silver Design */}
                <div className="flex justify-center gap-6 md:gap-10 mt-12 animate-slide-up delay-400 border-t border-slate-800 pt-10">
                    {[
                        { label: 'GÜN', value: timeLeft.days },
                        { label: 'SAAT', value: timeLeft.hours },
                        { label: 'DAKKA', value: timeLeft.minutes },
                        { label: 'SANİYE', value: timeLeft.seconds },
                    ].map((item) => (
                        <div key={item.label} className="text-center flex flex-col items-center">
                            <span className="text-3xl md:text-4xl font-serif text-white font-light drop-shadow-[0_0_8px_rgba(199,210,254,0.3)] mb-2">
                                {item.value}
                            </span>
                            <div className="text-[9px] md:text-[10px] text-slate-500 font-sans tracking-[0.3em] uppercase">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Scroll Indicator */}
            <div
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce opacity-40"
            >
                <ChevronDown className="w-8 h-8 text-slate-300" strokeWidth={1} />
            </div>

        </section>
    );
}
