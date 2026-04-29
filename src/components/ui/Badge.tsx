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
  primary:   'bg-[#ecf4ff] text-primary border border-[#c6deff]',
  secondary: 'bg-[#f9f9f9] text-[#555555] border border-[#dddddd]',
  accent:    'bg-[#fde3e7] text-[#d70040] border border-[#f9b8c4]',
  success:   'bg-[#e2f5e3] text-[#10a87a] border border-[#bbe9d2]',
  warning:   'bg-[#fdf0d9] text-[#f69504] border border-[#ffd98e]',
  error:     'bg-[#fde3e7] text-[#d70040] border border-[#f9b8c4]',
  neutral:   'bg-[#f9f9f9] text-[#555555] border border-[#dddddd]',
};

export function Badge({ children, variant = 'primary', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
