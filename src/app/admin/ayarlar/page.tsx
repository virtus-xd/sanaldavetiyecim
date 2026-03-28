/**
 * Admin — Site Ayarları (placeholder)
 */
import type { Metadata } from 'next';
import { Settings } from 'lucide-react';

export const metadata: Metadata = { title: 'Ayarlar — Admin' };

export default function AyarlarPage() {
  return (
    <div className="max-w-2xl space-y-5">
      <h1 className="font-display text-2xl font-bold text-neutral-800">Ayarlar</h1>

      <div className="bg-white rounded-xl border border-neutral-100 shadow-sm py-20 flex flex-col items-center gap-3 text-neutral-400">
        <Settings size={32} strokeWidth={1.5} />
        <p className="text-sm">Site ayarları yakında eklenecek.</p>
      </div>
    </div>
  );
}
