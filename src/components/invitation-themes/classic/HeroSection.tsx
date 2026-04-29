'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Sparkles from '../../invitation-shared/Sparkles';
import CornerDecorations from '../../invitation-shared/CornerDecorations';
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
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0f1a12] text-[#f7f5ef]">
            {/* Background Texture/Gradient */}
            <div
                className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-500/20 via-transparent to-transparent pointer-events-none"
            />

            <Sparkles />
            <CornerDecorations />

            {/* Ornamental Frame or Border */}
            <div className="absolute inset-4 border border-gold-500/20 rounded-[2rem] pointer-events-none z-20" />

            <div className="relative z-10 text-center px-6 animate-fade-in space-y-8">

                {/* Top Decoration */}
                <div className="text-gold-400/80 tracking-[0.3em] text-xs uppercase animate-slide-up font-sans">
                    {invitationData.topDecoration}
                </div>

                {/* Names */}
                <h1 className="font-handwriting text-7xl md:text-9xl text-gold-300 animate-slide-up drop-shadow-2xl">
                    {invitationData.brideName} <span className="text-4xl md:text-6xl text-white/50">&</span> {invitationData.groomName}
                </h1>

                {/* Divider */}
                <div className="flex items-center justify-center gap-4 py-2 animate-slide-up delay-100">
                    <div className="h-[1px] w-12 bg-gold-500/40"></div>
                    <div className="w-2 h-2 rotate-45 border border-gold-400"></div>
                    <div className="h-[1px] w-12 bg-gold-500/40"></div>
                </div>

                {/* Event Type */}
                <p className="text-2xl md:text-3xl text-gray-300 font-light font-serif italic animate-slide-up delay-200">
                    {invitationData.eventType}
                </p>

                {/* Date */}
                <div className="animate-slide-up delay-300">
                    <p className="text-xl md:text-2xl text-gold-400 font-serif tracking-widest uppercase mb-1">
                        {invitationData.dateDisplay}
                    </p>
                    <p className="text-sm text-gray-400 font-sans tracking-widest">
                        {invitationData.timeDisplay}
                    </p>
                </div>

                {/* Countdown - New Design */}
                <div className="flex justify-center gap-4 md:gap-8 mt-12 animate-slide-up delay-400">
                    {[
                        { label: 'GÜN', value: timeLeft.days },
                        { label: 'SAAT', value: timeLeft.hours },
                        { label: 'DAKİKA', value: timeLeft.minutes },
                        { label: 'SANİYE', value: timeLeft.seconds },
                    ].map((item) => (
                        <div key={item.label} className="text-center group flex flex-col items-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-gold-500/30 flex items-center justify-center bg-white/5 backdrop-blur-sm group-hover:border-gold-400 group-hover:bg-gold-500/10 transition-all duration-500 relative">
                                <span className="text-2xl md:text-3xl font-serif text-gold-100 group-hover:text-gold-300 transition-colors">
                                    {item.value}
                                </span>
                                {/* Decorative dots on ring */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[2px] w-1 h-1 bg-gold-500/50 rounded-full"></div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[2px] w-1 h-1 bg-gold-500/50 rounded-full"></div>
                            </div>
                            <div className="text-[9px] md:text-[10px] text-gold-500/70 mt-3 font-sans tracking-[0.2em] uppercase">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Venue Info */}
                <div className="pt-8 animate-slide-up delay-500 space-y-1">
                    <p className="text-lg text-gold-200 font-serif">
                        {invitationData.venue.name}
                    </p>
                    <p className="text-sm text-gray-500 font-sans tracking-wider uppercase">
                        {invitationData.venue.city}
                    </p>
                </div>

            </div>

            {/* Scroll Indicator */}
            <div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50"
            >
                <ChevronDown className="w-6 h-6 text-gold-300" />
            </div>

        </section>
    );
}
