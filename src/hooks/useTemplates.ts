'use client';

import { useState, useEffect } from 'react';
import type { Template } from '@/types';

export function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    fetch('/api/templates')
      .then((r) => r.json())
      .then((data: Template[]) => setTemplates(data))
      .catch(() => setTemplates([]))
      .finally(() => setLoading(false));
  }, []);

  return { templates, loading };
}
