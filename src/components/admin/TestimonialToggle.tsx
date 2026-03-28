'use client';

/**
 * Yorum görünürlük toggle butonu.
 */
import { useState }  from 'react';
import { useRouter } from 'next/navigation';

interface TestimonialToggleProps {
  id:      string;
  visible: boolean;
}

export function TestimonialToggle({ id, visible }: TestimonialToggleProps) {
  const router  = useRouter();
  const [on, setOn] = useState(visible);
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    setLoading(true);
    const newValue = !on;
    setOn(newValue);
    await fetch(`/api/admin/testimonials/${id}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ is_visible: newValue }),
    });
    setLoading(false);
    router.refresh();
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`relative inline-flex h-5 w-9 rounded-full transition-colors duration-200 ${
        on ? 'bg-primary' : 'bg-neutral-200'
      }`}
      role="switch"
      aria-checked={on}
      title={on ? 'Gizle' : 'Göster'}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200 mt-0.5 ${
          on ? 'translate-x-4' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}
