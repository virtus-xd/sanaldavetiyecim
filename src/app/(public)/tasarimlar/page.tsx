import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Container }         from '@/components/ui/Container';
import { SectionTitle }      from '@/components/ui/SectionTitle';
import { TemplateFilters }   from '@/components/templates/TemplateFilters';
import { TemplateCard, TemplateCardSkeleton } from '@/components/templates/TemplateCard';
import { getTemplates }      from '@/lib/data/templates';
// Faz 6: Artık Supabase'den veri çekiyor
import type { TemplateCategory, TemplateStyle } from '@/types';

export const metadata: Metadata = {
  title:       'Davetiye Tasarımları',
  description: 'Düğün, nişan, söz ve kına organizasyonları için şık dijital davetiye tasarımlarını inceleyin. Modern, klasik ve romantik seçenekler.',
  openGraph: {
    title:       'Davetiye Tasarımları — Sanal Davetiyecim',
    description: 'Düğün, nişan, söz ve kına organizasyonları için şık dijital davetiye tasarımları.',
    images:      [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

interface PageProps {
  searchParams: Promise<{ tur?: string; stil?: string }>;
}

export default async function TasarimlarPage({ searchParams }: PageProps) {
  const params   = await searchParams;
  const category = params.tur  as TemplateCategory | undefined;
  const style    = params.stil as TemplateStyle    | undefined;

  const templates = await getTemplates({
    category: category || undefined,
    style:    style    || undefined,
  });

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Başlık bandı */}
      <div className="bg-white border-b border-neutral-100 py-12 md:py-16">
        <Container>
          <SectionTitle
            title="Davetiye Tasarımları"
            subtitle="Organizasyonunuz için en uygun tasarımı seçin ve sipariş verin."
          />
        </Container>
      </div>

      <Container className="pt-10">
        {/* Filtre çubuğu */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-5 mb-8 shadow-sm">
          <Suspense fallback={<div className="h-20 animate-pulse bg-neutral-100 rounded-xl" />}>
            <TemplateFilters />
          </Suspense>
        </div>

        {/* Sonuç sayısı */}
        <p className="text-sm text-neutral-500 mb-6">
          <span className="font-semibold text-neutral-700">{templates.length}</span> tasarım bulundu
        </p>

        {/* Grid */}
        {templates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mb-4 text-3xl">
              🎨
            </div>
            <h3 className="font-display font-semibold text-neutral-700 text-lg mb-2">
              Tasarım bulunamadı
            </h3>
            <p className="text-neutral-500 text-sm">
              Seçili filtrelere uygun tasarım yok. Filtreleri değiştirmeyi deneyin.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}

/** Filtre olmadan tüm sayfayı statik render etme — searchParams dinamik */
export const dynamic = 'force-dynamic';
