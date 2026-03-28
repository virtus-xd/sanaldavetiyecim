import type { Metadata } from 'next';
import { HeroSection }         from '@/components/home/HeroSection';
import { FeaturesSection }     from '@/components/home/FeaturesSection';
import { PopularTemplates }    from '@/components/home/PopularTemplates';
import { HowItWorksSection }   from '@/components/home/HowItWorksSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CTABanner }           from '@/components/home/CTABanner';
import { getPopularTemplates } from '@/lib/data/templates';
import { getVisibleTestimonials } from '@/lib/data/testimonials';
import { SITE_META } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Sanal Davetiyecim — Dijital Davetiye Tasarımı',
  description:
    'Düğün, nişan, söz ve kına organizasyonlarınız için şık dijital davetiye siteleri. 24-48 saat içinde teslim.',
};

const organizationJsonLd = {
  '@context':   'https://schema.org',
  '@type':      'LocalBusiness',
  name:         SITE_META.name,
  url:          SITE_META.url,
  description:  SITE_META.description,
  email:        SITE_META.email,
  sameAs: [
    `https://www.instagram.com/${SITE_META.instagram}`,
  ],
  makesOffer: {
    '@type':       'Offer',
    itemOffered: {
      '@type': 'Service',
      name:    'Dijital Davetiye Tasarımı',
    },
  },
};

/** Ana sayfa — Server Component, Supabase'den veri çeker */
export default async function HomePage() {
  const [templates, testimonials] = await Promise.all([
    getPopularTemplates(6),
    getVisibleTestimonials(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <HeroSection />
      <FeaturesSection />
      <PopularTemplates templates={templates} />
      <HowItWorksSection />
      <TestimonialsSection testimonials={testimonials} />
      <CTABanner />
    </>
  );
}
