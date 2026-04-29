'use client';

import { Heart, Globe, Mail } from 'lucide-react';
import { useInvitationData } from '../InvitationContext';

export default function Footer() {
  const invitationData = useInvitationData();
    return (
        <footer className="py-20 px-6 bg-rose-950 text-orange-50 border-t-8 border-amber-700 relative">
            <div className="absolute inset-0 bg-[#000000] opacity-20 pointer-events-none mix-blend-overlay" />

            <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">

                {/* Monogram / Icon */}
                <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-rose-900 rounded-full flex flex-col items-center justify-center border border-amber-600/50 text-amber-400">
                        <Heart className="w-5 h-5 fill-amber-500/30" strokeWidth={1.5} />
                    </div>
                </div>

                {/* Names */}
                <h3 className="font-serif text-4xl md:text-5xl text-amber-100 font-medium">
                    {invitationData.brideName} & {invitationData.groomName}
                </h3>

                {/* Message */}
                <p className="text-orange-200/80 font-serif italic text-xl tracking-wide">
                    {invitationData.footer.message}
                </p>

                {/* Social Links */}
                <div className="flex justify-center gap-6 pt-4">
                    <a
                        href={invitationData.footer.instagramUrl}
                        className="w-12 h-12 rounded-full border border-amber-800 bg-rose-900 flex items-center justify-center text-amber-500 hover:bg-amber-700 hover:text-white transition-all duration-300 group shadow-lg"
                        aria-label="Globe"
                    >
                        <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                    </a>

                    <a
                        href={invitationData.footer.emailUrl}
                        className="w-12 h-12 rounded-full border border-amber-800 bg-rose-900 flex items-center justify-center text-amber-500 hover:bg-amber-700 hover:text-white transition-all duration-300 group shadow-lg"
                        aria-label="Email"
                    >
                        <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                    </a>
                </div>

                {/* Divider Line */}
                <div className="flex justify-center items-center py-4">
                    <div className="w-32 h-px bg-amber-900"></div>
                </div>

                {/* Hashtag & Contact */}
                <div className="space-y-4">
                    <p className="text-amber-600 text-sm font-sans tracking-[0.3em] font-bold uppercase">
                        {invitationData.footer.hashtag}
                    </p>
                    <div className="text-orange-300/60 text-xs font-sans">
                        <a
                            href={invitationData.footer.emailUrl}
                            className="hover:text-amber-500 transition-colors"
                        >
                            {invitationData.footer.contactEmail}
                        </a>
                    </div>
                </div>

                {/* Credits */}
                <p className="text-rose-900 text-[10px] font-sans pt-8 font-semibold">
                    {invitationData.footer.credits}
                </p>

            </div>
        </footer>
    );
}
