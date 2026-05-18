'use client';

import { Globe, Mail } from 'lucide-react';
import { useInvitationData } from '../InvitationContext';
import FloralDivider from './FloralDivider';

export default function Footer() {
  const invitationData = useInvitationData();

  return (
    <>
      <FloralDivider imageName="divider-1.webp" height={140} />
      <footer className="py-24 px-6 bg-[#faf8f5] text-[#3d3229] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/themes/elegant/footer-bg.webp')] bg-cover bg-bottom bg-no-repeat opacity-15 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#faf8f5] via-transparent to-[#faf8f5]/80 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">

          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#c9a96e]/40" />
            <div className="w-2 h-2 rotate-45 border border-[#c9a96e]/40" />
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#c9a96e]/40" />
          </div>

          <h3 className="font-handwriting text-5xl md:text-7xl text-[#3d3229]">
            {invitationData.brideName}
            <span className="text-3xl md:text-4xl text-[#c9a96e] px-3 font-serif italic">&amp;</span>
            {invitationData.groomName}
          </h3>

          <p className="text-[#6b5c4c] font-serif italic text-lg md:text-xl tracking-wide max-w-xl mx-auto leading-relaxed">
            &quot;{invitationData.footer.message}&quot;
          </p>

          <div className="flex justify-center gap-8 pt-2">
            <a
              href={invitationData.footer.instagramUrl}
              className="text-[#8a7b6b] hover:text-[#c9a96e] hover:-translate-y-1 transition-all duration-300"
            >
              <Globe className="w-5 h-5" strokeWidth={1} />
            </a>
            <a
              href={invitationData.footer.emailUrl}
              className="text-[#8a7b6b] hover:text-[#c9a96e] hover:-translate-y-1 transition-all duration-300"
            >
              <Mail className="w-5 h-5" strokeWidth={1} />
            </a>
          </div>

          <div className="space-y-3 pt-2">
            <p className="text-[#3d3229] text-xs font-sans tracking-[0.35em] uppercase">
              {invitationData.footer.hashtag}
            </p>
            <div className="text-[#8a7b6b] text-[10px] font-sans tracking-widest uppercase">
              <a href={invitationData.footer.emailUrl} className="hover:text-[#c9a96e] transition-colors">
                {invitationData.footer.contactEmail}
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#c9a96e]/40" />
            <div className="w-2 h-2 rotate-45 border border-[#c9a96e]/40" />
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#c9a96e]/40" />
          </div>

          <p className="text-[#b8a898] text-[9px] font-sans pt-8 tracking-[0.25em] uppercase">
            {invitationData.footer.credits}
          </p>
        </div>
      </footer>
    </>
  );
}
