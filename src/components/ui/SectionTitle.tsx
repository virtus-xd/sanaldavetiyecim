/**
 * Sayfa bölüm başlığı bileşeni — tutarlı tipografi ve dekoratif çizgi ile.
 */
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title:       string;
  subtitle?:   string;
  align?:      'left' | 'center' | 'right';
  className?:  string;
  decorated?:  boolean;
}

const alignStyles = {
  left:   'items-start text-left',
  center: 'items-center text-center',
  right:  'items-end text-right',
};

export function SectionTitle({
  title,
  subtitle,
  align     = 'center',
  className,
  decorated = true,
}: SectionTitleProps) {
  return (
    <div className={cn('flex flex-col gap-3', alignStyles[align], className)}>
      {decorated && (
        <div className="flex items-center gap-2">
          <div className="h-px w-8 bg-primary" aria-hidden="true" />
          <div className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
          <div className="h-px w-8 bg-primary" aria-hidden="true" />
        </div>
      )}

      <h2 className="font-display text-3xl md:text-4xl font-semibold text-neutral-800 leading-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="text-neutral-500 text-base md:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
