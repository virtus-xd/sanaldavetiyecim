import Link from 'next/link';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { NAV_LINKS, SITE_META, WHATSAPP_URL } from '@/lib/constants';
import { Container } from '@/components/ui/Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blush-deep/40 border-t border-[#d9cfb8]">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">

          {/* Logo + açıklama */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <Link href="/" className="inline-block">
              <span className="font-display italic text-lg font-bold tracking-tight text-brand">
                Sanal Davetiyecim
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-[#555555] max-w-[220px]">
              Düğün, nişan, söz ve kına organizasyonlarınız için şık dijital davetiye siteleri.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-medium transition-colors w-fit"
              aria-label="WhatsApp ile iletişim kur"
            >
              <MessageCircle size={15} />
              WhatsApp ile Yaz
            </a>
          </div>

          {/* Hızlı linkler */}
          <div>
            <h3 className="text-xs font-bold text-black uppercase tracking-widest mb-4">Hızlı Linkler</h3>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#555555] hover:text-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/sikca-sorulan-sorular" className="text-sm text-[#555555] hover:text-black transition-colors">
                  Sıkça Sorulan Sorular
                </Link>
              </li>
              <li>
                <Link href="/siparis-sorgula" className="text-sm text-[#555555] hover:text-black transition-colors">
                  Sipariş Sorgula
                </Link>
              </li>
            </ul>
          </div>

          {/* Davetiye Türleri */}
          <div>
            <h3 className="text-xs font-bold text-black uppercase tracking-widest mb-4">Davetiye Türleri</h3>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'Düğün Davetiyesi',  href: '/tasarimlar?tur=dugun' },
                { label: 'Nişan Davetiyesi',  href: '/tasarimlar?tur=nisan' },
                { label: 'Söz Davetiyesi',    href: '/tasarimlar?tur=soz' },
                { label: 'Kına Davetiyesi',   href: '/tasarimlar?tur=kina' },
                { label: 'Özel Etkinlik',     href: '/tasarimlar?tur=ozel' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-[#555555] hover:text-black transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-xs font-bold text-black uppercase tracking-widest mb-4">İletişim</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`tel:+${SITE_META.whatsapp}`}
                  className="flex items-center gap-2 text-sm text-[#555555] hover:text-black transition-colors"
                >
                  <Phone size={14} className="shrink-0" />
                  {SITE_META.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_META.email}`}
                  className="flex items-center gap-2 text-sm text-[#555555] hover:text-black transition-colors"
                >
                  <Mail size={14} className="shrink-0" />
                  {SITE_META.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://instagram.com/${SITE_META.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#555555] hover:text-black transition-colors"
                >
                  <svg className="shrink-0 w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  @{SITE_META.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt çizgi */}
        <div className="mt-12 pt-6 border-t border-[#d9cfb8] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#999999]">
          <p>© {currentYear} {SITE_META.name}. Tüm hakları saklıdır.</p>
          <p>Türkiye&apos;de sevgiyle yapılmıştır.</p>
        </div>
      </Container>
    </footer>
  );
}
