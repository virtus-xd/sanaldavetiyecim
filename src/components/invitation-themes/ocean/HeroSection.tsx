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
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-sky-50 text-slate-800">
            {/* Ocean Watercolor Background */}
            <div
                className="absolute inset-0 bg-[url('/invitation-assets/ocean-bg.png')] bg-cover bg-center bg-no-repeat opacity-50 pointer-events-none"
            />
            {/* Soft gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-sky-100/90 via-sky-50/40 to-sky-100/90 pointer-events-none" />

            <div className="relative z-10 text-center px-6 animate-fade-in space-y-8 bg-white/50 backdrop-blur-md p-10 md:p-14 rounded-3xl border border-white/60 shadow-2xl max-w-4xl">

                {/* Top Decoration */}
                <div className="text-teal-600 tracking-[0.4em] text-xs uppercase animate-slide-up font-sans">
                    {invitationData.topDecoration}
                </div>

                {/* Names */}
                <h1 className="font-handwriting text-7xl md:text-9xl text-cyan-900 animate-slide-up drop-shadow-sm">
                    {invitationData.brideName} <span className="text-4xl md:text-6xl text-teal-400">&</span> {invitationData.groomName}
                </h1>

                {/* Divider Line */}
                <div className="flex items-center justify-center gap-4 py-2 animate-slide-up delay-100">
                    <div className="h-[1px] w-12 bg-teal-300"></div>
                    <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                    <div className="h-[1px] w-12 bg-teal-300"></div>
                </div>

                {/* Event Type */}
                <p className="text-2xl md:text-3xl text-slate-600 font-light font-serif italic animate-slide-up delay-200">
                    {invitationData.eventType}
                </p>

                {/* Date */}
                <div className="animate-slide-up delay-300">
                    <p className="text-xl md:text-2xl text-cyan-800 font-serif tracking-widest uppercase mb-1">
                        {invitationData.dateDisplay}
                    </p>
                    <p className="text-sm text-slate-500 font-sans tracking-widest">
                        {invitationData.timeDisplay}
                    </p>
                </div>

                {/* Countdown - Soft Ocean Box Design */}
                <div className="flex justify-center gap-4 md:gap-8 mt-12 animate-slide-up delay-400 pb-2">
                    {[
                        { label: 'GÜN', value: timeLeft.days },
                        { label: 'SAAT', value: timeLeft.hours },
                        { label: 'DAKİKA', value: timeLeft.minutes },
                        { label: 'SANİYE', value: timeLeft.seconds },
                    ].map((item) => (
                        <div key={item.label} className="text-center flex flex-col items-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-teal-200 shadow-inner flex items-center justify-center bg-white/60 backdrop-blur-sm transition-all duration-500 hover:bg-white hover:shadow-md hover:border-teal-300">
                                <span className="text-2xl md:text-3xl font-serif text-cyan-700">
                                    {item.value}
                                </span>
                            </div>
                            <div className="text-[9px] md:text-[10px] text-teal-600/70 mt-3 font-sans tracking-[0.2em] uppercase font-medium">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Scroll Indicator */}
            <div
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce opacity-60"
            >
                <ChevronDown className="w-8 h-8 text-teal-600" strokeWidth={1.5} />
            </div>

        </section>
    );
}
