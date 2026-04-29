'use client';

import { Heart, Globe, Mail } from 'lucide-react';
import { useInvitationData } from '../InvitationContext';

export default function Footer() {
  const invitationData = useInvitationData();
    return (
        <footer className="py-16 px-6 bg-[#0a120c] text-[#f7f5ef] border-t border-gold-500/10 relative">

            {/* Decorative Top Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent"></div>

            <div className="max-w-4xl mx-auto text-center space-y-10">

                {/* Monogram / Icon */}
                <div className="mb-6 animate-pulse">
                    <div className="w-16 h-16 mx-auto border border-gold-500/20 rounded-full flex items-center justify-center bg-gold-500/5">
                        <Heart className="w-6 h-6 text-gold-400 fill-gold-400/20" />
                    </div>
                </div>

                {/* Names */}
                <h3 className="font-serif text-3xl md:text-4xl text-gold-200">
                    {invitationData.brideName} & {invitationData.groomName}
                </h3>

                {/* Message */}
                <p className="text-gray-400 font-sans font-light tracking-wide">
                    {invitationData.footer.message}
                </p>

                {/* Social Links */}
                <div className="flex justify-center gap-6">
                    <a
                        href={invitationData.footer.instagramUrl}
                        className="w-12 h-12 rounded-full border border-gold-500/20 flex items-center justify-center text-gold-400 hover:bg-gold-500/10 hover:border-gold-500/40 hover:text-gold-200 transition-all duration-300 group"
                        aria-label="Globe"
                    >
                        <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </a>

                    <a
                        href={invitationData.footer.emailUrl}
                        className="w-12 h-12 rounded-full border border-gold-500/20 flex items-center justify-center text-gold-400 hover:bg-gold-500/10 hover:border-gold-500/40 hover:text-gold-200 transition-all duration-300 group"
                        aria-label="Email"
                    >
                        <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </a>
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-8"></div>

                {/* Hashtag & Contact */}
                <div className="space-y-4">
                    <p className="text-gold-500/80 text-sm font-sans tracking-[0.2em] uppercase opacity-70">
                        {invitationData.footer.hashtag}
                    </p>
                    <div className="text-gray-500 text-xs font-sans">
                        <a
                            href={invitationData.footer.emailUrl}
                            className="hover:text-gold-400 transition-colors"
                        >
                            {invitationData.footer.contactEmail}
                        </a>
                    </div>
                </div>

                {/* Credits */}
                <p className="text-white/20 text-[10px] font-sans pt-8">
                    {invitationData.footer.credits}
                </p>

            </div>
        </footer>
    );
}
