# Sanal Davetiyecim - Proje Özeti ve AI Onboarding Rehberi

Bu belge, **Sanal Davetiyecim** projesinin yapısını, mimarisini ve kurallarını özetlemek için oluşturulmuştur. Yeni bir AI ajanı projeye dahil olduğunda, projenin tamamını taramak yerine öncelikle bu dosyayı okuyarak projeye anında hakim olabilir.

## 🛠️ Teknolojik Altyapı
- **Framework:** Next.js 16.2.1 (App Router, `proxy.ts` middleware)
- **UI Kütüphanesi:** React 19
- **Stil & Tasarım:** Tailwind CSS v4 (`@tailwindcss/postcss`), Framer Motion (Animasyonlar), Lucide React (İkonlar)
- **Veritabanı & Backend:** Supabase (`@supabase/ssr` & `@supabase/supabase-js`)
- **Form & Doğrulama:** React Hook Form + Zod
- **E-posta Servisi:** Resend (`resend` paketi)

## 📁 Proje Klasör Yapısı

### `src/` — Kaynak Kod
```text
src/
├── app/                       # Next.js App Router (Sayfalar ve API)
│   ├── (public)/              # Herkese açık sayfalar
│   │   ├── hakkimizda/        # Hakkımızda sayfası
│   │   ├── iletisim/          # İletişim sayfası
│   │   ├── nasil-calisir/     # Nasıl çalışır sayfası
│   │   ├── sikca-sorulan-sorular/  # SSS sayfası
│   │   ├── siparis/           # Sipariş formu sayfası
│   │   ├── siparis-sorgula/   # Sipariş sorgulama sayfası
│   │   └── tasarimlar/        # Şablon listeleme + [slug] detay sayfası
│   ├── admin/                 # Yönetim Paneli (auth korumalı)
│   │   ├── login/             # Admin giriş
│   │   ├── siparisler/        # Sipariş yönetimi
│   │   ├── tasarimlar/        # Şablon yönetimi
│   │   ├── mesajlar/          # İletişim mesajları
│   │   ├── yorumlar/          # Yorum yönetimi
│   │   └── ayarlar/           # Site ayarları
│   ├── api/                   # REST API endpoint'leri
│   │   ├── admin/             # Korumalı admin API'leri (orders, templates, messages, testimonials)
│   │   ├── contact/           # İletişim formu
│   │   ├── orders/            # Sipariş oluşturma + [orderNumber] sorgulama
│   │   └── templates/         # Şablon listeleme
│   └── davetiye/[slug]/       # Dinamik davetiye görüntüleme (müşteri paylaşım linki)
├── components/                # React bileşenleri (modüler yapı)
│   ├── admin/                 # Admin panel bileşenleri (sidebar, modal, row, badge vb.)
│   ├── home/                  # Ana sayfa seksiyonları (Hero, Features, HowItWorks, CTA, Testimonials, PopularTemplates)
│   ├── invitation-shared/     # Temalar arası ortak bileşenler (GlowEnvelopeLanding, MusicPlayer, CornerDecorations, Sparkles)
│   ├── invitation-themes/     # 🎨 Davetiye tema bileşenleri
│   │   ├── themes.config.ts   # ⭐ TEK KAYIT NOKTASI — tema ekleme/düzenleme buradan yapılır
│   │   ├── InvitationRenderer.tsx  # Tema seçimine göre doğru bileşenleri render eder
│   │   ├── InvitationContext.tsx   # Davetiye verisini tema bileşenlerine dağıtan React Context
│   │   ├── types.ts           # InvitationData, InvitationEvent, InvitationVenue tipleri
│   │   └── [tema-adı]/        # Her tema klasörü: HeroSection.tsx, EventDetailsSection.tsx, Footer.tsx
│   ├── order/                 # Çok adımlı sipariş formu (4 adım: Event → Design → Contact → Summary)
│   ├── templates/             # Şablon kartı ve galeri bileşenleri
│   ├── layout/                # Site layout bileşenleri (Header, Footer, MobileMenu, WhatsAppButton, PageTransition)
│   └── ui/                    # Temel UI bileşenleri (Button, Input, Modal, Card, Badge, Select, Textarea vb.)
├── hooks/                     # Custom hook'lar (useTemplates, useScrollAnimation)
├── lib/                       # Yardımcı fonksiyonlar ve servisler
│   ├── data/                  # Supabase CRUD fonksiyonları (orders, templates, contact, invitations, testimonials)
│   ├── email/                 # Resend e-posta gönderimi + HTML şablonları (sipariş onay, admin bildirim, teslimat, ödeme)
│   ├── supabase/              # Supabase client (client.ts) ve server (server.ts) başlatma
│   ├── constants.ts           # Site meta, nav linkleri, enum etiketleri, banka bilgileri
│   ├── mock-data.ts           # Geliştirme ortamı mock verileri (Supabase olmadan test)
│   ├── utils.ts               # Genel yardımcı fonksiyonlar
│   └── validations.ts         # Zod form doğrulama şemaları
├── types/index.ts             # TypeScript tip tanımları (Template, Order, Testimonial, ContactMessage vb.)
└── proxy.ts                   # Auth middleware (admin route koruması, Supabase session kontrolü)
```

### `public/` — Statik Dosyalar
```text
public/
├── favicon.ico
├── images/                    # Genel site görselleri
│   └── site-tasarimlar.png
└── themes/                    # 🎨 Tüm tema görselleri (asset + preview, temaya göre gruplu)
    ├── _shared/               # Temalar arası ortak dosyalar
    │   └── music.mp3
    ├── classic/               # Her tema kendi klasöründe
    │   ├── envelope.png       # Zarf görseli (desktop)
    │   ├── envelope-mobile.jpg  # Zarf görseli (mobil, varsa)
    │   ├── preview-cover.png  # Şablon vitrin görseli
    │   ├── preview-full.png   # Tam sayfa ekran görüntüsü
    │   ├── preview-section-1.png ... preview-section-3.png
    │   ├── preview-etkinlik.png
    │   └── preview-mekan.png
    ├── floral/
    │   ├── bg.png             # Tema arka plan görseli
    │   ├── envelope.png
    │   └── preview-*.png
    ├── modern/
    ├── starry/
    ├── vintage/
    ├── autumn/
    ├── rustic/
    ├── gatsby/
    ├── ocean/
    └── flowers-pink/
        ├── bg.png
        ├── envelope.png
        ├── envelope-mobile.png
        ├── zerafet-cover.png      # İleride kullanılacak
        └── zerafet-section_1.png  # İleride kullanılacak
```

### Diğer Kök Dizin Dosyaları
```text
├── supabase/migrations/       # Veritabanı migration SQL dosyaları (001-005)
├── scripts/                   # Yardımcı scriptler (capture_all_themes.py)
├── docs/superpowers/          # Admin template editing planları ve tasarım dokümanları
├── .env.example               # Ortam değişkenleri şablonu (Supabase, Resend, Site URL)
├── next.config.ts             # Next.js yapılandırması (security headers, image patterns)
└── AI_ONBOARDING.md           # Bu dosya
```

## 🧠 Temel Veri Modelleri (`src/types/index.ts`)
| Model | Açıklama |
|-------|----------|
| **Template** | Davetiye tasarım şablonu. Fiyat, popülerlik, preview görselleri, slug |
| **Order** | Müşteri siparişi. Çiftin bilgileri, etkinlik detayları, ödeme/sipariş durumu, `templateId` |
| **Testimonial** | Kullanıcı yorumları (rating, görünürlük) |
| **ContactMessage** | İletişim formu mesajları |
| **OrderFormData** | Çok adımlı sipariş formu veri yapısı |

## 🔑 Önemli Mimari Kararlar ve İş Akışları

### Sipariş Akışı
`/siparis` → 4 adımlı form (`OrderForm`) → Zod doğrulama → `/api/orders` POST → Supabase INSERT → Resend e-posta bildirimleri (müşteri onay + admin bildirim)

### Davetiye Gösterimi
`/davetiye/[slug]` → Supabase'den sipariş + tema verisi → `InvitationRenderer.tsx`:
1. İlk açılışta **GlowEnvelopeLanding** (zarf animasyonu + müzik başlatma)
2. Zarfa tıklayınca → **Hero** → **EventDetails** → **Footer** sırasıyla render

### Yeni Tema Ekleme (3 Adım)
1. `src/components/invitation-themes/[yeni-tema]/` altına `HeroSection.tsx`, `EventDetailsSection.tsx`, `Footer.tsx` oluştur
2. `public/themes/[yeni-tema]/` altına `envelope.png` (ve isteğe bağlı `bg.png`) koy
3. `src/components/invitation-themes/themes.config.ts` → `THEME_REGISTRY`'ye yeni blok ekle

### API Yapısı
- **Public API:** `/api/orders`, `/api/templates`, `/api/contact` — herkes erişebilir
- **Admin API:** `/api/admin/*` — `proxy.ts` ile Supabase Auth koruması altında

## 🤖 Yeni Agent İçin Çalışma Prensipleri
- **Tema görselleri:** Her zaman `public/themes/[tema-adı]/` altında. Yol formatı: `/themes/[key]/envelope.png`, `/themes/[key]/bg.png`, `/themes/[key]/preview-cover.png`
- **Ortak davetiye bileşenleri:** `src/components/invitation-shared/` (zarf, müzik, dekorasyon)
- **Temel UI değişiklikleri:** `src/components/ui/` dizini
- **Tip güvenliği:** Yeni model → `src/types/index.ts`, Yeni form → `src/lib/validations.ts`
- **Veritabanı işlemleri:** `src/lib/data/` fonksiyonları veya `src/app/api/` route'ları üzerinden
- **Stil:** Tailwind CSS v4 — `src/app/globals.css` üzerinden yönetilir
- **Auth:** `src/proxy.ts` admin koruması, `src/lib/supabase/` client/server ayarları

---
*Son güncelleme: 2026-04-30 — Klasör yapısı refactoring sonrası*
