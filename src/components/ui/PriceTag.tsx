import { formatPrice } from '@/lib/utils';
import { CAMPAIGN, campaignDiscountPercent } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface PriceTagProps {
  price:    number;
  variant?: 'card' | 'detail';
  className?: string;
}

export function PriceTag({ price, variant = 'card', className }: PriceTagProps) {
  const showCampaign = CAMPAIGN.enabled && CAMPAIGN.originalPrice > price;

  if (variant === 'detail') {
    return (
      <div className={cn('flex flex-col gap-2', className)}>
        {showCampaign && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
              {CAMPAIGN.label}
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold">
              %{campaignDiscountPercent(price)} İndirim
            </span>
          </div>
        )}
        <div className="flex items-baseline gap-3">
          {showCampaign && (
            <span className="text-lg text-neutral-400 line-through">
              {formatPrice(CAMPAIGN.originalPrice)}
            </span>
          )}
          <span className="font-display text-3xl md:text-4xl font-bold text-primary">
            {formatPrice(price)}
          </span>
        </div>
        {showCampaign && (
          <p className="text-xs text-neutral-500">{CAMPAIGN.shortNote}</p>
        )}
      </div>
    );
  }

  // 'card' variant — kompakt, tek satır
  return (
    <span className={cn('inline-flex items-baseline gap-1.5 shrink-0', className)}>
      {showCampaign && (
        <span className="text-xs text-neutral-400 line-through">
          {formatPrice(CAMPAIGN.originalPrice)}
        </span>
      )}
      <span className="font-bold text-primary">{formatPrice(price)}</span>
    </span>
  );
}
