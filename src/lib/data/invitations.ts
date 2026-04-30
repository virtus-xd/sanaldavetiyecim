/**
 * Davetiye veri dönüşüm katmanı — Order DB kaydını InvitationData formatına çevirir.
 */
import { createAdminClient } from '@/lib/supabase/server';
import { EVENT_TYPES } from '@/lib/constants';
import type { EventType } from '@/types';
import type { InvitationData } from '@/components/invitation-themes/types';
import {
  DEFAULT_THEME,
  SLUG_TO_THEME,
  THEME_REGISTRY,
  type ThemeKey,
} from '@/components/invitation-themes/themes.config';

/** theme_key DB alanı varsa doğrudan kullan, yoksa slug'dan eşle */
function resolveTheme(row: Record<string, unknown>): ThemeKey {
  const themeKey = row.theme_key;
  if (typeof themeKey === 'string' && themeKey in THEME_REGISTRY) {
    return themeKey as ThemeKey;
  }
  const slug = (row.slug as string) ?? '';
  return SLUG_TO_THEME[slug] ?? DEFAULT_THEME;
}

export interface InvitationPageData {
  invitationData: InvitationData;
  theme: ThemeKey;
}

/** Sipariş numarasına göre davetiye verisini getir */
export async function getInvitationByOrderNumber(orderNumber: string): Promise<InvitationPageData | null> {
  const supabase = createAdminClient();

  const { data: order, error } = await supabase
    .from('orders')
    .select('*, templates(slug, theme_key)')
    .eq('order_number', orderNumber.toUpperCase())
    .single();

  if (error || !order) return null;

  // Sadece tamamlanmış veya teslim URL'si olan siparişler gösterilir
  if (order.status !== 'tamamlandi' && !order.delivered_url) return null;

  const eventLabel = EVENT_TYPES[order.event_type as EventType] ?? order.event_type ?? '';
  const eventDate = new Date(order.event_date);

  const dateDisplay = eventDate.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const dayName = eventDate.toLocaleDateString('tr-TR', { weekday: 'long' }).toUpperCase();
  const timeStr = order.event_time
    ? `${dayName}, SAAT ${order.event_time.slice(0, 5)}`
    : dayName;

  const dateStr = order.event_time
    ? `${order.event_date}T${order.event_time}`
    : `${order.event_date}T00:00:00`;

  const invitationData: InvitationData = {
    brideName: order.bride_name ?? '',
    groomName: order.groom_name ?? '',
    eventType: eventLabel,
    topDecoration: eventLabel,
    dateStr,
    dateDisplay,
    timeDisplay: timeStr,
    venue: {
      name: order.event_venue ?? '',
      addressLine1: order.event_location ?? '',
      addressLine2: '',
      city: '',
      googleMapsUrl: order.event_location
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.event_venue + ' ' + order.event_location)}`
        : '',
      googleMapsEmbed: '',
    },
    events: [
      {
        iconName: 'Clock',
        title: 'Karşılama',
        time: order.event_time ? order.event_time.slice(0, 5) : '',
        description: 'Bu özel anımızda yanımızda olun.',
      },
      {
        iconName: 'Heart',
        title: eventLabel,
        time: order.event_time
          ? formatTimeOffset(order.event_time, 30)
          : '',
        description: 'Bol bol fotoğraf çekmeyi unutmayın!',
      },
      {
        iconName: 'Calendar',
        title: 'Kutlama',
        time: order.event_time
          ? formatTimeOffset(order.event_time, 60)
          : '',
        description: order.custom_message || 'Sizi de aramızda görmek istiyoruz!',
      },
    ],
    footer: {
      message: order.custom_message || 'Sizi de aramızda görmek istiyoruz!',
      hashtag: `#${(order.bride_name ?? '').replace(/\s/g, '')}${(order.groom_name ?? '').replace(/\s/g, '')}`,
      contactEmail: order.customer_email ?? '',
      instagramUrl: '#',
      emailUrl: `mailto:${order.customer_email ?? ''}`,
      credits: 'sanaldavetiyecim.com',
    },
  };

  const templateData = order.templates as Record<string, unknown> | null;
  const theme = templateData ? resolveTheme(templateData) : DEFAULT_THEME;

  return { invitationData, theme };
}

/** Saati dakika kadar ilerletir, "HH:MM" formatında döner */
function formatTimeOffset(time: string, minutesOffset: number): string {
  const [h, m] = time.split(':').map(Number);
  const totalMinutes = h * 60 + m + minutesOffset;
  const newH = Math.floor(totalMinutes / 60) % 24;
  const newM = totalMinutes % 60;
  return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
}
