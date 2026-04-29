'use client';

import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
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
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white text-black font-sans">
            
            {/* Minimalist Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_10%,transparent_100%)] opacity-20 pointer-events-none" />

            <div className="relative z-10 w-full px-6 flex flex-col items-center">
                
                {/* Event Type (Top) */}
                <div className="mb-16 md:mb-24 overflow-hidden">
                    <p className="text-xs tracking-[0.4em] uppercase font-semibold text-neutral-400 animate-slide-up delay-100">
                        {invitationData.eventType}
                    </p>
                </div>

                {/* Names - Very Large, Bold Sans */}
                <div className="text-center space-y-2 md:space-y-4 mb-16 overflow-hidden">
                    <h1 className="text-7xl md:text-[12rem] font-bold tracking-tighter leading-none animate-slide-up">
                        {invitationData.brideName}
                    </h1>
                    <div className="flex items-center justify-center gap-6 animate-slide-up delay-100">
                        <div className="h-px w-12 bg-neutral-200"></div>
                        <span className="text-3xl md:text-6xl text-neutral-300 font-light">&</span>
                        <div className="h-px w-12 bg-neutral-200"></div>
                    </div>
                    <h1 className="text-7xl md:text-[12rem] font-bold tracking-tighter leading-none animate-slide-up delay-200">
                        {invitationData.groomName}
                    </h1>
                </div>

                {/* Date and Location - Minimal layout */}
                <div className="grid grid-cols-2 gap-12 text-center md:text-left animate-fade-in-up delay-300 mt-8 mb-16">
                    <div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-2">Tarih</p>
                        <p className="text-lg md:text-xl font-medium">{invitationData.dateDisplay}</p>
                    </div>
                    <div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-2">Mekan</p>
                        <p className="text-lg md:text-xl font-medium">{invitationData.venue.name}</p>
                    </div>
                </div>

                {/* Countdown - Modern Pill style */}
                <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up delay-500">
                    {[
                        { label: 'GÜN', value: timeLeft.days },
                        { label: 'SAAT', value: timeLeft.hours },
                        { label: 'DAKİKA', value: timeLeft.minutes },
                        { label: 'SANİYE', value: timeLeft.seconds },
                    ].map((item) => (
                        <div key={item.label} className="flex items-center gap-3 border border-neutral-200 rounded-full px-5 py-2 hover:bg-neutral-50 transition-colors">
                            <span className="text-2xl font-bold tracking-tighter">{item.value}</span>
                            <span className="text-[10px] tracking-[0.1em] text-neutral-400">{item.label}</span>
                        </div>
                    ))}
                </div>

            </div>

            {/* Scroll Indicator - Bottom Left */}
            <div className="absolute bottom-8 left-8 animate-bounce opacity-40 hidden md:block">
                <ArrowDown className="w-6 h-6" strokeWidth={1} />
            </div>

            {/* Top Decoration mapped as a side text element */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-left hidden md:block">
                <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 whitespace-nowrap">
                    {invitationData.topDecoration}
                </p>
            </div>
        </section>
    );
}
