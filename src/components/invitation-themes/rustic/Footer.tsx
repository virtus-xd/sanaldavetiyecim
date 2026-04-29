'use client';

import { Mail, Globe } from 'lucide-react';
import { useInvitationData } from '../InvitationContext';

export default function Footer() {
  const invitationData = useInvitationData();
    return (
        <footer className="py-20 px-6 bg-[#4A3B32] text-[#FAF6F0] relative overflow-hidden">
            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 bg-[#2D211A] opacity-20 pointer-events-none mix-blend-multiply" />

            <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">

                <div className="flex justify-center items-center gap-4 text-[#A68A64]">
                    <span className="text-xl">~</span>
                    <span className="w-16 h-px bg-[#A68A64]"></span>
                    <span className="text-xl">~</span>
                </div>

                <div className="space-y-4">
                    <h3 className="font-serif text-3xl md:text-5xl text-[#E8DCCB] mb-2 tracking-wide font-light">
                        {invitationData.brideName} &amp; {invitationData.groomName}
                    </h3>
                    <p className="text-[#D4C3B3] font-sans text-sm tracking-widest max-w-sm mx-auto uppercase">
                        {invitationData.footer.message}
                    </p>
                </div>

                <div className="flex justify-center gap-8 pt-8 border-t border-[#A68A64]/30 w-64 mx-auto">
                    <a
                        href={invitationData.footer.instagramUrl}
                        className="text-[#A68A64] hover:text-[#E8DCCB] hover:scale-110 transition-all duration-300 transform"
                        aria-label="Globe"
                    >
                        <Globe className="w-6 h-6" strokeWidth={1.5} />
                    </a>

                    <a
                        href={invitationData.footer.emailUrl}
                        className="text-[#A68A64] hover:text-[#E8DCCB] hover:scale-110 transition-all duration-300 transform"
                        aria-label="Email"
                    >
                        <Mail className="w-6 h-6" strokeWidth={1.5} />
                    </a>
                </div>

                <div className="space-y-2 pt-6">
                    <p className="text-[#E8DCCB] font-sans tracking-[0.3em] uppercase text-xs">
                        {invitationData.footer.hashtag}
                    </p>
                </div>

                <div className="pt-12">
                    <p className="text-[#8B7355] text-xs font-sans tracking-widest">
                        {invitationData.footer.credits}
                    </p>
                </div>

            </div>
        </footer>
    );
}
