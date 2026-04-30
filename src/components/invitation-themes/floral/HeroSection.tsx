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
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-rose-50 text-stone-800">
            {/* Soft Floral Background */}
            <div
                className="absolute inset-0 bg-[url('/themes/floral/bg.png')] bg-cover bg-center bg-no-repeat opacity-40 pointer-events-none"
            />
            {/* White Soft Gradient Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-rose-50/80 via-transparent to-rose-50/80 pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 text-center px-6 animate-fade-in space-y-8 bg-white/40 backdrop-blur-md p-10 md:p-16 rounded-[3rem] border border-rose-100 shadow-xl max-w-4xl">

                {/* Top Decoration */}
                <div className="text-rose-400 tracking-[0.3em] text-sm uppercase animate-slide-up font-sans">
                    {invitationData.topDecoration}
                </div>

                {/* Names */}
                <h1 className="font-handwriting text-7xl md:text-9xl text-rose-800 animate-slide-up drop-shadow-sm">
                    {invitationData.brideName} <span className="text-4xl md:text-6xl text-rose-300">&</span> {invitationData.groomName}
                </h1>

                {/* Divider Line */}
                <div className="flex items-center justify-center gap-4 py-2 animate-slide-up delay-100">
                    <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
                </div>

                {/* Event Type */}
                <p className="text-2xl md:text-3xl text-stone-600 font-light font-serif italic animate-slide-up delay-200">
                    {invitationData.eventType}
                </p>

                {/* Date */}
                <div className="animate-slide-up delay-300">
                    <p className="text-xl md:text-2xl text-rose-700 font-serif tracking-widest uppercase mb-1">
                        {invitationData.dateDisplay}
                    </p>
                    <p className="text-sm text-stone-500 font-sans tracking-widest">
                        {invitationData.timeDisplay}
                    </p>
                </div>

                {/* Countdown - Soft Floral Box Design */}
                <div className="flex justify-center gap-4 md:gap-8 mt-12 animate-slide-up delay-400 pb-4">
                    {[
                        { label: 'GÜN', value: timeLeft.days },
                        { label: 'SAAT', value: timeLeft.hours },
                        { label: 'DAKİKA', value: timeLeft.minutes },
                        { label: 'SANİYE', value: timeLeft.seconds },
                    ].map((item) => (
                        <div key={item.label} className="text-center flex flex-col items-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-rose-200 shadow-sm flex items-center justify-center bg-white/80 transition-all duration-500 hover:-translate-y-1 hover:shadow-md hover:border-rose-300 relative">
                                <span className="text-2xl md:text-3xl font-serif text-rose-600">
                                    {item.value}
                                </span>
                            </div>
                            <div className="text-[9px] md:text-[10px] text-stone-400 mt-3 font-sans tracking-[0.2em] uppercase">
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
                <ChevronDown className="w-6 h-6 text-rose-400" />
            </div>

        </section>
    );
}
