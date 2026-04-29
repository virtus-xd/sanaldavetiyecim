'use client';

/**
 * Galeri filtre çubuğu — URL query parametreleri ile çalışır.
 */
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { TEMPLATE_STYLE_OPTIONS } from '@/lib/constants';
import type { TemplateStyle } from '@/types';

const ALL_LABEL = 'Tümü';

export function TemplateFilters() {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();

  const activeStyle = searchParams.get('stil') as TemplateStyle | null;

  const setFilter = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('stil', value);
    } else {
      params.delete('stil');
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <FilterChip
        label={ALL_LABEL}
        active={!activeStyle}
        onClick={() => setFilter(null)}
      />
      {TEMPLATE_STYLE_OPTIONS.map((opt) => (
        <FilterChip
          key={opt.value}
          label={opt.label}
          active={activeStyle === opt.value}
          onClick={() => setFilter(opt.value)}
        />
      ))}
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
