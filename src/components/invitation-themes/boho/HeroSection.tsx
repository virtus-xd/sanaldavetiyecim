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
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#e8e1d5] text-[#5c4a3d]">
      <div className="absolute inset-0 bg-[url('/themes/boho/bg.webp')] bg-cover bg-center bg-no-repeat opacity-70 pointer-events-none mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#e8e1d5]/90 via-transparent to-[#e8e1d5]/40 pointer-events-none" />

      <div className="relative z-10 text-center px-4 md:px-12 animate-fade-in bg-[#f9f6f0] pt-20 pb-16 md:pt-24 md:pb-20 rounded-t-[20rem] rounded-b-sm shadow-2xl max-w-xl w-[92%] mx-4 my-16 flex flex-col items-center border border-[#f0ebd8]">

        <div className="text-[#8c7b6d] tracking-[0.35em] text-xs uppercase animate-slide-up font-serif mt-2">
          - {invitationData.topDecoration} -
        </div>

        <h1 className="font-handwriting text-6xl md:text-8xl text-[#4a3b32] animate-slide-up mt-8 mb-4">
          {invitationData.brideName} <span className="text-4xl md:text-6xl text-[#b5a397] px-1">&amp;</span> {invitationData.groomName}
        </h1>

        <div className="flex items-center justify-center w-full py-4 animate-slide-up delay-100">
          <div className="h-[1px] w-16 bg-[#d5cabb]" />
        </div>

        <p className="text-2xl md:text-3xl text-[#6b5b4e] font-serif italic animate-slide-up delay-200 my-4">
          {invitationData.eventType}
        </p>

        <div className="animate-slide-up delay-300 mt-6 mb-10 text-center">
          <p className="text-lg md:text-xl text-[#5c4a3d] font-serif tracking-[0.2em] uppercase mb-2">
            {invitationData.dateDisplay}
          </p>
          <p className="text-[10px] md:text-xs text-[#8c7b6d] font-sans tracking-[0.25em] uppercase">
            {invitationData.timeDisplay}
          </p>
        </div>

        <div className="flex justify-center gap-4 md:gap-6 animate-slide-up delay-400 pb-2 w-full max-w-sm px-4 mt-4">
          {[
            { label: 'GÜN', value: timeLeft.days },
            { label: 'SAAT', value: timeLeft.hours },
            { label: 'DAKİKA', value: timeLeft.minutes },
            { label: 'SANİYE', value: timeLeft.seconds },
          ].map((item) => (
            <div key={item.label} className="text-center flex flex-col items-center flex-1">
              <div className="w-full h-16 md:h-20 border-y border-[#d5cabb] flex items-center justify-center bg-[#fdfdfb] shadow-[0_2px_10px_rgba(0,0,0,0.01)] transition-transform hover:-translate-y-1">
                <span className="text-2xl md:text-3xl font-serif text-[#4a3b32]">{item.value}</span>
              </div>
              <div className="text-[9px] md:text-[10px] text-[#8c7b6d] mt-3 font-sans tracking-[0.2em] uppercase font-medium">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce opacity-40">
        <ChevronDown className="w-8 h-8 text-[#5c4a3d]" strokeWidth={1} />
      </div>
    </section>
  );
}
