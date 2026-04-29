'use client';

import { Globe, Mail } from 'lucide-react';
import { useInvitationData } from '../InvitationContext';

export default function Footer() {
  const invitationData = useInvitationData();
    return (
        <footer className="py-24 px-6 bg-black text-amber-100/50 border-t border-amber-800/40 relative">

            <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10 border border-amber-900/30 p-12">

                {/* Vertical Line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-[1px] h-12 bg-amber-700/50"></div>

                {/* Names */}
                <h3 className="font-serif text-3xl md:text-5xl text-amber-500 uppercase tracking-widest leading-loose">
                    {invitationData.brideName} <span className="text-amber-800 text-2xl px-4">&amp;</span> {invitationData.groomName}
                </h3>

                {/* Message */}
                <p className="text-amber-200/60 font-sans tracking-[0.4em] text-sm uppercase">
                    {invitationData.footer.message}
                </p>

                {/* Art Deco element */}
                <div className="flex justify-center items-center py-6">
                    <div className="w-6 h-px bg-amber-600/50"></div>
                    <div className="w-2 h-2 border border-amber-500 mx-2 rotate-45"></div>
                    <div className="w-2 h-2 bg-amber-500 mx-2 rotate-45"></div>
                    <div className="w-2 h-2 border border-amber-500 mx-2 rotate-45"></div>
                    <div className="w-6 h-px bg-amber-600/50"></div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-10">
                    <a
                        href={invitationData.footer.instagramUrl}
                        className="text-amber-600 hover:text-amber-300 hover:scale-110 transition-all duration-300 group"
                        aria-label="Globe"
                    >
                        <Globe className="w-6 h-6" strokeWidth={1} />
                    </a>

                    <a
                        href={invitationData.footer.emailUrl}
                        className="text-amber-600 hover:text-amber-300 hover:scale-110 transition-all duration-300 group"
                        aria-label="Email"
                    >
                        <Mail className="w-6 h-6" strokeWidth={1} />
                    </a>
                </div>

                {/* Hashtag */}
                <div className="pt-8">
                    <p className="text-amber-500 font-sans tracking-[0.6em] text-xs uppercase border border-amber-800/50 inline-block px-8 py-3 bg-[#0a0a0a]">
                        {invitationData.footer.hashtag}
                    </p>
                </div>

                {/* Credits */}
                <p className="text-amber-900/50 text-[9px] font-sans pt-12 tracking-widest uppercase">
                    {invitationData.footer.credits}
                </p>

            </div>
        </footer>
    );
}
