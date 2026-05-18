/**
 * Tema kayıt defteri — yeni davetiye teması eklemek için TEK dokunulacak nokta.
 *
 * Yeni tema eklemek için:
 *   1. src/components/invitation-themes/{key}/ altına HeroSection, EventDetailsSection, Footer ekle
 *   2. public/themes/{key}/ altına envelope.webp (ve istersen bg.webp) koy
 *   3. Aşağıdaki THEME_REGISTRY objesine yeni bir blok ekle
 *
 * ThemeKey, slug haritası ve renderer otomatik olarak buradan türer.
 */

import ClassicHero from './classic/HeroSection';
import ClassicEventDetails from './classic/EventDetailsSection';
import ClassicFooter from './classic/Footer';
import ClassicGallery from './classic/GallerySection';

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
import StarryGallery from './starry/GallerySection';

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
import FlowersPinkGallery from './flowers-pink/GallerySection';

import ElegantHero from './elegant/HeroSection';
import ElegantEventDetails from './elegant/EventDetailsSection';
import ElegantFooter from './elegant/Footer';
import ElegantGallery from './elegant/GallerySection';

import SageHero from './sage/HeroSection';
import SageEventDetails from './sage/EventDetailsSection';
import SageFooter from './sage/Footer';
import SageGallery from './sage/GallerySection';

import BohoHero from './boho/HeroSection';
import BohoEventDetails from './boho/EventDetailsSection';
import BohoFooter from './boho/Footer';
import BohoGallery from './boho/GallerySection';

import BlossomHero from './blossom/HeroSection';
import BlossomEventDetails from './blossom/EventDetailsSection';
import BlossomFooter from './blossom/Footer';
import BlossomGallery from './blossom/GallerySection';

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
  /** Opsiyonel galeri bölümü — tanımlıysa Hero ile EventDetails arasında render edilir */
  Gallery?: React.FC;
}

export const THEME_REGISTRY = {
  classic: {
    label: 'Zarif Altın',
    slug: 'zarif-altin',
    envelope: {
      desktop: '/themes/classic/envelope.webp',
      mobile: '/themes/classic/envelope-mobile.webp',
    },
    Hero: ClassicHero,
    Gallery: ClassicGallery,
    EventDetails: ClassicEventDetails,
    Footer: ClassicFooter,
  },
  modern: {
    label: 'Modern Minimal',
    slug: 'modern-minimal',
    envelope: { desktop: '/themes/modern/envelope.webp' },
    Hero: ModernHero,
    EventDetails: ModernEventDetails,
    Footer: ModernFooter,
  },
  floral: {
    label: 'Romantik Gül',
    slug: 'romantik-gul',
    envelope: { desktop: '/themes/floral/envelope.webp' },
    Hero: FloralHero,
    EventDetails: FloralEventDetails,
    Footer: FloralFooter,
  },
  starry: {
    label: 'Klasik Lacivert',
    slug: 'klasik-lacivert',
    envelope: { desktop: '/themes/starry/envelope.webp' },
    Hero: StarryHero,
    Gallery: StarryGallery,
    EventDetails: StarryEventDetails,
    Footer: StarryFooter,
  },
  vintage: {
    label: 'Bahar Çiçekleri',
    slug: 'bahar-cicekleri',
    envelope: { desktop: '/themes/vintage/envelope.webp' },
    Hero: VintageHero,
    EventDetails: VintageEventDetails,
    Footer: VintageFooter,
  },
  autumn: {
    label: 'Kına Gecesi',
    slug: 'kina-gecesi',
    envelope: { desktop: '/themes/autumn/envelope.webp' },
    Hero: AutumnHero,
    EventDetails: AutumnEventDetails,
    Footer: AutumnFooter,
  },
  rustic: {
    label: 'Boho Doğa',
    slug: 'boho-doga',
    envelope: { desktop: '/themes/rustic/envelope.webp' },
    Hero: RusticHero,
    EventDetails: RusticEventDetails,
    Footer: RusticFooter,
  },
  gatsby: {
    label: 'Siyah Beyaz',
    slug: 'siyah-beyaz',
    envelope: { desktop: '/themes/gatsby/envelope.webp' },
    Hero: GatsbyHero,
    EventDetails: GatsbyEventDetails,
    Footer: GatsbyFooter,
  },
  ocean: {
    label: 'Okyanus',
    slug: 'okyanus',
    envelope: { desktop: '/themes/ocean/envelope.webp' },
    Hero: OceanHero,
    EventDetails: OceanEventDetails,
    Footer: OceanFooter,
  },
  'flowers-pink': {
    label: 'Zerafet',
    slug: 'zerafet',
    envelope: {
      desktop: '/themes/flowers-pink/envelope.webp',
      mobile: '/themes/flowers-pink/envelope-mobile.webp',
    },
    Hero: FlowersPinkHero,
    Gallery: FlowersPinkGallery,
    EventDetails: FlowersPinkEventDetails,
    Footer: FlowersPinkFooter,
  },
  elegant: {
    label: 'Altın Zarafet',
    slug: 'altin-zarafet',
    envelope: {
      desktop: '/themes/elegant/envelope.webp',
      mobile: '/themes/elegant/envelope-mobile.webp',
    },
    Hero: ElegantHero,
    Gallery: ElegantGallery,
    EventDetails: ElegantEventDetails,
    Footer: ElegantFooter,
  },
  sage: {
    label: 'Sage Bahçe',
    slug: 'sage-bahce',
    envelope: {
      desktop: '/themes/sage/envelope.webp',
      mobile: '/themes/sage/envelope-mobile.webp',
    },
    Hero: SageHero,
    Gallery: SageGallery,
    EventDetails: SageEventDetails,
    Footer: SageFooter,
  },
  boho: {
    label: 'Boho Krem',
    slug: 'boho-krem',
    envelope: {
      desktop: '/themes/boho/envelope.webp',
      mobile: '/themes/boho/envelope-mobile.webp',
    },
    Hero: BohoHero,
    Gallery: BohoGallery,
    EventDetails: BohoEventDetails,
    Footer: BohoFooter,
  },
  blossom: {
    label: 'Bahar Çiçeği',
    slug: 'bahar-cicegi',
    envelope: {
      desktop: '/themes/blossom/envelope.webp',
      mobile: '/themes/blossom/envelope-mobile.webp',
    },
    Hero: BlossomHero,
    Gallery: BlossomGallery,
    EventDetails: BlossomEventDetails,
    Footer: BlossomFooter,
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
