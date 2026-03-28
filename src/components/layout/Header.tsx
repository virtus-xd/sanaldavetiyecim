'use client';

/**
 * Site başlık bileşeni.
 * - Scroll'da arka plan şeffaftan katıya geçer.
 * - Masaüstünde navigasyon linkleri ve "Sipariş Ver" CTA butonu.
 * - Mobilde hamburger menü açar.
 */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /** Rota değişince menüyü kapat */
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40',
          'transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label="Sanal Davetiyecim — Ana Sayfa"
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <span className="text-white font-display font-bold text-sm">SD</span>
              </div>
              <span
                className={cn(
                  'font-display font-semibold text-lg transition-colors',
                  scrolled ? 'text-neutral-800' : 'text-neutral-800'
                )}
              >
                Sanal Davetiyecim
              </span>
            </Link>

            {/* Masaüstü navigasyon */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Ana navigasyon">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'text-primary bg-primary/8'
                      : 'text-neutral-600 hover:text-primary hover:bg-primary/5'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Sağ taraf */}
            <div className="flex items-center gap-3">
              <Button asChild size="sm" className="hidden md:inline-flex">
                <Link href="/siparis">Sipariş Ver</Link>
              </Button>

              {/* Mobil hamburger */}
              <button
                className="md:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors"
                onClick={() => setMenuOpen(true)}
                aria-label="Menüyü aç"
                aria-expanded={menuOpen}
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobil menü */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
