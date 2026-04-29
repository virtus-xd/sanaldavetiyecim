'use client';

import { Globe, Mail } from 'lucide-react';
import { useInvitationData } from '../InvitationContext';

export default function Footer() {
  const invitationData = useInvitationData();
    return (
        <footer className="py-20 px-6 bg-[#3A5A40] text-[#EED9C4] relative">
            <div className="absolute inset-0 bg-[#000000] opacity-10 pointer-events-none mix-blend-overlay" />

            <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10 p-12 border border-[#EED9C4]/20 rounded-t-[4rem]">

                {/* Names */}
                <h3 className="font-serif text-3xl md:text-5xl text-white font-light tracking-wide">
                    {invitationData.brideName} <span className="text-[#A8C3A6] text-3xl px-2">&amp;</span> {invitationData.groomName}
                </h3>

                {/* Message */}
                <p className="text-[#A8C3A6] font-serif italic text-xl tracking-wide">
                    {invitationData.footer.message}
                </p>

                {/* Vintage flourish */}
                <div className="flex justify-center items-center py-2 opacity-50">
                    <span className="text-[#EED9C4]">❦</span>
                    <div className="w-24 h-px bg-[#EED9C4] mx-4"></div>
                    <span className="text-[#EED9C4]">❦</span>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-8">
                    <a
                        href={invitationData.footer.instagramUrl}
                        className="text-[#EED9C4] hover:text-white hover:scale-110 transition-transform duration-300"
                        aria-label="Globe"
                    >
                        <Globe className="w-6 h-6" strokeWidth={1.5} />
                    </a>

                    <a
                        href={invitationData.footer.emailUrl}
                        className="text-[#EED9C4] hover:text-white hover:scale-110 transition-transform duration-300"
                        aria-label="Email"
                    >
                        <Mail className="w-6 h-6" strokeWidth={1.5} />
                    </a>
                </div>

                {/* Hashtag & Contact */}
                <div className="space-y-4">
                    <p className="text-[#A8C3A6] text-sm font-sans tracking-[0.4em] font-medium uppercase">
                        {invitationData.footer.hashtag}
                    </p>
                    <div className="text-[#EED9C4]/60 text-xs font-sans">
                        <a
                            href={invitationData.footer.emailUrl}
                            className="hover:text-white transition-colors"
                        >
                            {invitationData.footer.contactEmail}
                        </a>
                    </div>
                </div>

                {/* Credits */}
                <p className="text-[#A8C3A6]/40 text-[10px] font-sans pt-8 uppercase tracking-widest">
                    {invitationData.footer.credits}
                </p>

            </div>
        </footer>
    );
}
