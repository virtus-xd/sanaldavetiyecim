'use client';

import { Heart, Globe, Mail } from 'lucide-react';
import { useInvitationData } from '../InvitationContext';

export default function Footer() {
  const invitationData = useInvitationData();
    return (
        <footer className="py-20 px-6 bg-[#0B101E] text-slate-400 border-t border-slate-900 relative">

            <div className="max-w-3xl mx-auto text-center space-y-12">

                {/* Names */}
                <h3 className="font-serif text-3xl md:text-5xl text-white font-light tracking-wide">
                    {invitationData.brideName} & {invitationData.groomName}
                </h3>

                {/* Message */}
                <p className="text-slate-500 font-sans font-light tracking-widest text-sm uppercase">
                    {invitationData.footer.message}
                </p>

                {/* Monogram / Icon inline */}
                <div className="flex justify-center items-center py-2 animate-pulse">
                    <Heart className="w-5 h-5 text-indigo-400/50 fill-indigo-500/10" strokeWidth={1} />
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-8">
                    <a
                        href={invitationData.footer.instagramUrl}
                        className="text-slate-600 hover:text-slate-300 transition-colors duration-300"
                        aria-label="Globe"
                    >
                        <Globe className="w-6 h-6" strokeWidth={1} />
                    </a>

                    <a
                        href={invitationData.footer.emailUrl}
                        className="text-slate-600 hover:text-slate-300 transition-colors duration-300"
                        aria-label="Email"
                    >
                        <Mail className="w-6 h-6" strokeWidth={1} />
                    </a>
                </div>

                {/* Hashtag */}
                <div className="pt-4 border-t border-slate-900/80 w-48 mx-auto">
                    <p className="text-slate-500 text-xs font-sans tracking-[0.3em] uppercase">
                        {invitationData.footer.hashtag}
                    </p>
                </div>

                {/* Credits */}
                <p className="text-slate-800 text-[10px] font-sans pt-12">
                    {invitationData.footer.credits}
                </p>

            </div>
        </footer>
    );
}
