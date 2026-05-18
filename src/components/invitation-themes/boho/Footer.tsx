'use client';

import { Globe, Mail } from 'lucide-react';
import { useInvitationData } from '../InvitationContext';

export default function Footer() {
  const invitationData = useInvitationData();

  return (
    <footer className="py-24 px-6 bg-[#e8e1d5] text-[#5c4a3d] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/themes/boho/bg.webp')] bg-cover bg-center bg-no-repeat opacity-40 pointer-events-none mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#e8e1d5]/90 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10 bg-[#f9f6f0]/80 backdrop-blur-md p-12 rounded-t-[10rem] rounded-b-md border border-[#f0ebd8]">
        <h3 className="font-handwriting text-5xl md:text-6xl text-[#4a3b32]">
          {invitationData.brideName} <span className="text-3xl text-[#b5a397] px-2">&amp;</span> {invitationData.groomName}
        </h3>

        <p className="text-[#6b5b4e] font-serif italic text-lg md:text-xl tracking-wide max-w-2xl mx-auto">
          &quot;{invitationData.footer.message}&quot;
        </p>

        <div className="flex justify-center items-center py-2 opacity-60">
          <div className="w-16 h-[1px] bg-[#d5cabb]" />
        </div>

        <div className="flex justify-center gap-8">
          <a href={invitationData.footer.instagramUrl} className="text-[#8c7b6d] hover:text-[#4a3b32] hover:-translate-y-1 transition-transform duration-300">
            <Globe className="w-6 h-6" strokeWidth={1} />
          </a>
          <a href={invitationData.footer.emailUrl} className="text-[#8c7b6d] hover:text-[#4a3b32] hover:-translate-y-1 transition-transform duration-300">
            <Mail className="w-6 h-6" strokeWidth={1} />
          </a>
        </div>

        <div className="space-y-4 pt-4">
          <p className="text-[#4a3b32] text-xs font-sans tracking-[0.3em] uppercase">
            {invitationData.footer.hashtag}
          </p>
          <div className="text-[#8c7b6d] text-[10px] font-sans tracking-widest uppercase">
            <a href={invitationData.footer.emailUrl} className="hover:text-[#4a3b32] transition-colors">
              {invitationData.footer.contactEmail}
            </a>
          </div>
        </div>

        <p className="text-[#a09489] text-[9px] font-sans pt-12 tracking-[0.2em] uppercase">
          {invitationData.footer.credits}
        </p>
      </div>
    </footer>
  );
}
