'use client';

import { MousePointerClick, FileEdit, Wand2, Send } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import Link from 'next/link';

const steps = [
  {
    icon:        MousePointerClick,
    title:       'Tasarım seçin',
    description: 'Onlarca tasarım arasından organizasyonunuza en uygun olanı seçin ya da özel tasarım isteyin.',
  },
  {
    icon:        FileEdit,
    title:       'Bilgilerinizi girin',
    description: 'Çiftin isimleri, tarih, saat, mekan ve özel mesajınızı sipariş formumuza girin.',
  },
  {
    icon:        Wand2,
    title:       'Biz hazırlayalım',
    description: '24-48 saat içinde tüm bilgilerinizi içeren özel davetiye sitenizi hazırlayıp size iletiyoruz.',
  },
  {
    icon:        Send,
    title:       'Paylaşın',
    description: 'Davetiye linkinizi WhatsApp, SMS veya sosyal medya üzerinden tüm misafirlerinize gönderin.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-[#eeeeee]" aria-label="Nasıl Çalışır">
      <Container>
        {/* Üst: Başlık ortada */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4">
            Eksiksiz dijital davetiye platformu
          </h2>
          <p className="text-[#555555] text-base leading-relaxed">
            Davetiye oluşturmayı, göndermeyi ve yönetmeyi kolaylaştıran araçlar.
            Her şey tek bir yerde.
          </p>
        </div>

        {/* 4 özellik kartı */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {steps.map((step) => (
            <div
              key={step.title}
              className="p-6 border border-[#eeeeee] hover:border-[#999999] transition-colors group"
            >
              <div className="w-10 h-10 flex items-center justify-center text-primary mb-5">
                <step.icon size={24} aria-hidden="true" />
              </div>
              <h3 className="text-sm font-bold text-black mb-2">{step.title}</h3>
              <p className="text-sm text-[#767676] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/nasil-calisir"
            className="inline-flex items-center justify-center px-7 py-3 border border-black text-black text-sm font-semibold hover:bg-black hover:text-white transition-colors tracking-wide"
          >
            TÜM ÖZELLİKLERİ GÖR
          </Link>
        </div>
      </Container>
    </section>
  );
}
