'use client';

/**
 * Galeri filtre çubuğu — URL query parametreleri ile çalışır.
 */
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { EVENT_TYPE_OPTIONS, TEMPLATE_STYLE_OPTIONS } from '@/lib/constants';
import type { TemplateCategory, TemplateStyle } from '@/types';

const ALL_LABEL = 'Tümü';

export function TemplateFilters() {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get('tur')  as TemplateCategory | null;
  const activeStyle    = searchParams.get('stil') as TemplateStyle    | null;

  const setFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Kategori filtresi */}
      <div>
        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
          Organizasyon Türü
        </p>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label={ALL_LABEL}
            active={!activeCategory}
            onClick={() => setFilter('tur', null)}
          />
          {EVENT_TYPE_OPTIONS.map((opt) => (
            <FilterChip
              key={opt.value}
              label={opt.label}
              active={activeCategory === opt.value}
              onClick={() => setFilter('tur', opt.value)}
            />
          ))}
        </div>
      </div>

      {/* Stil filtresi */}
      <div>
        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
          Tasarım Stili
        </p>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label={ALL_LABEL}
            active={!activeStyle}
            onClick={() => setFilter('stil', null)}
          />
          {TEMPLATE_STYLE_OPTIONS.map((opt) => (
            <FilterChip
              key={opt.value}
              label={opt.label}
              active={activeStyle === opt.value}
              onClick={() => setFilter('stil', opt.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label:   string;
  active:  boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-150',
        active
          ? 'bg-primary text-white shadow-sm'
          : 'bg-white border border-neutral-200 text-neutral-600 hover:border-primary hover:text-primary'
      )}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}
