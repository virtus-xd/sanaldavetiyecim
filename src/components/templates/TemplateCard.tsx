/**
 * Galeri şablon kartı bileşeni.
 */
import Link from 'next/link';
import { Eye, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { EVENT_TYPES, TEMPLATE_STYLES } from '@/lib/constants';
import { Badge } from '@/components/ui/Badge';
import type { Template } from '@/types';

interface TemplateCardProps {
  template: Template;
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300">
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

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link
            href={`/tasarimlar/${template.slug}`}
            className="flex items-center gap-1.5 px-4 py-2 bg-white text-neutral-800 rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-colors"
          >
            <Eye size={14} aria-hidden="true" />
            İncele
          </Link>
          <Link
            href={`/siparis?tasarim=${template.id}`}
            className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            <ArrowRight size={14} aria-hidden="true" />
            Sipariş Ver
          </Link>
        </div>
      </div>

      {/* İçerik */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-semibold text-neutral-800 leading-snug">
            {template.name}
          </h3>
          <span className="font-bold text-primary shrink-0">
            {formatPrice(template.price)}
          </span>
        </div>

        <p className="text-neutral-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {template.description}
        </p>

        <div className="flex items-center gap-2">
          <Badge variant="primary">{EVENT_TYPES[template.category]}</Badge>
          <Badge variant="neutral">{TEMPLATE_STYLES[template.style]}</Badge>
        </div>
      </div>
    </article>
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
        <div className="flex gap-2">
          <div className="h-6 bg-neutral-100 rounded-full w-16" />
          <div className="h-6 bg-neutral-100 rounded-full w-16" />
        </div>
      </div>
    </div>
  );
}
