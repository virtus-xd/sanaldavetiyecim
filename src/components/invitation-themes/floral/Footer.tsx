'use client';

import { Heart, Globe, Mail } from 'lucide-react';
import { useInvitationData } from '../InvitationContext';

export default function Footer() {
  const invitationData = useInvitationData();
    return (
        <footer className="py-16 px-6 bg-rose-50 text-stone-600 border-t border-rose-100 relative">

            <div className="max-w-4xl mx-auto text-center space-y-10 mt-8">

                {/* Monogram / Icon */}
                <div className="mb-6 animate-bounce-slow">
                    <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm border border-rose-100 text-rose-400">
                        <Heart className="w-6 h-6 fill-rose-100" />
                    </div>
                </div>

                {/* Names */}
                <h3 className="font-serif text-3xl md:text-4xl text-rose-800">
                    {invitationData.brideName} & {invitationData.groomName}
                </h3>

                {/* Message */}
                <p className="text-stone-500 font-sans font-light tracking-wide">
                    {invitationData.footer.message}
                </p>

                {/* Social Links */}
                <div className="flex justify-center gap-6">
                    <a
                        href={invitationData.footer.instagramUrl}
                        className="w-12 h-12 rounded-full border border-rose-200 bg-white flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:border-rose-500 hover:text-white transition-all duration-300 group shadow-sm hover:shadow-md"
                        aria-label="Globe"
                    >
                        <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </a>

                    <a
                        href={invitationData.footer.emailUrl}
                        className="w-12 h-12 rounded-full border border-rose-200 bg-white flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:border-rose-500 hover:text-white transition-all duration-300 group shadow-sm hover:shadow-md"
                        aria-label="Email"
                    >
                        <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </a>
                </div>

                {/* Divider Line */}
                <div className="flex justify-center items-center py-6">
                    <div className="w-16 h-px bg-rose-200"></div>
                </div>

                {/* Hashtag & Contact */}
                <div className="space-y-4">
                    <p className="text-rose-600 text-sm font-sans tracking-[0.2em] font-medium uppercase">
                        {invitationData.footer.hashtag}
                    </p>
                    <div className="text-stone-400 text-xs font-sans">
                        <a
                            href={invitationData.footer.emailUrl}
                            className="hover:text-rose-600 transition-colors"
                        >
                            {invitationData.footer.contactEmail}
                        </a>
                    </div>
                </div>

                {/* Credits */}
                <p className="text-stone-300 text-[10px] font-sans pt-8">
                    {invitationData.footer.credits}
                </p>

            </div>
        </footer>
    );
}
