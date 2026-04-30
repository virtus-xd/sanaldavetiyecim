'use client';

import { useState } from 'react';
import { InvitationProvider } from './InvitationContext';
import GlowEnvelopeLanding from '../invitation-shared/GlowEnvelopeLanding';
import MusicPlayer from '../invitation-shared/MusicPlayer';
import { getTheme } from './themes.config';
import type { InvitationData, ThemeKey } from './types';

interface InvitationRendererProps {
  data: InvitationData;
  theme: ThemeKey;
}

export default function InvitationRenderer({ data, theme }: InvitationRendererProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);

  const { Hero, EventDetails, Footer, envelope } = getTheme(theme);

  if (!isOpen) {
    return (
      <GlowEnvelopeLanding
        envelopeDesktop={envelope.desktop}
        envelopeMobile={envelope.mobile}
        onOpen={() => setIsOpen(true)}
        onStart={() => setMusicStarted(true)}
      />
    );
  }

  return (
    <InvitationProvider data={data}>
      <MusicPlayer src="/themes/_shared/music.mp3" startPlaying={musicStarted} />
      <div className="fade-in">
        <Hero />
        <EventDetails />
        <Footer />
      </div>
    </InvitationProvider>
  );
}
