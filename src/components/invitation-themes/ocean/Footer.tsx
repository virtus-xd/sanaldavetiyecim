'use client';

import { Heart, Globe, Mail } from 'lucide-react';
import { useInvitationData } from '../InvitationContext';

export default function Footer() {
  const invitationData = useInvitationData();
    return (
        <footer className="py-16 px-6 bg-cyan-900 text-sky-50 border-t border-cyan-800 relative">

            <div className="max-w-4xl mx-auto text-center space-y-10 mt-8">

                {/* Monogram / Icon */}
                <div className="mb-6 animate-pulse">
                    <div className="w-16 h-16 mx-auto bg-cyan-800/50 rounded-full flex items-center justify-center border border-teal-500/30 text-teal-400">
                        <Heart className="w-6 h-6 fill-teal-500/20" strokeWidth={1.5} />
                    </div>
                </div>

                {/* Names */}
                <h3 className="font-serif text-3xl md:text-4xl text-white">
                    {invitationData.brideName} & {invitationData.groomName}
                </h3>

                {/* Message */}
                <p className="text-cyan-200/80 font-sans font-light tracking-wide">
                    {invitationData.footer.message}
                </p>

                {/* Social Links */}
                <div className="flex justify-center gap-6">
                    <a
                        href={invitationData.footer.instagramUrl}
                        className="w-12 h-12 rounded-full border border-teal-500/30 bg-cyan-800/50 flex items-center justify-center text-teal-400 hover:bg-teal-600 hover:border-teal-500 hover:text-white transition-all duration-300 group shadow-lg"
                        aria-label="Globe"
                    >
                        <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                    </a>

                    <a
                        href={invitationData.footer.emailUrl}
                        className="w-12 h-12 rounded-full border border-teal-500/30 bg-cyan-800/50 flex items-center justify-center text-teal-400 hover:bg-teal-600 hover:border-teal-500 hover:text-white transition-all duration-300 group shadow-lg"
                        aria-label="Email"
                    >
                        <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                    </a>
                </div>

                {/* Divider Line */}
                <div className="flex justify-center items-center py-4">
                    <div className="w-24 h-px bg-cyan-700"></div>
                </div>

                {/* Hashtag & Contact */}
                <div className="space-y-4">
                    <p className="text-teal-400 text-sm font-sans tracking-[0.2em] uppercase">
                        {invitationData.footer.hashtag}
                    </p>
                    <div className="text-cyan-300/60 text-xs font-sans">
                        <a
                            href={invitationData.footer.emailUrl}
                            className="hover:text-teal-300 transition-colors"
                        >
                            {invitationData.footer.contactEmail}
                        </a>
                    </div>
                </div>

                {/* Credits */}
                <p className="text-cyan-800/50 text-[10px] font-sans pt-8">
                    {invitationData.footer.credits}
                </p>

            </div>
        </footer>
    );
}
