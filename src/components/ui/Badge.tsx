/**
 * Küçük etiket bileşeni — kategori, durum vb. için.
 */
import { cn } from '@/lib/utils';

type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'neutral';

interface BadgeProps {
  children:   React.ReactNode;
  variant?:   BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary:   'bg-primary/10  text-primary-dark',
  secondary: 'bg-secondary/20 text-secondary-dark',
  accent:    'bg-accent/10   text-accent',
  success:   'bg-green-100   text-green-700',
  warning:   'bg-yellow-100  text-yellow-700',
  error:     'bg-red-100     text-red-700',
  neutral:   'bg-neutral-100 text-neutral-600',
};

export function Badge({ children, variant = 'primary', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
