'use client';

import { useState } from 'react';
import { InvitationProvider } from './InvitationContext';
import GlowEnvelopeLanding from '../invitation-shared/GlowEnvelopeLanding';
import MusicPlayer from '../invitation-shared/MusicPlayer';
import type { InvitationData, ThemeKey } from './types';

import ClassicHero from './classic/HeroSection';
import ClassicEventDetails from './classic/EventDetailsSection';
import ClassicFooter from './classic/Footer';

import FloralHero from './floral/HeroSection';
import FloralEventDetails from './floral/EventDetailsSection';
import FloralFooter from './floral/Footer';

import ModernHero from './modern/HeroSection';
import ModernEventDetails from './modern/EventDetailsSection';
import ModernFooter from './modern/Footer';

import RusticHero from './rustic/HeroSection';
import RusticEventDetails from './rustic/EventDetailsSection';
import RusticFooter from './rustic/Footer';

import OceanHero from './ocean/HeroSection';
import OceanEventDetails from './ocean/EventDetailsSection';
import OceanFooter from './ocean/Footer';

import StarryHero from './starry/HeroSection';
import StarryEventDetails from './starry/EventDetailsSection';
import StarryFooter from './starry/Footer';

import AutumnHero from './autumn/HeroSection';
import AutumnEventDetails from './autumn/EventDetailsSection';
import AutumnFooter from './autumn/Footer';

import GatsbyHero from './gatsby/HeroSection';
import GatsbyEventDetails from './gatsby/EventDetailsSection';
import GatsbyFooter from './gatsby/Footer';

import VintageHero from './vintage/HeroSection';
import VintageEventDetails from './vintage/EventDetailsSection';
import VintageFooter from './vintage/Footer';

const THEMES: Record<ThemeKey, { Hero: React.FC; EventDetails: React.FC; Footer: React.FC }> = {
  classic: { Hero: ClassicHero, EventDetails: ClassicEventDetails, Footer: ClassicFooter },
  floral:  { Hero: FloralHero,  EventDetails: FloralEventDetails,  Footer: FloralFooter },
  modern:  { Hero: ModernHero,  EventDetails: ModernEventDetails,  Footer: ModernFooter },
  rustic:  { Hero: RusticHero,  EventDetails: RusticEventDetails,  Footer: RusticFooter },
  ocean:   { Hero: OceanHero,   EventDetails: OceanEventDetails,   Footer: OceanFooter },
  starry:  { Hero: StarryHero,  EventDetails: StarryEventDetails,  Footer: StarryFooter },
  autumn:  { Hero: AutumnHero,  EventDetails: AutumnEventDetails,  Footer: AutumnFooter },
  gatsby:  { Hero: GatsbyHero,  EventDetails: GatsbyEventDetails,  Footer: GatsbyFooter },
  vintage: { Hero: VintageHero, EventDetails: VintageEventDetails, Footer: VintageFooter },
};

interface InvitationRendererProps {
  data: InvitationData;
  theme: ThemeKey;
}

export default function InvitationRenderer({ data, theme }: InvitationRendererProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);

  const { Hero, EventDetails, Footer } = THEMES[theme] ?? THEMES.classic;

  if (!isOpen) {
    return (
      <GlowEnvelopeLanding
        theme={theme}
        onOpen={() => setIsOpen(true)}
        onStart={() => setMusicStarted(true)}
      />
    );
  }

  return (
    <InvitationProvider data={data}>
      <MusicPlayer src="/invitation-assets/music.mp3" startPlaying={musicStarted} />
      <div className="fade-in">
        <Hero />
        <EventDetails />
        <Footer />
      </div>
    </InvitationProvider>
  );
}
