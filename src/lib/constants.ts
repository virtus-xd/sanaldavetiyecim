/**
 * Uygulama genelinde kullanılan sabit değerler
 */

import type { EventType, TemplateStyle, OrderStatus } from '@/types';

// ─── Navigasyon ───────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: 'Ana Sayfa',      href: '/' },
  { label: 'Tasarımlar',     href: '/tasarimlar' },
  { label: 'Nasıl Çalışır',  href: '/nasil-calisir' },
  { label: 'Hakkımızda',     href: '/hakkimizda' },
  { label: 'İletişim',       href: '/iletisim' },
] as const;

// ─── Site Meta ────────────────────────────────────────────────────────────────

export const SITE_META = {
  name:        'Sanal Davetiyecim',
  domain:      'sanaldavetiyecim.com',
  url:         'https://sanaldavetiyecim.com',
  title:       'Sanal Davetiyecim — Dijital Davetiye Tasarımı',
  description:
    'Düğün, nişan, söz ve kına organizasyonlarınız için şık dijital davetiye siteleri hazırlıyoruz. Tek link ile tüm misafirlerinize ulaşın.',
  whatsapp:    '905551234567',
  email:       'info@sanaldavetiyecim.com',
  instagram:   'sanaldavetiyecim',
} as const;

export const WHATSAPP_URL = `https://wa.me/${SITE_META.whatsapp}?text=Merhaba%2C%20davetiye%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`;

// ─── Etkinlik Türleri ─────────────────────────────────────────────────────────

export const EVENT_TYPES: Record<EventType, string> = {
  dugun:  'Düğün',
  soz:    'Söz',
  nisan:  'Nişan',
  kina:   'Kına',
  ozel:   'Özel',
};

export const EVENT_TYPE_OPTIONS = Object.entries(EVENT_TYPES).map(
  ([value, label]) => ({ value: value as EventType, label })
);

// ─── Tasarım Stilleri ─────────────────────────────────────────────────────────

export const TEMPLATE_STYLES: Record<TemplateStyle, string> = {
  modern:     'Modern',
  klasik:     'Klasik',
  minimal:    'Minimal',
  romantik:   'Romantik',
  luks:       'Lüks',
  eglenceli:  'Eğlenceli',
};

export const TEMPLATE_STYLE_OPTIONS = Object.entries(TEMPLATE_STYLES).map(
  ([value, label]) => ({ value: value as TemplateStyle, label })
);

// ─── Sipariş Durumları ────────────────────────────────────────────────────────

export const ORDER_STATUSES: Record<OrderStatus, string> = {
  beklemede:    'Beklemede',
  hazirlaniyor: 'Hazırlanıyor',
  tamamlandi:   'Tamamlandı',
  iptal:        'İptal',
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  beklemede:    'bg-yellow-100 text-yellow-800',
  hazirlaniyor: 'bg-blue-100 text-blue-800',
  tamamlandi:   'bg-green-100 text-green-800',
  iptal:        'bg-red-100 text-red-800',
};

// ─── Sipariş Numarası Ön Eki ──────────────────────────────────────────────────

export const ORDER_NUMBER_PREFIX = 'SDC';
