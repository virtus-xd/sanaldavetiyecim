/**
 * Yükleme göstergesi bileşeni.
 */
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?:      'sm' | 'md' | 'lg';
  className?: string;
  label?:     string;
}

const sizeStyles = {
  sm:  'h-4 w-4 border-2',
  md:  'h-8 w-8 border-2',
  lg:  'h-12 w-12 border-[3px]',
};

export function LoadingSpinner({ size = 'md', className, label = 'Yükleniyor...' }: LoadingSpinnerProps) {
  return (
    <div role="status" className={cn('flex items-center justify-center', className)}>
      <div
        className={cn(
          'rounded-full border-neutral-200 border-t-primary animate-spin',
          sizeStyles[size]
        )}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

/** Tam sayfa yükleme overlay */
export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <LoadingSpinner size="lg" />
    </div>
  );
}
