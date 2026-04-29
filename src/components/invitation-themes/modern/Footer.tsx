'use client';

import { useInvitationData } from '../InvitationContext';

export default function Footer() {
  const invitationData = useInvitationData();
    return (
        <footer className="py-24 px-6 bg-white text-black font-sans">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-12">
                
                {/* Left side */}
                <div className="text-center md:text-left">
                    <h3 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                        {invitationData.brideName} & {invitationData.groomName}
                    </h3>
                    <p className="text-neutral-500 font-light mb-8 max-w-sm">
                        {invitationData.footer.message}
                    </p>
                    <p className="text-sm font-semibold tracking-widest uppercase">
                        {invitationData.dateDisplay}
                    </p>
                </div>

                {/* Right side (Links & Hashtag) */}
                <div className="flex flex-col items-center md:items-end gap-6 text-sm font-medium tracking-widest uppercase text-neutral-400">
                    <p className="text-black text-lg">{invitationData.footer.hashtag}</p>
                    
                    <a href={invitationData.footer.instagramUrl} className="hover:text-black transition-colors">
                        Globe
                    </a>
                    <a href={invitationData.footer.emailUrl} className="hover:text-black transition-colors">
                        E-posta İletişim
                    </a>
                    
                    <p className="text-[10px] mt-8 opacity-50">
                        {invitationData.footer.credits}
                    </p>
                </div>

            </div>
        </footer>
    );
}
