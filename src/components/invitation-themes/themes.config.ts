/**
 * Tema kayıt defteri — yeni davetiye teması eklemek için TEK dokunulacak nokta.
 *
 * Yeni tema eklemek için:
 *   1. src/components/invitation-themes/{key}/ altına HeroSection, EventDetailsSection, Footer ekle
 *   2. public/themes/{key}/ altına envelope.png (ve istersen bg.png) koy
 *   3. Aşağıdaki THEME_REGISTRY objesine yeni bir blok ekle
 *
 * ThemeKey, slug haritası ve renderer otomatik olarak buradan türer.
 */

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

import FlowersPinkHero from './flowers-pink/HeroSection';
import FlowersPinkEventDetails from './flowers-pink/EventDetailsSection';
import FlowersPinkFooter from './flowers-pink/Footer';

export interface ThemeDefinition {
  /** Kullanıcıya gösterilecek tema adı */
  label: string;
  /** templates.slug DB değeri */
  slug: string;
  /** Açılış zarf görseli */
  envelope: {
    desktop: string;
    /** Mobil için ayrı görsel verilmezse desktop kullanılır */
    mobile?: string;
  };
  Hero: React.FC;
  EventDetails: React.FC;
  Footer: React.FC;
}

export const THEME_REGISTRY = {
  classic: {
    label: 'Zarif Altın',
    slug: 'zarif-altin',
    envelope: {
      desktop: '/themes/classic/envelope.png',
      mobile: '/themes/classic/envelope-mobile.jpg',
    },
    Hero: ClassicHero,
    EventDetails: ClassicEventDetails,
    Footer: ClassicFooter,
  },
  modern: {
    label: 'Modern Minimal',
    slug: 'modern-minimal',
    envelope: { desktop: '/themes/modern/envelope.png' },
    Hero: ModernHero,
    EventDetails: ModernEventDetails,
    Footer: ModernFooter,
  },
  floral: {
    label: 'Romantik Gül',
    slug: 'romantik-gul',
    envelope: { desktop: '/themes/floral/envelope.png' },
    Hero: FloralHero,
    EventDetails: FloralEventDetails,
    Footer: FloralFooter,
  },
  starry: {
    label: 'Klasik Lacivert',
    slug: 'klasik-lacivert',
    envelope: { desktop: '/themes/starry/envelope.png' },
    Hero: StarryHero,
    EventDetails: StarryEventDetails,
    Footer: StarryFooter,
  },
  vintage: {
    label: 'Bahar Çiçekleri',
    slug: 'bahar-cicekleri',
    envelope: { desktop: '/themes/vintage/envelope.png' },
    Hero: VintageHero,
    EventDetails: VintageEventDetails,
    Footer: VintageFooter,
  },
  autumn: {
    label: 'Kına Gecesi',
    slug: 'kina-gecesi',
    envelope: { desktop: '/themes/autumn/envelope.png' },
    Hero: AutumnHero,
    EventDetails: AutumnEventDetails,
    Footer: AutumnFooter,
  },
  rustic: {
    label: 'Boho Doğa',
    slug: 'boho-doga',
    envelope: { desktop: '/themes/rustic/envelope.png' },
    Hero: RusticHero,
    EventDetails: RusticEventDetails,
    Footer: RusticFooter,
  },
  gatsby: {
    label: 'Siyah Beyaz',
    slug: 'siyah-beyaz',
    envelope: { desktop: '/themes/gatsby/envelope.png' },
    Hero: GatsbyHero,
    EventDetails: GatsbyEventDetails,
    Footer: GatsbyFooter,
  },
  ocean: {
    label: 'Okyanus',
    slug: 'okyanus',
    envelope: { desktop: '/themes/ocean/envelope.png' },
    Hero: OceanHero,
    EventDetails: OceanEventDetails,
    Footer: OceanFooter,
  },
  'flowers-pink': {
    label: 'Zerafet',
    slug: 'zerafet',
    envelope: {
      desktop: '/themes/flowers-pink/envelope.png',
      mobile: '/themes/flowers-pink/envelope-mobile.png',
    },
    Hero: FlowersPinkHero,
    EventDetails: FlowersPinkEventDetails,
    Footer: FlowersPinkFooter,
  },
} as const satisfies Record<string, ThemeDefinition>;

export type ThemeKey = keyof typeof THEME_REGISTRY;

export const DEFAULT_THEME: ThemeKey = 'classic';

/** slug → ThemeKey (registry'den otomatik türetilir) */
export const SLUG_TO_THEME: Record<string, ThemeKey> = Object.fromEntries(
  (Object.entries(THEME_REGISTRY) as [ThemeKey, ThemeDefinition][]).map(
    ([key, def]) => [def.slug, key],
  ),
);

export function getTheme(key: ThemeKey | string | null | undefined): ThemeDefinition {
  if (key && key in THEME_REGISTRY) {
    return THEME_REGISTRY[key as ThemeKey];
  }
  return THEME_REGISTRY[DEFAULT_THEME];
}
