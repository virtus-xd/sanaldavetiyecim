'use client';

/**
 * Tek iletişim mesajı kartı — açılır/kapanır, okundu işaretleme.
 */
import { useState }  from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, Mail, Phone } from 'lucide-react';
import { cn }        from '@/lib/utils';
import { formatDate } from '@/lib/utils';

interface MessageCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  message: Record<string, any>;
}

export function MessageCard({ message }: MessageCardProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const markRead = async () => {
    if (message.is_read) return;
    await fetch(`/api/admin/messages/${message.id}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ isRead: true }),
    });
    router.refresh();
  };

  const handleToggle = () => {
    setOpen(!open);
    if (!open) markRead();
  };

  return (
    <div className={cn(
      'bg-white rounded-xl border shadow-sm overflow-hidden',
      message.is_read ? 'border-neutral-100' : 'border-primary/30 shadow-primary/5'
    )}>
      <button
        onClick={handleToggle}
        className="w-full flex items-center gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {!message.is_read && (
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" aria-label="Okunmadı" />
            )}
            <p className="font-semibold text-neutral-800 text-sm truncate">{message.name}</p>
          </div>
          <p className="text-neutral-400 text-xs mt-0.5">{formatDate(message.created_at)}</p>
        </div>
        <p className="text-neutral-500 text-sm hidden sm:block truncate max-w-xs">{message.message.slice(0, 60)}...</p>
        <ChevronDown
          size={16}
          className={cn('text-neutral-400 shrink-0 transition-transform', open && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-neutral-50 pt-4">
          <div className="flex flex-wrap gap-4 mb-4 text-sm">
            <a href={`mailto:${message.email}`} className="flex items-center gap-1.5 text-primary hover:underline">
              <Mail size={13} aria-hidden="true" /> {message.email}
            </a>
            {message.phone && (
              <a href={`tel:${message.phone}`} className="flex items-center gap-1.5 text-neutral-600">
                <Phone size={13} aria-hidden="true" /> {message.phone}
              </a>
            )}
          </div>
          <p className="text-neutral-700 text-sm leading-relaxed">{message.message}</p>
        </div>
      )}
    </div>
  );
}
