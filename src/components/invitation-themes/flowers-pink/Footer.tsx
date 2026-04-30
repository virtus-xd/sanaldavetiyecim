'use client';

import { Globe, Mail } from 'lucide-react';
import { useInvitationData } from '../InvitationContext';

export default function Footer() {
    const invitationData = useInvitationData();
    return (
        <footer className="py-24 px-6 bg-[#fdfaf9] text-[#3a3f38] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/themes/flowers-pink/bg.png')] bg-cover bg-bottom bg-no-repeat opacity-20 pointer-events-none mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#fdfaf9]/90 to-transparent pointer-events-none" />

            <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10 bg-white/50 backdrop-blur-sm p-12 rounded-[4rem] border border-[#f0e4e4] shadow-sm">
                <h3 className="font-handwriting text-5xl md:text-6xl text-[#4b5c51]">
                    {invitationData.brideName} <span className="text-3xl text-[#d4a5a5] px-2">&amp;</span> {invitationData.groomName}
                </h3>
                
                <p className="text-[#7a8a7f] font-serif italic text-lg md:text-xl tracking-wide max-w-2xl mx-auto">
                    "{invitationData.footer.message}"
                </p>

                <div className="flex justify-center items-center py-2 opacity-60">
                    <div className="w-16 h-[1px] bg-[#e6d5d5]"></div>
                </div>

                <div className="flex justify-center gap-8">
                    <a href={invitationData.footer.instagramUrl} className="text-[#8c9c90] hover:text-[#d4a5a5] hover:-translate-y-1 transition-transform duration-300">
                        <Globe className="w-6 h-6" strokeWidth={1} />
                    </a>
                    <a href={invitationData.footer.emailUrl} className="text-[#8c9c90] hover:text-[#d4a5a5] hover:-translate-y-1 transition-transform duration-300">
                        <Mail className="w-6 h-6" strokeWidth={1} />
                    </a>
                </div>

                <div className="space-y-4 pt-4">
                    <p className="text-[#4b5c51] text-xs font-sans tracking-[0.3em] uppercase">
                        {invitationData.footer.hashtag}
                    </p>
                    <div className="text-[#8c9c90] text-[10px] font-sans tracking-widest uppercase">
                        <a href={invitationData.footer.emailUrl} className="hover:text-[#4b5c51] transition-colors">
                            {invitationData.footer.contactEmail}
                        </a>
                    </div>
                </div>

                <p className="text-[#b8c2bc] text-[9px] font-sans pt-12 tracking-[0.2em] uppercase">
                    {invitationData.footer.credits}
                </p>
            </div>
        </footer>
    );
}
