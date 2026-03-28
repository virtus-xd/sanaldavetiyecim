import { notFound }       from 'next/navigation';
import Link                from 'next/link';
import type { Metadata }   from 'next';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { getTemplateBySlug, getRelatedTemplates, getTemplates } from '@/lib/data/templates';
import { formatPrice }     from '@/lib/utils';
import { EVENT_TYPES, TEMPLATE_STYLES } from '@/lib/constants';
import { Container }       from '@/components/ui/Container';
import { Button }          from '@/components/ui/Button';
import { Badge }           from '@/components/ui/Badge';
import { SectionTitle }    from '@/components/ui/SectionTitle';
import { ImageGallery }    from '@/components/templates/ImageGallery';
import { TemplateCard }    from '@/components/templates/TemplateCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Statik parametre üretimi — build sırasında service role ile slug'ları çeker */
export async function generateStaticParams() {
  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
  const { data } = await supabase
    .from('templates')
    .select('slug')
    .eq('is_active', true);
  return (data ?? []).map((t: { slug: string }) => ({ slug: t.slug }));
}

/** Dinamik SEO metadata */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = await getTemplateBySlug(slug);
  if (!template) return { title: 'Tasarım Bulunamadı' };

  const ogImage = template.previewImages[0]
    ? { url: template.previewImages[0], width: 1200, height: 800, alt: template.name }
    : { url: '/og-image.jpg', width: 1200, height: 630, alt: template.name };

  return {
    title:       template.name,
    description: `${template.description} — Hızlı teslimat, kişiselleştirilebilir dijital davetiye.`,
    openGraph: {
      type:        'website',
      title:       `${template.name} — Sanal Davetiyecim`,
      description: template.description,
      images:      [ogImage],
    },
    twitter: {
      card:        'summary_large_image',
      title:       `${template.name} — Sanal Davetiyecim`,
      description: template.description,
      images:      [ogImage.url],
    },
    alternates: {
      canonical: `https://sanaldavetiyecim.com/tasarimlar/${slug}`,
    },
  };
}

const highlights = [
  'Kişisel bilgilerinizle özelleştirilir',
  'Tüm cihazlarda mükemmel görünür',
  '24-48 saat içinde teslim edilir',
  'Sınırsız misafir erişimi',
  'Kolay link paylaşımı',
];

export default async function TasarimDetayPage({ params }: PageProps) {
  const { slug } = await params;
  const template = await getTemplateBySlug(slug);

  if (!template) notFound();

  const related = await getRelatedTemplates(template);

  const jsonLd = {
    '@context':     'https://schema.org',
    '@type':        'Product',
    name:           template.name,
    description:    template.description,
    image:          template.previewImages,
    url:            `https://sanaldavetiyecim.com/tasarimlar/${template.slug}`,
    offers: {
      '@type':       'Offer',
      price:         String(template.price),
      priceCurrency: 'TRY',
      availability:  'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name:    'Sanal Davetiyecim',
      },
    },
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="pt-8">
        {/* Geri butonu */}
        <Link
          href="/tasarimlar"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Tüm Tasarımlar
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Sol: Görsel Galerisi */}
          <ImageGallery images={template.previewImages} alt={template.name} />

          {/* Sağ: Bilgiler */}
          <div className="flex flex-col gap-6">
            {/* Başlık ve fiyat */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="primary">{EVENT_TYPES[template.category]}</Badge>
                <Badge variant="neutral">{TEMPLATE_STYLES[template.style]}</Badge>
                {template.isPopular && <Badge variant="secondary">Popüler</Badge>}
              </div>

              <h1 className="font-display text-3xl md:text-4xl font-bold text-neutral-800 mb-2">
                {template.name}
              </h1>

              <p className="font-display text-3xl font-bold text-primary">
                {formatPrice(template.price)}
              </p>
            </div>

            {/* Açıklama */}
            <p className="text-neutral-600 leading-relaxed">{template.description}</p>

            {/* Özellikler */}
            <div className="bg-cream rounded-xl p-5">
              <p className="font-semibold text-neutral-700 text-sm mb-3">Bu pakete dahil:</p>
              <ul className="flex flex-col gap-2">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-neutral-600">
                    <CheckCircle2 size={16} className="text-primary shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Butonları */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="flex-1">
                <Link href={`/siparis?tasarim=${template.id}`} className="flex items-center justify-center gap-2">
                  Bu Tasarımı Sipariş Et
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/iletisim">Bilgi Al</Link>
              </Button>
            </div>

            <p className="text-xs text-neutral-400 text-center sm:text-left">
              Siparişinizi verdikten sonra 24-48 saat içinde davetiye siteniz hazırlanır.
            </p>
          </div>
        </div>

        {/* İlgili Tasarımlar */}
        {related.length > 0 && (
          <div className="mt-20">
            <SectionTitle
              title="Benzer Tasarımlar"
              align="left"
              className="mb-8"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((t) => (
                <TemplateCard key={t.id} template={t} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
