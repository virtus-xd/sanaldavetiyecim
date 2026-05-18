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
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#faf8f5] text-[#3d3229]">
      <div className="absolute inset-0 bg-[url('/themes/elegant/bg-mobile.webp')] md:bg-[url('/themes/elegant/bg-desktop.webp')] bg-cover bg-center bg-no-repeat pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#faf8f5]/30 to-[#faf8f5] pointer-events-none" />

      <div className="relative z-10 text-center px-6 md:px-16 animate-fade-in max-w-3xl w-[92%] mt-28 md:mt-36 mb-16 flex flex-col items-center">

        <div className="flex items-center gap-4 mb-8 animate-slide-up">
          <div className="w-12 h-[1px] bg-[#c9a96e]/40" />
          <span className="text-[#c9a96e] tracking-[0.5em] text-[10px] uppercase font-serif">
            {invitationData.topDecoration}
          </span>
          <div className="w-12 h-[1px] bg-[#c9a96e]/40" />
        </div>

        <h1 className="font-handwriting text-6xl md:text-8xl text-[#3d3229] animate-slide-up drop-shadow-sm mb-4">
          {invitationData.brideName}
        </h1>
        <div className="flex items-center gap-4 animate-slide-up delay-100 mb-4">
          <div className="w-16 h-[1px] bg-[#c9a96e]/50" />
          <span className="text-[#c9a96e] text-2xl font-serif italic">&amp;</span>
          <div className="w-16 h-[1px] bg-[#c9a96e]/50" />
        </div>
        <h1 className="font-handwriting text-6xl md:text-8xl text-[#3d3229] animate-slide-up delay-100 drop-shadow-sm mb-8">
          {invitationData.groomName}
        </h1>

        <p className="text-xl md:text-2xl text-[#6b5c4c] font-serif italic animate-slide-up delay-200 mb-8">
          {invitationData.eventType}
        </p>

        <div className="animate-slide-up delay-300 mb-10 border border-[#c9a96e]/30 rounded-2xl px-10 py-6 bg-white/40 backdrop-blur-sm">
          <p className="text-lg md:text-xl text-[#3d3229] font-serif tracking-[0.25em] uppercase mb-1">
            {invitationData.dateDisplay}
          </p>
          <p className="text-[10px] md:text-xs text-[#8a7b6b] font-sans tracking-[0.3em] uppercase">
            {invitationData.timeDisplay}
          </p>
        </div>

        <div className="flex justify-center gap-5 md:gap-10 animate-slide-up delay-400 w-full max-w-lg">
          {[
            { label: 'GÜN', value: timeLeft.days },
            { label: 'SAAT', value: timeLeft.hours },
            { label: 'DAKİKA', value: timeLeft.minutes },
            { label: 'SANİYE', value: timeLeft.seconds },
          ].map((item) => (
            <div key={item.label} className="text-center flex flex-col items-center flex-1">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-[#c9a96e]/40 flex items-center justify-center bg-white/50 backdrop-blur-sm shadow-sm transition-all duration-500 hover:border-[#c9a96e] hover:shadow-lg hover:shadow-[#c9a96e]/10 hover:-translate-y-1">
                <span className="text-2xl md:text-3xl font-serif text-[#3d3229]">{item.value}</span>
              </div>
              <div className="text-[8px] md:text-[9px] text-[#8a7b6b] mt-3 font-sans tracking-[0.25em] uppercase font-medium">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce opacity-40">
        <ChevronDown className="w-8 h-8 text-[#c9a96e]" strokeWidth={1} />
      </div>
    </section>
  );
}
