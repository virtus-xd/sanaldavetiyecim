import type { InvitationData } from '@/components/invitation-themes/types';

/**
 * Tasarım canlı önizleme sayfasında kullanılan örnek davetiye verisi.
 * Tüm temalar bu sabit veriyi okur, kullanıcı kendi davetiyesi yerine
 * bir "demo" davetiyenin tam çalışan halini görür.
 */
export const sampleInvitation: InvitationData = {
  brideName:    'Ayşe',
  groomName:    'Mehmet',
  eventType:    'Evleniyoruz',
  topDecoration: 'Aşkımızı Kutluyoruz',

  dateStr:      '2026-08-15T19:00:00',
  dateDisplay:  '15 Ağustos 2026',
  timeDisplay:  'CUMARTESİ, SAAT 19:00',

  venue: {
    name:         'Beyaz Bahçe Düğün Davet',
    addressLine1: 'Örnek Mahallesi, Çiçek Caddesi No:1',
    addressLine2: 'Beşiktaş / İstanbul',
    city:         'Beşiktaş • İstanbul',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Be%C5%9Fikta%C5%9F+%C4%B0stanbul',
    googleMapsEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.7!2d29.0!3d41.04!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAyJzI0LjAiTiAyOcKwMDAnMDAuMCJF!5e0!3m2!1str!2str!4v1700000000000',
  },

  events: [
    {
      iconName:    'Clock',
      title:       'Karşılama',
      time:        '19:00',
      description: 'Misafirlerimizi karşılıyoruz, hoşgeldiniz kokteyli.',
    },
    {
      iconName:    'Heart',
      title:       'Nikah Töreni',
      time:        '20:00',
      description: 'Hayatımızın en özel anına tanıklık etmenizi diliyoruz.',
    },
    {
      iconName:    'Calendar',
      title:       'Yemek & Eğlence',
      time:        '21:00',
      description: 'Birlikte yer, dans eder, sabaha kadar kutlarız.',
    },
  ],

  footer: {
    message:       'Bu özel günde yanımızda olmanızı çok isteriz.',
    hashtag:       '#AyseMehmet2026',
    contactEmail:  'info@sanaldavetiyecim.com',
    instagramUrl:  'https://www.instagram.com/sanaldavetiyecim',
    emailUrl:      'mailto:info@sanaldavetiyecim.com',
    credits:       'Sanal Davetiyecim ile hazırlandı',
  },

  gallery: [
    '/themes/elegant/gallery-1.webp',
    '/themes/elegant/gallery-2.webp',
    '/themes/elegant/gallery-3.webp',
    '/themes/elegant/gallery-4.webp',
    '/themes/elegant/gallery-5.jpg',
    '/themes/elegant/gallery-6.jpg',
  ],
};
