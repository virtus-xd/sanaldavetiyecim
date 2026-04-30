'use client';

/**
 * Tasarım düzenleme modalı — name, description, price, is_popular, is_active
 * alanlarını günceller. slug, theme_key, preview görsel salt okunur.
 */
import { useState }    from 'react';
import { useRouter }   from 'next/navigation';
import { Modal }       from '@/components/ui/Modal';
import { Button }      from '@/components/ui/Button';
import { Input }       from '@/components/ui/Input';
import { Textarea }    from '@/components/ui/Textarea';

interface TemplateRecord {
  id:             string;
  name:           string;
  slug:           string;
  description:    string | null;
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
