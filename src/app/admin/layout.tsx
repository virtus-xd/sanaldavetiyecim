'use client';

import { useState }    from 'react';
import { Menu }        from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

const SIDEBAR_WIDTH = 240;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-admin-bg">

      {/* Masaüstü sidebar */}
      <aside
        style={{ width: SIDEBAR_WIDTH }}
        className="hidden md:flex flex-col shrink-0 fixed top-0 left-0 bottom-0 z-30"
        aria-label="Admin kenar çubuğu"
      >
        <AdminSidebar />
      </aside>

      {/* Mobil sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -SIDEBAR_WIDTH }} animate={{ x: 0 }} exit={{ x: -SIDEBAR_WIDTH }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{ width: SIDEBAR_WIDTH }}
              className="absolute top-0 left-0 bottom-0"
            >
              <AdminSidebar onClose={() => setSidebarOpen(false)} />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Ana içerik */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-[240px]">

        {/* Üst bar */}
        <header className="sticky top-0 z-20 h-[52px] bg-admin-bg border-b border-admin-border flex items-center px-4 md:px-6 gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-1.5 rounded-lg text-admin-muted hover:text-admin-text hover:bg-admin-card transition-colors"
            aria-label="Menüyü aç"
          >
            <Menu size={18} />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] tracking-widest uppercase font-medium px-2 py-0.5 rounded"
              style={{
                color: '#B8860B',
                background: 'rgba(184,134,11,0.1)',
                border: '1px solid rgba(184,134,11,0.2)',
              }}
            >
              Admin
            </span>
          </div>
        </header>

        {/* Sayfa içeriği */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
