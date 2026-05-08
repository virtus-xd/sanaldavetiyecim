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
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#f4f6f3] text-[#3a3f38]">
      <div className="absolute inset-0 bg-[url('/themes/sage/bg.png')] bg-cover bg-center bg-no-repeat opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#e9eee7]/80 via-transparent to-[#e9eee7]/80 pointer-events-none" />

      <div className="relative z-10 text-center px-6 animate-fade-in space-y-8 bg-white/60 backdrop-blur-md p-10 md:p-16 rounded-[3rem] border border-[#dce3d8] shadow-xl max-w-4xl">

        <div className="text-[#6b7b67] tracking-[0.3em] text-sm uppercase animate-slide-up font-sans">
          {invitationData.topDecoration}
        </div>

        <h1 className="font-handwriting text-7xl md:text-9xl text-[#2c352b] animate-slide-up drop-shadow-sm">
          {invitationData.brideName} <span className="text-4xl md:text-6xl text-[#6b7b67]">ve</span> {invitationData.groomName}
        </h1>

        <div className="flex items-center justify-center gap-4 py-2 animate-slide-up delay-100">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#8a9a86] to-transparent" />
        </div>

        <p className="text-xl md:text-2xl text-[#4c5c48] font-light font-serif animate-slide-up delay-200">
          {invitationData.eventType}
        </p>

        <div className="animate-slide-up delay-300">
          <p className="text-xl md:text-2xl text-[#2c352b] font-serif tracking-widest uppercase mb-1">
            {invitationData.dateDisplay.replace(/ /g, '.')}
          </p>
          <p className="text-sm text-[#5c6b58] font-sans tracking-widest">
            {invitationData.timeDisplay}
          </p>
        </div>

        <div className="flex justify-center gap-4 md:gap-8 mt-12 animate-slide-up delay-400 pb-4">
          {[
            { label: 'GÜN', value: timeLeft.days },
            { label: 'SAAT', value: timeLeft.hours },
            { label: 'DAKİKA', value: timeLeft.minutes },
            { label: 'SANİYE', value: timeLeft.seconds },
          ].map((item) => (
            <div key={item.label} className="text-center flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-[#c1cdc0] shadow-sm flex items-center justify-center bg-white/80 transition-all duration-500 hover:-translate-y-1 hover:shadow-md hover:border-[#8a9a86]">
                <span className="text-2xl md:text-3xl font-serif text-[#4c5c48]">{item.value}</span>
              </div>
              <div className="text-[9px] md:text-[10px] text-[#6b7b67] mt-3 font-sans tracking-[0.2em] uppercase">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50">
        <ChevronDown className="w-6 h-6 text-[#6b7b67]" />
      </div>
    </section>
  );
}
