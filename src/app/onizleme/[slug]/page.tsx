import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import InvitationRenderer from '@/components/invitation-themes/InvitationRenderer';
import { SLUG_TO_THEME } from '@/components/invitation-themes/themes.config';
import { getTemplateBySlug } from '@/lib/data/templates';
import { sampleInvitation } from '@/lib/data/sampleInvitation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

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

  return (data ?? [])
    .map((t: { slug: string }) => t.slug)
    .filter((slug: string) => slug in SLUG_TO_THEME)
    .map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = await getTemplateBySlug(slug);
  const name = template?.name ?? 'Tasarım';

  return {
    title:       `${name} — Canlı Önizleme`,
    description: `${name} tasarımının çalışan örneğini inceleyin.`,
    robots:      { index: false, follow: false },
  };
}

export default async function PreviewPage({ params }: PageProps) {
  const { slug } = await params;
  const template = await getTemplateBySlug(slug);
  if (!template) notFound();

  const themeKey = SLUG_TO_THEME[slug];
  if (!themeKey) notFound();

  return (
    <>
      <InvitationRenderer data={sampleInvitation} theme={themeKey} />

      <div className="fixed top-3 right-3 z-50 flex items-center gap-2">
        <Link
          href={`/tasarimlar/${slug}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-black/10 text-[12px] font-semibold text-neutral-700 hover:bg-white hover:text-black transition-colors shadow-sm"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Tasarıma Dön
        </Link>
        <Link
          href={`/siparis?tasarim=${template.id}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-white text-[12px] font-semibold hover:bg-primary-dark transition-colors shadow-sm"
        >
          <ShoppingBag size={14} aria-hidden="true" />
          Sipariş Et
        </Link>
      </div>

      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-medium tracking-wide pointer-events-none">
        Örnek davetiye — &quot;{template.name}&quot; canlı önizlemesi
      </div>
    </>
  );
}
