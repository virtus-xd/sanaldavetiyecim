'use client';

/**
 * Admin paneli sol kenar çubuğu.
 */
import Link         from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, ShoppingBag, Palette,
  MessageSquare, Mail, Settings, LogOut,
} from 'lucide-react';
import { cn }          from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';

const navItems = [
  { href: '/admin',           label: 'Dashboard',   icon: LayoutDashboard },
  { href: '/admin/siparisler', label: 'Siparişler',  icon: ShoppingBag     },
  { href: '/admin/tasarimlar', label: 'Tasarımlar',  icon: Palette         },
  { href: '/admin/yorumlar',   label: 'Yorumlar',    icon: MessageSquare   },
  { href: '/admin/mesajlar',   label: 'Mesajlar',    icon: Mail            },
  { href: '/admin/ayarlar',    label: 'Ayarlar',     icon: Settings        },
];

interface AdminSidebarProps {
  onClose?: () => void;
}

export function AdminSidebar({ onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router   = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  return (
    <div className="flex flex-col h-full bg-neutral-900 text-neutral-300">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <span className="text-white font-display font-bold text-xs">SD</span>
          </div>
          <div>
            <p className="font-display font-semibold text-white text-sm leading-tight">
              Sanal Davetiyecim
            </p>
            <p className="text-xs text-neutral-500">Admin Paneli</p>
          </div>
        </div>
      </div>

      {/* Navigasyon */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1" aria-label="Admin navigasyon">
        {navItems.map((item) => {
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/20 text-primary'
                  : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon size={17} aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Çıkış */}
      <div className="px-3 pb-5 border-t border-neutral-800 pt-3">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-400 hover:bg-red-900/30 hover:text-red-400 transition-colors"
        >
          <LogOut size={17} aria-hidden="true" />
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}
