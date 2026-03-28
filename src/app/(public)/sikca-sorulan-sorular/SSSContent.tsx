'use client';

import { useState }      from 'react';
import Link              from 'next/link';
import { ChevronDown }   from 'lucide-react';
import { cn }            from '@/lib/utils';

interface FaqItem { q: string; a: string; }
interface FaqSection { category: string; items: FaqItem[]; }

function FaqItemRow({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-neutral-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-medium text-neutral-800 text-sm leading-snug">{question}</span>
        <ChevronDown
          size={18}
          className={cn(
            'text-neutral-400 shrink-0 transition-transform duration-200',
            open && 'rotate-180'
          )}
          aria-hidden="true"
        />
      </button>
      <div className={cn('overflow-hidden transition-all duration-300', open ? 'max-h-96 pb-4' : 'max-h-0')}>
        <p className="text-sm text-neutral-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export function SSSContent({ faqs }: { faqs: FaqSection[] }) {
  return (
    <>
      <div className="flex flex-col gap-8">
        {faqs.map((section) => (
          <div key={section.category}>
            <h2 className="font-display font-semibold text-lg text-primary mb-1 pb-2 border-b border-primary/20">
              {section.category}
            </h2>
            <div className="bg-white rounded-xl border border-neutral-100 px-5">
              {section.items.map((item) => (
                <FaqItemRow key={item.q} question={item.q} answer={item.a} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center bg-cream rounded-2xl p-8">
        <p className="font-semibold text-neutral-700 mb-2">Sorunuz burada yok mu?</p>
        <p className="text-neutral-500 text-sm mb-5">
          Bize doğrudan ulaşın, en kısa sürede yardımcı olalım.
        </p>
        <Link
          href="/iletisim"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          İletişime Geçin
        </Link>
      </div>
    </>
  );
}
