import type { Metadata } from 'next';
import Link from 'next/link';
import { MousePointerClick, FileEdit, Wand2, Send, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Container }    from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button }       from '@/components/ui/Button';

export const metadata: Metadata = {
  title:       'Nasıl Çalışır',
  description: 'Dijital davetiye sipariş sürecini öğrenin. Tasarım seçin, bilgilerinizi girin, 24-48 saat içinde davetiyenizi alın.',
  openGraph: {
    title:       'Nasıl Çalışır — Sanal Davetiyecim',
    description: 'Dijital davetiye sipariş sürecini öğrenin. Tasarım seçin, bilgilerinizi girin, 24-48 saat içinde davetiyenizi alın.',
  },
};

const steps = [
  {
    number:      '01',
    icon:        MousePointerClick,
    title:       'Tasarım Seçin',
    description: 'Portföyümüzdeki onlarca farklı tasarım arasından organizasyonunuza en uygun olanı seçin. Düğün, nişan, söz, kına veya özel organizasyon için ayrı kategorilerimiz mevcut.',
    details: [
      'Farklı kategori ve stiller',
      'Önizleme görselleri ile detaylı inceleme',
      'Fiyat şeffaflığı',
    ],
  },
  {
    number:      '02',
    icon:        FileEdit,
    title:       'Bilgilerinizi Girin',
    description: 'Çiftin isimleri, etkinlik tarihi, saati, mekan ve varsa özel mesajınızı sipariş formumuza girin. İşlem yalnızca birkaç dakika sürer.',
    details: [
      'Kolay doldurulur 4 adımlı form',
      'Özel mesaj ve not ekleme imkânı',
      'Güvenli ödeme',
    ],
  },
  {
    number:      '03',
    icon:        Wand2,
    title:       'Biz Hazırlayalım',
    description: 'Sipariş aldıktan sonra ekibimiz 24-48 saat içinde tüm bilgilerinizi içeren özel davetiye sitenizi hazırlar. Revizyon talep edebilirsiniz.',
    details: [
      '24-48 saat içinde teslim',
      'Ücretsiz 1 revizyon hakkı',
      'E-posta ile bilgilendirme',
    ],
  },
  {
    number:      '04',
    icon:        Send,
    title:       'Paylaşın',
    description: 'Hazırlanan davetiye linkinizi WhatsApp, SMS veya sosyal medya üzerinden misafirlerinize gönderin. Mobil uyumlu tasarım her cihazda mükemmel görünür.',
    details: [
      'Tek link ile tüm misafirlere',
      'WhatsApp, SMS, sosyal medya paylaşımı',
      'Mobil uyumlu görünüm',
    ],
  },
];

export default function NasilCalisirPage() {
  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <div className="bg-cream py-14 md:py-20">
        <Container>
          <SectionTitle
            title="Nasıl Çalışır?"
            subtitle="Dört kolay adımda hayalinizdeki dijital davetiyeye kavuşun."
          />
        </Container>
      </div>

      {/* Adımlar */}
      <Container className="py-16">
        <div className="flex flex-col gap-12">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`flex flex-col md:flex-row gap-8 items-start ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Görsel / İkon alanı */}
              <div className="w-full md:w-64 shrink-0 flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-3xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                    <step.icon size={48} className="text-primary" aria-hidden="true" />
                  </div>
                  <span className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-primary text-white font-display font-bold text-lg flex items-center justify-center shadow-md">
                    {step.number}
                  </span>
                </div>
              </div>

              {/* İçerik */}
              <div className="flex-1">
                <h2 className="font-display text-2xl font-bold text-neutral-800 mb-3">
                  {step.title}
                </h2>
                <p className="text-neutral-600 leading-relaxed mb-5">
                  {step.description}
                </p>
                <ul className="flex flex-col gap-2">
                  {step.details.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm text-neutral-600">
                      <CheckCircle2 size={16} className="text-primary shrink-0" aria-hidden="true" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button asChild size="lg">
            <Link href="/siparis" className="flex items-center gap-2">
              Hemen Sipariş Ver <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </Button>
          <p className="text-sm text-neutral-400 mt-3">
            Sorunuz mu var?{' '}
            <Link href="/sikca-sorulan-sorular" className="text-primary hover:underline">
              SSS sayfasını ziyaret edin
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}
