/**
 * Temel TypeScript tip tanımları — sanaldavetiyecim.com
 */

// ─── Enum'lar ─────────────────────────────────────────────────────────────────

export type EventType = 'dugun' | 'soz' | 'nisan' | 'kina' | 'ozel';

export type TemplateCategory = EventType;

export type TemplateStyle =
  | 'modern'
  | 'klasik'
  | 'minimal'
  | 'romantik'
  | 'luks'
  | 'eglenceli';

export type OrderStatus =
  | 'beklemede'
  | 'hazirlaniyor'
  | 'tamamlandi'
  | 'iptal';

// ─── Modeller ─────────────────────────────────────────────────────────────────

/** Davetiye tasarım şablonu */
export interface Template {
  id: string;
  name: string;
  slug: string;
  category: TemplateCategory;
  style: TemplateStyle;
  previewImages: string[];
  description: string;
  price: number;
  isPopular: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Müşteri siparişi */
export interface Order {
  id: string;
  orderNumber: string;
  templateId: string | null;
  template?: Template;
  status: OrderStatus;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventType: EventType;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventVenue: string;
  groomName: string;
  brideName: string;
  customMessage: string;
  additionalNotes: string;
  totalPrice: number;
  deliveredUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

/** Sipariş formu verisi (çok adımlı form) */
export interface OrderFormData {
  // Adım 1 — Organizasyon bilgileri
  eventType: EventType;
  groomName: string;
  brideName: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  eventLocation: string;
  // Adım 2 — Tasarım tercihi
  templateId: string | null;
  customMessage: string;
  additionalNotes: string;
  // Adım 3 — İletişim bilgileri
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

/** Müşteri yorumu */
export interface Testimonial {
  id: string;
  customerName: string;
  eventType: string;
  comment: string;
  rating: number;
  isVisible: boolean;
  createdAt: string;
}

/** İletişim formu mesajı */
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

/** Site ayarları */
export interface SiteSettings {
  id: string;
  key: string;
  value: Record<string, unknown>;
  updatedAt: string;
}

// ─── API Yanıt Tipleri ────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
