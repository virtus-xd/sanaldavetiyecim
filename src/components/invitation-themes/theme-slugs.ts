/**
 * Tema slug → key haritası, tema bileşenlerini import etmeyen sade versiyon.
 *
 * Server component'lerin sadece slug membership kontrolü için kullanması gerektiğinde
 * `themes.config.ts`'i (ve dolaylı olarak 10 client tema modülünü) çekmemesi için ayrılmıştır.
 *
 * `themes.config.ts` ile senkron tutulmalıdır.
 */

export const PREVIEW_SLUGS = [
  'klasik-lacivert',
  'bahar-cicekleri',
  'modern-minimal',
  'boho-doga',
  'romantik-gul',
  'kina-gecesi',
  'zarif-altin',
  'siyah-beyaz',
  'okyanus',
  'zerafet',
] as const;

export type PreviewSlug = (typeof PREVIEW_SLUGS)[number];

export function hasPreview(slug: string): boolean {
  return (PREVIEW_SLUGS as readonly string[]).includes(slug);
}
