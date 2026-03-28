'use client';

import Link            from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, ShoppingBag, Palette,
  MessageSquare, Mail, Settings, LogOut,
} from 'lucide-react';
import { cn }           from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';

const navItems = [
  { href: '/admin',            label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/admin/siparisler', label: 'Siparişler', icon: ShoppingBag     },
  { href: '/admin/tasarimlar', label: 'Tasarımlar', icon: Palette         },
  { href: '/admin/yorumlar',   label: 'Yorumlar',   icon: MessageSquare   },
  { href: '/admin/mesajlar',   label: 'Mesajlar',   icon: Mail            },
  { href: '/admin/ayarlar',    label: 'Ayarlar',    icon: Settings        },
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
    <div className="flex flex-col h-full bg-admin-sidebar border-r border-admin-border">

      {/* Logo */}
      <div className="px-5 pt-6 pb-5 border-b border-admin-border">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 shrink-0 flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #B8860B 0%, #D4A017 100%)',
              borderRadius: '8px',
              transform: 'rotate(45deg)',
              boxShadow: '0 0 20px rgba(184,134,11,0.25)',
            }}
          >
            <span
              className="text-white font-bold text-[11px] tracking-tight"
              style={{ fontFamily: 'Georgia, serif', transform: 'rotate(-45deg)' }}
            >
              SD
            </span>
          </div>
          <div>
            <p
              className="text-admin-text text-[13px] font-semibold leading-tight"
              style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.2px' }}
            >
              Sanal Davetiyecim
            </p>
            <p className="text-admin-muted text-[10px] tracking-widest uppercase mt-0.5">
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav
        className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-0.5"
        aria-label="Admin navigasyon"
      >
        <p className="text-admin-muted text-[10px] tracking-[1.2px] uppercase font-semibold px-2.5 pb-2 pt-1">
          Yönetim
        </p>

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
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'group flex items-center gap-2.5 px-3 py-[9px] rounded-lg text-[13.5px] transition-all duration-150 relative',
                isActive
                  ? 'text-admin-gold bg-[rgba(184,134,11,0.07)]'
                  : 'text-admin-muted hover:text-admin-text hover:bg-[rgba(255,255,255,0.03)]'
              )}
              style={isActive ? {
                borderLeft: '2px solid #B8860B',
                paddingLeft: '10px',
              } : {
                borderLeft: '2px solid transparent',
              }}
            >
              <item.icon
                size={15}
                aria-hidden="true"
                className={isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-80'}
              />
              <span className={isActive ? 'font-medium' : 'font-normal'}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Signout */}
      <div className="px-3 pb-5 pt-3 border-t border-admin-border">
        <button
          onClick={handleSignOut}
          className="group flex items-center gap-2.5 w-full px-3 py-[9px] rounded-lg text-[13.5px] text-admin-muted hover:text-red-400 hover:bg-red-950/20 transition-all duration-150"
        >
          <LogOut size={15} aria-hidden="true" className="opacity-60 group-hover:opacity-100" />
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}
