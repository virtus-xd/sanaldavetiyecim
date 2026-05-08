/**
 * Galeri şablon kartı bileşeni.
 */
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { PriceTag } from '@/components/ui/PriceTag';
import type { Template } from '@/types';

interface TemplateCardProps {
  template: Template;
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Link
      href={`/onizleme/${template.slug}`}
      aria-label={`${template.name} canlı önizlemesini aç`}
      className="group block bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <article>
        {/* Görsel */}
        <div className="relative h-56 overflow-hidden bg-neutral-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={template.previewImages[0]}
            alt={`${template.name} davetiye tasarımı önizlemesi`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Popüler rozeti */}
          {template.isPopular && (
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 bg-primary text-white text-xs font-semibold rounded-full shadow-sm">
                Popüler
              </span>
            </div>
          )}

          {/* Hover overlay — kart tıklanabilir, hover'da CTA göstergesi */}
          <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="flex items-center gap-2 px-5 py-2.5 bg-white text-neutral-800 rounded-full text-sm font-semibold shadow-lg">
              <Eye size={16} aria-hidden="true" />
              Canlı Önizleme
            </span>
          </div>
        </div>

        {/* İçerik */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-display font-semibold text-neutral-800 leading-snug group-hover:text-primary transition-colors">
              {template.name}
            </h3>
            <PriceTag price={template.price} variant="card" />
          </div>

          <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2">
            {template.description}
          </p>
        </div>
      </article>
    </Link>
  );
}

/** Skeleton yüklenme durumu */
export function TemplateCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-neutral-100 animate-pulse">
      <div className="h-56 bg-neutral-200" />
      <div className="p-5 flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="h-5 bg-neutral-200 rounded w-2/3" />
          <div className="h-5 bg-neutral-200 rounded w-16" />
        </div>
        <div className="h-4 bg-neutral-100 rounded w-full" />
        <div className="h-4 bg-neutral-100 rounded w-3/4" />
      </div>
    </div>
  );
}
