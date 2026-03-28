import type { Metadata } from 'next';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { Container }      from '@/components/ui/Container';
import { SectionTitle }   from '@/components/ui/SectionTitle';
import { ContactForm }    from '@/components/ContactForm';
import { SITE_META, WHATSAPP_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title:       'İletişim',
  description: 'Sanal Davetiyecim ile iletişime geçin. Dijital davetiye hakkında sorularınızı yanıtlamaktan memnuniyet duyarız.',
  openGraph: {
    title:       'İletişim — Sanal Davetiyecim',
    description: 'Dijital davetiye hakkında sorularınız için bize ulaşın.',
  },
};

const contactItems = [
  {
    icon:  Phone,
    label: 'Telefon',
    value: '+90 555 123 45 67',
    href:  `tel:+${SITE_META.whatsapp}`,
  },
  {
    icon:  Mail,
    label: 'E-posta',
    value: SITE_META.email,
    href:  `mailto:${SITE_META.email}`,
  },
  {
    icon:  MessageCircle,
    label: 'Instagram',
    value: `@${SITE_META.instagram}`,
    href:  `https://instagram.com/${SITE_META.instagram}`,
  },
];

export default function IletisimPage() {
  return (
    <div className="min-h-screen pb-20">
      <div className="bg-cream py-14 md:py-20">
        <Container>
          <SectionTitle
            title="İletişim"
            subtitle="Sorularınız için bize ulaşın, en kısa sürede dönüş yapacağız."
          />
        </Container>
      </div>

      <Container className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="font-display text-xl font-semibold text-neutral-800 mb-6">
              Mesaj Gönderin
            </h2>
            <ContactForm />
          </div>

          {/* İletişim bilgileri */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="font-display text-xl font-semibold text-neutral-800 mb-6">
                Bize Ulaşın
              </h2>
              <div className="flex flex-col gap-4">
                {contactItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl border border-neutral-100 hover:border-primary/20 hover:shadow-sm transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <item.icon size={18} className="text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400">{item.label}</p>
                      <p className="font-medium text-neutral-700">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp butonu */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 p-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-colors"
            >
              <MessageCircle size={20} aria-hidden="true" />
              WhatsApp ile Hızlıca Ulaşın
            </a>

            <div className="bg-primary/5 border border-primary/10 rounded-xl p-5 text-sm text-neutral-600 leading-relaxed">
              <p className="font-semibold text-neutral-700 mb-1">Yanıt Süresi</p>
              Hafta içi mesajlarınıza genellikle 2-4 saat içinde dönüş yapılır.
              Hafta sonu yanıt süresi biraz daha uzun olabilir.
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
