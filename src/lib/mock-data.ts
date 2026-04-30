/**
 * Geliştirme aşamasında kullanılan mock veriler.
 * Faz 6'da Supabase gerçek verisiyle değiştirilecek.
 */
import type { Template, Testimonial } from '@/types';

export const mockTemplates: Template[] = [
  {
    id:            '1',
    name:          'Zarif Altın',
    slug:          'zarif-altin',
    previewImages: [
      '/themes/classic/preview-cover.png',
      '/themes/classic/preview-section-1.png',
    ],
    description:
      'Altın ve krem tonlarında, zarif çiçek motifleri ile süslenmiş lüks düğün davetiyesi. Her detayda incelik taşır.',
    price:     299,
    isPopular: true,
    isActive:  true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id:            '2',
    name:          'Modern Minimal',
    slug:          'modern-minimal',
    previewImages: [
      '/themes/modern/preview-cover.png',
      '/themes/modern/preview-section-1.png',
    ],
    description:
      'Sade çizgiler ve beyaz alan kullanımıyla tasarlanmış modern minimalist davetiye. Şıklık sadelikte saklıdır.',
    price:     199,
    isPopular: true,
    isActive:  true,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
  {
    id:            '3',
    name:          'Romantik Gül',
    slug:          'romantik-gul',
    previewImages: [
      '/themes/floral/preview-cover.png',
      '/themes/floral/preview-section-1.png',
    ],
    description:
      'Pembe gül motifleri ve yumuşak renk geçişleriyle bezeli romantik nişan davetiyesi.',
    price:     249,
    isPopular: true,
    isActive:  true,
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
  },
  {
    id:            '4',
    name:          'Klasik Lacivert',
    slug:          'klasik-lacivert',
    previewImages: [
      '/themes/starry/preview-cover.png',
      '/themes/starry/preview-section-1.png',
    ],
    description:
      'Lacivert ve altın rengi uyumuyla hazırlanmış klasik ve zamansız düğün davetiyesi.',
    price:     279,
    isPopular: false,
    isActive:  true,
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-04T00:00:00Z',
  },
  {
    id:            '5',
    name:          'Bahar Çiçekleri',
    slug:          'bahar-cicekleri',
    previewImages: [
      '/themes/vintage/preview-cover.png',
      '/themes/vintage/preview-section-1.png',
    ],
    description:
      'Renkli bahar çiçekleri ve pastel tonlarla hazırlanmış neşeli söz davetiyesi.',
    price:     219,
    isPopular: true,
    isActive:  true,
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
  },
  {
    id:            '6',
    name:          'Kına Gecesi',
    slug:          'kina-gecesi',
    previewImages: [
      '/themes/autumn/preview-cover.png',
      '/themes/autumn/preview-section-1.png',
    ],
    description:
      'Kırmızı, turuncu ve altın renklerinin dansıyla hazırlanan coşkulu kına gecesi davetiyesi.',
    price:     189,
    isPopular: false,
    isActive:  true,
    createdAt: '2024-01-06T00:00:00Z',
    updatedAt: '2024-01-06T00:00:00Z',
  },
  {
    id:            '7',
    name:          'Boho Doğa',
    slug:          'boho-doga',
    previewImages: [
      '/themes/rustic/preview-cover.png',
      '/themes/rustic/preview-section-1.png',
    ],
    description:
      'Doğa temalı, pamuk çiçekleri ve yeşil yaprak motifleriyle süslenmiş boho düğün davetiyesi.',
    price:     259,
    isPopular: true,
    isActive:  true,
    createdAt: '2024-01-07T00:00:00Z',
    updatedAt: '2024-01-07T00:00:00Z',
  },
  {
    id:            '8',
    name:          'Siyah & Beyaz',
    slug:          'siyah-beyaz',
    previewImages: [
      '/themes/gatsby/preview-cover.png',
      '/themes/gatsby/preview-section-1.png',
    ],
    description:
      'Siyah-beyaz kontrast ve geometrik desenlerle hazırlanmış çarpıcı modern düğün davetiyesi.',
    price:     229,
    isPopular: false,
    isActive:  true,
    createdAt: '2024-01-08T00:00:00Z',
    updatedAt: '2024-01-08T00:00:00Z',
  },
];

export const mockTestimonials: Testimonial[] = [
  {
    id:           '1',
    customerName: 'Ayşe & Mehmet',
    eventType:    'Düğün',
    comment:
      'Davetiyemiz gerçekten mükemmeldi! Tüm misafirlerimiz ne kadar şık olduğunu söyledi. Hızlı teslimat ve özenli hizmet için çok teşekkürler.',
    rating:    5,
    isVisible: true,
    createdAt: '2024-03-15T00:00:00Z',
  },
  {
    id:           '2',
    customerName: 'Zeynep & Ali',
    eventType:    'Nişan',
    comment:
      'Nişan davetiyemizi çok beğendik. Tasarım tam istediğimiz gibiydi ve linki paylaşmak çok kolaydi. Kesinlikle tavsiye ederim!',
    rating:    5,
    isVisible: true,
    createdAt: '2024-03-20T00:00:00Z',
  },
  {
    id:           '3',
    customerName: 'Elif & Burak',
    eventType:    'Düğün',
    comment:
      'Harika bir hizmet aldık. Özel isteklerimizi dikkate alarak benzersiz bir davetiye hazırladılar. Fiyat/performans çok iyi.',
    rating:    5,
    isVisible: true,
    createdAt: '2024-04-01T00:00:00Z',
  },
  {
    id:           '4',
    customerName: 'Selin & Emre',
    eventType:    'Söz',
    comment:
      'Söz törenimiz için hazırlanan davetiye tam hayalimizdekileydi. Gece çok güzel geçti, teşekkürler!',
    rating:    4,
    isVisible: true,
    createdAt: '2024-04-10T00:00:00Z',
  },
  {
    id:           '5',
    customerName: 'Fatma & Kaan',
    eventType:    'Kına',
    comment:
      'Kına gecesi davetiyeleri rengarenk ve eğlenceli oldu. Misafirlerimiz çok beğendi, teşekkürler!',
    rating:    5,
    isVisible: true,
    createdAt: '2024-04-18T00:00:00Z',
  },
];

/** Popüler şablonları döndürür */
export function getPopularTemplates(): Template[] {
  return mockTemplates.filter((t) => t.isPopular && t.isActive);
}

/** Slug'a göre şablon döndürür */
export function getTemplateBySlug(slug: string): Template | undefined {
  return mockTemplates.find((t) => t.slug === slug);
}

/** Tüm aktif şablonları döndürür */
export function getTemplates(): Template[] {
  return mockTemplates.filter((t) => t.isActive);
}
