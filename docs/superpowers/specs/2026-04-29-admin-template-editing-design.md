# Admin Tasarım Düzenleme — Tasarım Dokümanı

**Tarih:** 2026-04-29
**Konu:** Admin panelindeki "Tasarımlar" sayfasını fonksiyonel hale getirme — fiyat ve diğer alanları düzenleyebilme.

## Amaç

Admin paneldeki `/admin/tasarimlar` sayfası şu anda salt okunur. Sadece `is_active` ve `is_popular` toggle'ları çalışıyor. Bu spec, mevcut tasarımların temel alanlarını (fiyat dahil) admin panelden düzenleyebilmeyi tarif eder.

## Kapsam

### Düzenlenebilir alanlar
- `name` (metin)
- `description` (metin)
- `category` — `EVENT_TYPES` enum: `dugun | soz | nisan | kina | ozel`
- `style` — `TEMPLATE_STYLES` enum: `modern | klasik | minimal | romantik | luks | eglenceli`
- `price` (decimal, ≥ 0)
- `is_popular` (zaten toggle olarak var, modalda da düzenlenebilir)
- `is_active` (zaten toggle olarak var, modalda da düzenlenebilir)

### Salt okunur (modalda gösterilir, düzenlenmez)
- `slug`
- `theme_key`
- `preview_images`

### Kapsam dışı
- Yeni tasarım ekleme — kod/migration ile yapılır, sonraki iyileştirmeye bırakıldı.
- Tasarım silme — `is_active=false` ile karşılanır (soft-delete). Ayrı silme tuşu yok.
- `slug` / `theme_key` / `preview_images` düzenleme — kod tarafında yapılır; her şablon `src/components/invitation-themes/` altındaki bir renderer'a bağlı olduğu için panelden değiştirmek tutarsızlık riski doğurur.
- Supabase Storage entegrasyonu / görsel upload.

## UX

Mevcut `/admin/tasarimlar` tablosu olduğu gibi korunur. Eklenenler:

1. Her satıra **"Düzenle"** butonu (tablo sonunda yeni bir sütun veya mevcut sütun yapısına entegre).
2. Düzenle butonu **modal** açar. Modal `OrderDetailModal` ile tutarlı bir yapıda:
   - Form alanları yukarıda listelenen düzenlenebilir alanlar.
   - Salt okunur bilgi bloğu: slug, theme_key, preview thumbnail.
   - Aksiyonlar: **Kaydet** (PATCH) ve **İptal**.
3. Mevcut toggle'lar tabloda kalır — hızlı erişim için. Modal "tam düzenleme" senaryosu içindir.

## Bileşenler ve Dosya Değişiklikleri

### Yeni dosyalar

**`src/components/admin/EditTemplateModal.tsx`** (client component)
- Props: `template` (mevcut kayıt), `open`, `onClose`.
- State: kontrollü form alanları + `loading` + `error`.
- Submit: `PATCH /api/admin/templates/[id]` ile sadece değişen alanları gönderir; başarıda modal kapanır ve `router.refresh()` çağrılır.
- Read-only blok: `slug`, `theme_key`, `preview_images[0]` thumbnail.
- Form alanları: name (text), description (textarea), category (select), style (select), price (number, step=0.01, min=0), is_popular (checkbox), is_active (checkbox).
- Kategori/stil select seçenekleri için `EVENT_TYPE_OPTIONS` ve `TEMPLATE_STYLE_OPTIONS` (constants.ts'de zaten mevcut).

**`src/components/admin/TemplateRow.tsx`** (client component)
- Tablo satırını wrap eder. Modal state'ini barındırır.
- Mevcut `TemplateToggle` bileşenlerini ve preview/text hücrelerini içerir.
- Sonda yeni "Düzenle" butonu — modal'ı açar.

### Değiştirilecek dosyalar

**`src/app/admin/tasarimlar/page.tsx`**
- Tablo `<tbody>` içeriği `TemplateRow` bileşenine taşınır.
- Tablo başlığına "Düzenle" sütunu eklenir (en sağda).
- Sayfa server component olarak kalmaya devam eder.

**`src/app/api/admin/templates/[id]/route.ts`**
- PATCH handler whitelist'i genişletilir.
- İzinli alanlar: `is_active`, `is_popular`, `name`, `description`, `category`, `style`, `price`.
- Doğrulamalar:
  - `name`: string ve `trim().length > 0`.
  - `description`: string (boş olabilir).
  - `category`: `EVENT_TYPES` anahtarlarından biri.
  - `style`: `TEMPLATE_STYLES` anahtarlarından biri.
  - `price`: sonlu sayı, ≥ 0.
  - `is_active`, `is_popular`: boolean.
- Geçersiz alan → 400 + hatalı alanı belirten hata mesajı.
- Bilinmeyen alanlar sessizce yok sayılır (mevcut davranış korunur).
- Yetkilendirme kontrolü (`verifyAdminSession`) korunur.

## Veri Akışı

```
[Admin tablo satırı] -- click "Düzenle" --> [TemplateRow modal state'i açar]
[EditTemplateModal] -- form submit --> PATCH /api/admin/templates/:id
[API] -- whitelist + validate --> [Supabase update] -> 200/400/500
[Modal] -- başarıda --> close + router.refresh()
[Sayfa] -> yeniden render, güncel veriler
```

## Hata Yönetimi

- API tarafında doğrulama hatası: 400 + `{ error: "<alan> geçersiz" }`.
- Supabase hatası: 500 + `{ error: <message> }` (mevcut davranış).
- Modal tarafında hata: form üstünde kırmızı uyarı banner'ı; submit butonu enable kalır (kullanıcı düzeltip tekrar deneyebilir).
- Network hatası: aynı banner'da generic mesaj.

## Test / Doğrulama

Manuel test akışı (UI olduğu için):
1. Admin login → `/admin/tasarimlar` aç.
2. Bir satırda Düzenle → modal açılır, mevcut değerler doludur.
3. Fiyatı değiştir → Kaydet → tabloda yeni fiyat görünür.
4. Kategori/stil değiştir → tabloda yeni etiket görünür.
5. Boş `name` ile kaydet → 400 + modal hatası.
6. Geçersiz `price` (negatif) ile kaydet → 400.
7. Mevcut `is_active`/`is_popular` toggle'ları hâlâ çalışır.
8. `slug`, `theme_key`, preview görseli modal içinde salt okunur olarak doğru gösterilir.

## YAGNI / Bilinçli Kapsam Dışı

- Aynı anda toplu düzenleme (bulk edit) yok.
- Audit log / değişiklik geçmişi yok.
- Optimistik UI güncellemesi yok — `router.refresh()` yeterli, mevcut toggle pattern ile tutarlı.
- Form alanlarında inline canlı önizleme yok.
