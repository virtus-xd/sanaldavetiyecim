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
