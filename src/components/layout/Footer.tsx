/**
 * Site altbilgi bileşeni.
 * Logo, hızlı linkler, iletişim bilgileri, WhatsApp butonu ve telif hakkı.
 */
import Link from 'next/link';
import { Phone, Mail, MessageCircle, Heart } from 'lucide-react';
import { NAV_LINKS, SITE_META, WHATSAPP_URL } from '@/lib/constants';
import { Container } from '@/components/ui/Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

          {/* Logo ve açıklama */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <span className="text-white font-display font-bold text-sm">SD</span>
              </div>
              <span className="font-display font-semibold text-white text-lg">
                Sanal Davetiyecim
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-neutral-400 max-w-xs">
              Düğün, nişan, söz ve kına organizasyonlarınız için şık dijital davetiye siteleri hazırlıyoruz.
            </p>
            {/* WhatsApp butonu */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white text-sm font-medium transition-colors w-fit"
              aria-label="WhatsApp ile iletişim kur"
            >
              <MessageCircle size={16} />
              WhatsApp ile Yaz
            </a>
          </div>

          {/* Hızlı linkler */}
          <div>
            <h3 className="text-white font-semibold mb-4">Hızlı Linkler</h3>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/sikca-sorulan-sorular" className="text-sm text-neutral-400 hover:text-primary transition-colors">
                  Sıkça Sorulan Sorular
                </Link>
              </li>
              <li>
                <Link href="/siparis-sorgula" className="text-sm text-neutral-400 hover:text-primary transition-colors">
                  Sipariş Sorgula
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-white font-semibold mb-4">İletişim</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`tel:+${SITE_META.whatsapp}`}
                  className="flex items-center gap-2 text-sm text-neutral-400 hover:text-primary transition-colors"
                >
                  <Phone size={15} className="shrink-0" />
                  +90 555 123 45 67
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_META.email}`}
                  className="flex items-center gap-2 text-sm text-neutral-400 hover:text-primary transition-colors"
                >
                  <Mail size={15} className="shrink-0" />
                  {SITE_META.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://instagram.com/${SITE_META.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-neutral-400 hover:text-primary transition-colors"
                >
                  <svg className="shrink-0 w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  @{SITE_META.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt çizgi */}
        <div className="mt-10 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-500">
          <p>
            © {currentYear} {SITE_META.name}. Tüm hakları saklıdır.
          </p>
          <p className="flex items-center gap-1">
            <Heart size={12} className="text-accent" aria-hidden="true" />
            Türkiye&apos;de sevgiyle yapılmıştır.
          </p>
        </div>
      </Container>
    </footer>
  );
}
