'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#dddddd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">

            {/* Logo — PP wordmark stili */}
            <Link
              href="/"
              className="flex items-center shrink-0"
              aria-label="Sanal Davetiyecim — Ana Sayfa"
            >
              <span className="font-display italic text-xl font-bold tracking-tight text-black leading-none">
                Sanal Davetiyecim
              </span>
            </Link>

            {/* Masaüstü navigasyon — ortada */}
            <nav className="hidden md:flex items-center gap-0" aria-label="Ana navigasyon">
              {NAV_LINKS.filter(l => l.href !== '/').map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-1.5 text-[13px] font-medium transition-colors',
                    pathname === link.href
                      ? 'text-black'
                      : 'text-[#555555] hover:text-black'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Sağ taraf — Search + CTA */}
            <div className="flex items-center gap-3">
              <button
                className="hidden md:flex items-center justify-center w-8 h-8 text-[#555555] hover:text-black transition-colors"
                aria-label="Ara"
              >
                <Search size={18} />
              </button>

              <Link
                href="/siparis"
                className="hidden md:inline-flex items-center justify-center px-5 py-1.5 rounded bg-primary text-white text-[13px] font-semibold hover:bg-primary-dark transition-colors"
              >
                Sipariş Ver
              </Link>

              {/* Mobil hamburger */}
              <button
                className="md:hidden p-1.5 text-[#555555] hover:text-black transition-colors"
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

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
