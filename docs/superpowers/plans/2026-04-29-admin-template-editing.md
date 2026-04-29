# Admin Tasarım Düzenleme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Admin paneldeki `/admin/tasarimlar` sayfasında her tasarım için "Düzenle" butonu üzerinden açılan bir modal ile `name`, `description`, `category`, `style`, `price`, `is_popular`, `is_active` alanlarının düzenlenebilmesini sağla.

**Architecture:** Mevcut server-rendered tablo korunur. Her satır artık client component olan `TemplateRow` ile render edilir; bu component modal state'i barındırır ve `EditTemplateModal`'ı açar. Modal `PATCH /api/admin/templates/[id]`'e istek atar; API tarafında whitelist + tip/enum doğrulaması yapılır. Görsel/slug/theme_key salt okunur olarak gösterilir.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Supabase (admin client), Tailwind v4, Framer Motion (mevcut Modal). Test framework yok — doğrulama için `npm run lint`, `npm run build` ve manuel smoke test.

**Spec:** `docs/superpowers/specs/2026-04-29-admin-template-editing-design.md`

---

## File Structure

**Yeni dosyalar:**
- `src/components/admin/EditTemplateModal.tsx` — modal + form (client)
- `src/components/admin/TemplateRow.tsx` — tablo satırı + modal state (client)

**Değiştirilecek dosyalar:**
- `src/app/admin/tasarimlar/page.tsx` — `<tbody>` içinde `TemplateRow` kullan, başlığa "Düzenle" sütunu ekle
- `src/app/api/admin/templates/[id]/route.ts` — PATCH whitelist + doğrulama genişletilir

---

## Task 1: API — PATCH handler whitelist ve doğrulama

**Files:**
- Modify: `src/app/api/admin/templates/[id]/route.ts`

- [ ] **Step 1: Mevcut handler'ı oku**

`src/app/api/admin/templates/[id]/route.ts` dosyasının mevcut hali şu şekilde:

```ts
import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient, verifyAdminSession } from '@/lib/supabase/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const updates: Record<string, unknown> = {};
  if (body.is_active  !== undefined) updates.is_active  = body.is_active;
  if (body.is_popular !== undefined) updates.is_popular = body.is_popular;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from('templates')
    .update(updates)
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
```

- [ ] **Step 2: Handler'ı whitelist + doğrulama ile değiştir**

Dosyanın tamamını şu içerikle değiştir:

```ts
import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient, verifyAdminSession } from '@/lib/supabase/server';
import { EVENT_TYPES, TEMPLATE_STYLES } from '@/lib/constants';

const VALID_CATEGORIES = Object.keys(EVENT_TYPES);
const VALID_STYLES     = Object.keys(TEMPLATE_STYLES);

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body   = await request.json();

  const updates: Record<string, unknown> = {};

  // Boolean alanlar
  if (body.is_active !== undefined) {
    if (typeof body.is_active !== 'boolean') {
      return NextResponse.json({ error: 'is_active boolean olmalı' }, { status: 400 });
    }
    updates.is_active = body.is_active;
  }
  if (body.is_popular !== undefined) {
    if (typeof body.is_popular !== 'boolean') {
      return NextResponse.json({ error: 'is_popular boolean olmalı' }, { status: 400 });
    }
    updates.is_popular = body.is_popular;
  }

  // name (zorunlu, boş değil)
  if (body.name !== undefined) {
    if (typeof body.name !== 'string' || body.name.trim().length === 0) {
      return NextResponse.json({ error: 'name boş olamaz' }, { status: 400 });
    }
    updates.name = body.name.trim();
  }

  // description (boş olabilir)
  if (body.description !== undefined) {
    if (typeof body.description !== 'string') {
      return NextResponse.json({ error: 'description metin olmalı' }, { status: 400 });
    }
    updates.description = body.description;
  }

  // category (enum)
  if (body.category !== undefined) {
    if (typeof body.category !== 'string' || !VALID_CATEGORIES.includes(body.category)) {
      return NextResponse.json({ error: 'category geçersiz' }, { status: 400 });
    }
    updates.category = body.category;
  }

  // style (enum)
  if (body.style !== undefined) {
    if (typeof body.style !== 'string' || !VALID_STYLES.includes(body.style)) {
      return NextResponse.json({ error: 'style geçersiz' }, { status: 400 });
    }
    updates.style = body.style;
  }

  // price (≥ 0 sonlu sayı)
  if (body.price !== undefined) {
    const n = Number(body.price);
    if (!Number.isFinite(n) || n < 0) {
      return NextResponse.json({ error: 'price geçersiz' }, { status: 400 });
    }
    updates.price = n;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from('templates')
    .update(updates)
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
```

- [ ] **Step 3: Lint kontrolü**

Run: `npm run lint -- src/app/api/admin/templates/[id]/route.ts`
Expected: hata yok (uyarı varsa düzelt veya görmezden gel — yeni hata olmamalı).

- [ ] **Step 4: Build kontrolü**

Run: `npm run build`
Expected: başarılı build. TypeScript hatası gelirse düzelt.

- [ ] **Step 5: Commit**

```bash
git add src/app/api/admin/templates/[id]/route.ts
git commit -m "feat(admin/templates): expand PATCH whitelist with name/desc/category/style/price"
```

---

## Task 2: EditTemplateModal bileşeni

**Files:**
- Create: `src/components/admin/EditTemplateModal.tsx`

- [ ] **Step 1: Yeni dosyayı oluştur**

Dosyayı şu içerikle oluştur:

```tsx
'use client';

/**
 * Tasarım düzenleme modalı — name, description, category, style, price,
 * is_popular, is_active alanlarını günceller. slug, theme_key, preview
 * görsel salt okunur olarak gösterilir.
 */
import { useState }    from 'react';
import { useRouter }   from 'next/navigation';
import { Modal }       from '@/components/ui/Modal';
import { Button }      from '@/components/ui/Button';
import { Input }       from '@/components/ui/Input';
import { Select }      from '@/components/ui/Select';
import { Textarea }    from '@/components/ui/Textarea';
import { EVENT_TYPE_OPTIONS, TEMPLATE_STYLE_OPTIONS } from '@/lib/constants';
import type { EventType, TemplateStyle } from '@/types';

interface TemplateRecord {
  id:             string;
  name:           string;
  slug:           string;
  description:    string | null;
  category:       EventType;
  style:          TemplateStyle;
  price:          number | string;
  is_active:      boolean;
  is_popular:     boolean;
  theme_key:      string | null;
  preview_images: string[] | null;
}

interface EditTemplateModalProps {
  template: TemplateRecord;
  open:     boolean;
  onClose:  () => void;
}

export function EditTemplateModal({ template, open, onClose }: EditTemplateModalProps) {
  const router = useRouter();

  const [name,        setName]        = useState(template.name);
  const [description, setDescription] = useState(template.description ?? '');
  const [category,    setCategory]    = useState<EventType>(template.category);
  const [style,       setStyle]       = useState<TemplateStyle>(template.style);
  const [price,       setPrice]       = useState<string>(String(template.price));
  const [isActive,    setIsActive]    = useState(template.is_active);
  const [isPopular,   setIsPopular]   = useState(template.is_popular);

  const [saving, setSaving] = useState(false);
  const [error,  setError]  = useState<string | null>(null);

  const previewSrc = template.preview_images?.[0] ?? null;

  const handleSave = async () => {
    setError(null);

    if (name.trim().length === 0) {
      setError('İsim boş olamaz');
      return;
    }
    const priceNum = Number(price);
    if (!Number.isFinite(priceNum) || priceNum < 0) {
      setError('Fiyat geçersiz');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/templates/${template.id}`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          name:        name.trim(),
          description: description,
          category,
          style,
          price:       priceNum,
          is_active:   isActive,
          is_popular:  isPopular,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error ?? 'Kaydedilemedi');
        setSaving(false);
        return;
      }

      setSaving(false);
      onClose();
      router.refresh();
    } catch {
      setError('Bağlantı hatası');
      setSaving(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={`Tasarım: ${template.name}`} size="xl">
      <div className="space-y-5">
        {/* Salt okunur bilgi bloğu */}
        <div className="flex gap-4 p-3 rounded-lg bg-neutral-50 border border-neutral-100">
          {previewSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewSrc}
              alt={template.name}
              className="w-16 h-16 rounded-lg object-cover shrink-0"
            />
          )}
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs flex-1">
            <div>
              <span className="text-neutral-400">Slug</span>
              <p className="text-neutral-700 font-medium">{template.slug}</p>
            </div>
            <div>
              <span className="text-neutral-400">Tema</span>
              <p className="text-neutral-700 font-medium">{template.theme_key ?? '—'}</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700" role="alert">
            {error}
          </div>
        )}

        <Input
          label="İsim"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Textarea
          label="Açıklama"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Kategori"
            value={category}
            onChange={(e) => setCategory(e.target.value as EventType)}
            options={EVENT_TYPE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          />
          <Select
            label="Stil"
            value={style}
            onChange={(e) => setStyle(e.target.value as TemplateStyle)}
            options={TEMPLATE_STYLE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          />
        </div>

        <Input
          label="Fiyat (TL)"
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-4 w-4 rounded border-neutral-300"
            />
            Aktif
          </label>
          <label className="flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
            <input
              type="checkbox"
              checked={isPopular}
              onChange={(e) => setIsPopular(e.target.checked)}
              className="h-4 w-4 rounded border-neutral-300"
            />
            Popüler
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-2 border-t border-neutral-100">
          <Button variant="outline" onClick={onClose} disabled={saving}>
            İptal
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Kaydediliyor…' : 'Kaydet'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
```

- [ ] **Step 2: Lint + build**

Run: `npm run lint`
Expected: yeni dosya için hata yok.

Run: `npm run build`
Expected: başarılı build.

- [ ] **Step 3: Commit**

```bash
git add src/components/admin/EditTemplateModal.tsx
git commit -m "feat(admin/templates): add EditTemplateModal component"
```

---

## Task 3: TemplateRow bileşeni

**Files:**
- Create: `src/components/admin/TemplateRow.tsx`

- [ ] **Step 1: Yeni dosyayı oluştur**

```tsx
'use client';

/**
 * Admin tasarımlar tablosu için tek satır — toggle'lar ve "Düzenle" butonu;
 * butona basıldığında EditTemplateModal açılır.
 */
import { useState } from 'react';
import { Pencil }   from 'lucide-react';
import { TemplateToggle }     from './TemplateToggle';
import { EditTemplateModal }  from './EditTemplateModal';
import { formatPrice }        from '@/lib/utils';
import { EVENT_TYPES, TEMPLATE_STYLES } from '@/lib/constants';
import type { EventType, TemplateStyle } from '@/types';

interface TemplateRecord {
  id:             string;
  name:           string;
  slug:           string;
  description:    string | null;
  category:       EventType;
  style:          TemplateStyle;
  price:          number | string;
  is_active:      boolean;
  is_popular:     boolean;
  theme_key:      string | null;
  preview_images: string[] | null;
}

interface TemplateRowProps {
  template: TemplateRecord;
}

export function TemplateRow({ template }: TemplateRowProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr className="hover:bg-neutral-50 transition-colors">
        <td className="px-4 py-3">
          <div className="flex items-center gap-3">
            {template.preview_images?.[0] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={template.preview_images[0]}
                alt={template.name}
                className="w-10 h-10 rounded-lg object-cover shrink-0"
              />
            )}
            <div>
              <p className="font-medium text-neutral-800">{template.name}</p>
              <p className="text-xs text-neutral-400">{template.slug}</p>
            </div>
          </div>
        </td>
        <td className="px-4 py-3 text-neutral-500 hidden sm:table-cell">
          {EVENT_TYPES[template.category]}
        </td>
        <td className="px-4 py-3 text-neutral-500 hidden md:table-cell">
          {TEMPLATE_STYLES[template.style]}
        </td>
        <td className="px-4 py-3 text-right font-medium text-neutral-700">
          {formatPrice(Number(template.price))}
        </td>
        <td className="px-4 py-3 text-center">
          <TemplateToggle id={template.id} field="is_active" value={template.is_active} />
        </td>
        <td className="px-4 py-3 text-center">
          <TemplateToggle id={template.id} field="is_popular" value={template.is_popular} />
        </td>
        <td className="px-4 py-3 text-center">
          <button
            onClick={() => setOpen(true)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-primary hover:bg-primary/5 transition-colors"
            aria-label="Tasarımı düzenle"
          >
            <Pencil size={15} />
          </button>
        </td>
      </tr>

      <EditTemplateModal
        template={template}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
```

- [ ] **Step 2: Lint + build**

Run: `npm run lint`
Expected: hata yok.

Run: `npm run build`
Expected: başarılı build.

- [ ] **Step 3: Commit**

```bash
git add src/components/admin/TemplateRow.tsx
git commit -m "feat(admin/templates): add TemplateRow with edit modal trigger"
```

---

## Task 4: Admin tasarımlar sayfasına entegrasyon

**Files:**
- Modify: `src/app/admin/tasarimlar/page.tsx`

- [ ] **Step 1: Sayfayı yeni hâliyle değiştir**

Tüm dosyayı şu içerikle değiştir:

```tsx
/**
 * Admin — Tasarım Yönetimi
 */
import type { Metadata } from 'next';
import { createAdminClient } from '@/lib/supabase/server';
import { TemplateRow } from '@/components/admin/TemplateRow';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Tasarımlar — Admin' };

export default async function AdminTasarimlarPage() {
  const supabase = createAdminClient();
  const { data: templates } = await supabase
    .from('templates')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-5xl space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-neutral-800">Tasarımlar</h1>
        <span className="text-sm text-neutral-400">{templates?.length ?? 0} tasarım</span>
      </div>

      <div className="bg-white rounded-xl border border-neutral-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-400 uppercase">Tasarım</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-400 uppercase hidden sm:table-cell">Kategori</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-400 uppercase hidden md:table-cell">Stil</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-neutral-400 uppercase">Fiyat</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-neutral-400 uppercase">Aktif</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-neutral-400 uppercase">Popüler</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-neutral-400 uppercase">Düzenle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {(!templates || templates.length === 0) ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-sm text-neutral-400">
                    Tasarım bulunamadı.
                  </td>
                </tr>
              ) : (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (templates as any[]).map((t) => (
                  <TemplateRow key={t.id} template={t} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Lint + build**

Run: `npm run lint`
Expected: hata yok.

Run: `npm run build`
Expected: başarılı build. Sayfa server component olarak kalır, `TemplateRow` client component olarak hidrate edilir.

- [ ] **Step 3: Commit**

```bash
git add src/app/admin/tasarimlar/page.tsx
git commit -m "feat(admin/templates): wire TemplateRow + edit modal into list page"
```

---

## Task 5: Manuel smoke test

Bu görevde otomatik test çalıştırılmaz. UI üzerinden manuel doğrulama yap.

- [ ] **Step 1: Dev server'ı başlat**

Run: `npm run dev`
Expected: `http://localhost:3000` üzerinde çalışır.

- [ ] **Step 2: Admin login**

Tarayıcıda `http://localhost:3000/admin/login` aç ve giriş yap.

- [ ] **Step 3: Tasarımlar sayfasını aç**

`http://localhost:3000/admin/tasarimlar` aç.
Beklenen: Liste yüklenir; her satırın sağında kalem ikonlu **Düzenle** butonu vardır.

- [ ] **Step 4: Modal'ı aç**

Bir satırın Düzenle butonuna bas.
Beklenen: Modal açılır; üstünde slug, tema bilgisi ve preview thumbnail görünür; form alanları mevcut değerlerle doludur.

- [ ] **Step 5: Fiyatı değiştir**

Fiyatı değiştir → Kaydet.
Beklenen: Modal kapanır; tabloda yeni fiyat görünür.

- [ ] **Step 6: Kategori ve stil değiştir**

Bir tasarımın kategori ve stilini değiştir → Kaydet.
Beklenen: Tabloda yeni etiketler görünür.

- [ ] **Step 7: Boş isim doğrulaması**

Modal'ı aç, ismi tamamen sil → Kaydet.
Beklenen: Modal'da kırmızı uyarı banner'ı; istek atılmaz veya 400 döner; modal kapanmaz.

- [ ] **Step 8: Negatif fiyat doğrulaması**

Modal'ı aç, fiyatı `-1` yap → Kaydet.
Beklenen: Kırmızı uyarı banner'ı; modal kapanmaz.

- [ ] **Step 9: Toggle'lar hâlâ çalışıyor**

Tablodaki Aktif ve Popüler toggle'larını tıkla.
Beklenen: Anında geçiş yapar, tabloda yansır.

- [ ] **Step 10: Modal'daki checkbox'lar tabloyla tutarlı**

Modal'ı aç, "Aktif" checkbox'ını kapat → Kaydet.
Beklenen: Tabloda "Aktif" toggle'ı kapalıya geçer.

- [ ] **Step 11: Salt okunur alanlar değişmemiş**

Supabase Studio veya SQL ile kontrol et: bir tasarımın `slug`, `theme_key`, `preview_images` değerleri düzenleme sonrası değişmemiş olmalı.

- [ ] **Step 12: Public sayfa etkisi**

`/tasarimlar` (public) sayfasında değiştirilen fiyatın yansıdığını doğrula.

- [ ] **Step 13: Commit yok**

Bu görevde kod değişikliği yok; sadece doğrulama. Bir sorun çıkarsa düzelt ve ilgili task'a geri dön.

---

## Self-Review Notları

- **Spec coverage:** Düzenlenebilir alanlar (Task 1 + 2), salt okunur blok (Task 2 read-only div), UX (Task 3 + 4), API doğrulama (Task 1), test akışı (Task 5) — hepsi kapsanıyor.
- **Tip tutarlılığı:** `TemplateRecord` interface'i hem `EditTemplateModal` hem `TemplateRow` içinde aynı şekilde tanımlandı; alan adları (`is_active`, `is_popular`, `preview_images`, `theme_key`) Supabase satırı ile birebir.
- **Placeholder yok:** Tüm kod blokları tam ve çalışır halde.
