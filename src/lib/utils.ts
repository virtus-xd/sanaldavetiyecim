/**
 * Genel yardımcı fonksiyonlar
 */

/** CSS class isimlerini birleştirir */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Fiyatı Türk lirası formatına çevirir */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style:    'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/** Tarihi Türkçe formatına çevirir */
export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('tr-TR', {
    day:   'numeric',
    month: 'long',
    year:  'numeric',
  }).format(new Date(dateStr));
}

/** Benzersiz sipariş numarası üretir (SDC-YYYY-XXXX) */
export function generateOrderNumber(): string {
  const year   = new Date().getFullYear();
  const random = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `SDC-${year}-${random}`;
}

/** Metni URL dostu slug'a çevirir (Türkçe karakter desteği) */
export function slugify(text: string): string {
  const turkishMap: Record<string, string> = {
    ç: 'c', Ç: 'c',
    ğ: 'g', Ğ: 'g',
    ı: 'i', İ: 'i',
    ö: 'o', Ö: 'o',
    ş: 's', Ş: 's',
    ü: 'u', Ü: 'u',
  };
  return text
    .split('')
    .map((char) => turkishMap[char] ?? char)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Telefon numarasını WhatsApp formatına çevirir */
export function toWhatsAppNumber(phone: string): string {
  return phone.replace(/\D/g, '').replace(/^0/, '90');
}
