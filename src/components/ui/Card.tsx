/**
 * İçerik kartı bileşeni — hover efekti ve opsiyonel görsel desteği ile.
 */
import { cn } from '@/lib/utils';

interface CardProps {
  children:    React.ReactNode;
  className?:  string;
  hover?:      boolean;
  padding?:    'none' | 'sm' | 'md' | 'lg';
  onClick?:    () => void;
}

const paddingStyles = {
  none: '',
  sm:   'p-3',
  md:   'p-5',
  lg:   'p-8',
};

export function Card({
  children,
  className,
  hover   = false,
  padding = 'md',
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-xl border border-neutral-200 shadow-sm',
        hover && 'transition-all duration-300 cursor-pointer hover:shadow-md hover:-translate-y-1 hover:border-primary/30',
        onClick && 'cursor-pointer',
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

/** Kart içindeki görsel bölümü */
export function CardImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={cn('w-full object-cover', className)}
    />
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('mb-3', className)}>{children}</div>;
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('', className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('mt-4 pt-4 border-t border-neutral-100', className)}>{children}</div>;
}
