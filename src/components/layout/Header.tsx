'use client';

import { useEffect, useState, type ComponentProps } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';
import { useScroll } from '@/components/ui/use-scroll';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';

const HEADER_LINKS = NAV_LINKS.filter((l) => l.href !== '/');

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const scrolled = useScroll(10);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-transparent transition-colors',
        scrolled && 'border-[#d9cfb8] bg-blush/85 backdrop-blur-lg supports-[backdrop-filter]:bg-blush/70',
      )}
    >
      <nav className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Wordmark */}
        <Link
          href="/"
          className="rounded-md px-2 py-1 transition-colors hover:bg-blush-deep/50"
          aria-label="Sanal Davetiyecim — Ana Sayfa"
        >
          <span className="font-display italic text-xl font-bold tracking-tight text-brand leading-none">
            Sanal Davetiyecim
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {HEADER_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'inline-flex h-9 items-center rounded-md px-3 text-[13px] font-medium transition-colors',
                  active
                    ? 'text-black bg-blush-deep/40'
                    : 'text-[#555555] hover:bg-blush-deep/40 hover:text-black',
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/iletisim"
            className="ml-2 inline-flex h-9 items-center justify-center rounded-md border border-[#d9cfb8] bg-transparent px-4 text-[13px] font-semibold text-black hover:bg-blush-soft transition-colors"
          >
            Bilgi Al
          </Link>
          <Link
            href="/siparis"
            className="inline-flex h-9 items-center justify-center rounded-md bg-brand px-4 text-[13px] font-semibold text-white shadow-sm hover:bg-brand-deep transition-colors"
          >
            Sipariş Ver
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#d9cfb8] bg-transparent text-black hover:bg-blush-soft transition-colors md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Menüyü aç/kapat"
        >
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </button>
      </nav>

      <MobileMenu open={open}>
        <div className="flex h-full flex-col justify-between gap-4">
          <div className="grid gap-1">
            {HEADER_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'inline-flex h-11 items-center rounded-md px-3 text-base font-medium transition-colors',
                    active
                      ? 'text-black bg-blush-deep/40'
                      : 'text-[#333333] hover:bg-blush-deep/40 hover:text-black',
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href="/iletisim"
              className="inline-flex h-11 items-center justify-center rounded-md border border-[#d9cfb8] bg-transparent px-4 text-sm font-semibold text-black hover:bg-blush-soft transition-colors"
            >
              Bilgi Al
            </Link>
            <Link
              href="/siparis"
              className="inline-flex h-11 items-center justify-center rounded-md bg-brand px-4 text-sm font-semibold text-white shadow-sm hover:bg-brand-deep transition-colors"
            >
              Sipariş Ver
            </Link>
          </div>
        </div>
      </MobileMenu>
    </header>
  );
}

type MobileMenuProps = ComponentProps<'div'> & { open: boolean };

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
  if (!open || typeof window === 'undefined') return null;

  return createPortal(
    <div
      id="mobile-menu"
      className={cn(
        'fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y border-[#d9cfb8]',
        'bg-blush/95 backdrop-blur-lg supports-[backdrop-filter]:bg-blush/80',
        'md:hidden',
      )}
    >
      <div
        data-slot={open ? 'open' : 'closed'}
        className={cn(
          'data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out',
          'size-full p-4',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
