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
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-amber-500 border-[16px] border-double border-amber-600/30">
            {/* Geometric Art Deco Pattern (CSS generated) */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,#111_25%,transparent_25%,transparent_75%,#111_75%,#111),linear-gradient(45deg,#111_25%,transparent_25%,transparent_75%,#111_75%,#111)] bg-[length:40px_40px] opacity-10 pointer-events-none [background-position:0_0,20px_20px]" />
            <div className="absolute inset-0 border border-amber-500/20 m-4 pointer-events-none" />
            <div className="absolute inset-0 border border-amber-500/10 m-6 pointer-events-none" />

            <div className="relative z-10 text-center px-6 animate-fade-in space-y-12 bg-black/90 p-12 md:p-20 rounded-none border border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.1)] max-w-3xl">

                {/* Top Decoration */}
                <div className="flex items-center justify-center gap-4 animate-slide-up">
                    <div className="h-px w-16 bg-amber-500/50"></div>
                    <div className="text-amber-500 tracking-[0.6em] text-[10px] uppercase font-sans">
                        {invitationData.topDecoration}
                    </div>
                    <div className="h-px w-16 bg-amber-500/50"></div>
                </div>

                {/* Names */}
                <h1 className="font-serif text-6xl md:text-8xl text-amber-500 animate-slide-up leading-tight tracking-wider uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {invitationData.brideName} <br />
                    <span className="text-3xl md:text-5xl text-amber-700/80 mx-2">&</span> <br />
                    {invitationData.groomName}
                </h1>

                {/* Event Type */}
                <p className="text-xl md:text-2xl text-amber-200/80 font-light font-sans tracking-[0.4em] uppercase animate-slide-up delay-200">
                    {invitationData.eventType}
                </p>

                {/* Date */}
                <div className="animate-slide-up delay-300 border-y border-amber-600/40 py-6 my-6 inline-block w-full">
                    <p className="text-lg md:text-xl text-amber-400 font-sans font-light tracking-[0.4em] mb-2 uppercase">
                        {invitationData.dateDisplay}
                    </p>
                    <p className="text-[10px] text-amber-600/80 font-sans tracking-widest uppercase">
                        {invitationData.timeDisplay}
                    </p>
                </div>

                {/* Countdown - Gatsby Diamond Style */}
                <div className="flex justify-center gap-4 md:gap-8 mt-16 animate-slide-up delay-400">
                    {[
                        { label: 'GÜN', value: timeLeft.days },
                        { label: 'SAAT', value: timeLeft.hours },
                        { label: 'DAK', value: timeLeft.minutes },
                        { label: 'SAN', value: timeLeft.seconds },
                    ].map((item) => (
                        <div key={item.label} className="text-center flex flex-col items-center group">
                            <div className="w-16 h-16 md:w-20 md:h-20 rotate-45 border border-amber-600 flex items-center justify-center bg-black transition-all duration-300 group-hover:bg-amber-950/30">
                                <span className="text-2xl md:text-3xl font-serif text-amber-500 -rotate-45 drop-shadow">
                                    {item.value}
                                </span>
                            </div>
                            <div className="text-[9px] md:text-[10px] text-amber-600/70 mt-8 font-sans tracking-[0.3em] uppercase">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Scroll Indicator */}
            <div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce opacity-60"
            >
                <ChevronDown className="w-6 h-6 text-amber-600" strokeWidth={1} />
            </div>

        </section>
    );
}
