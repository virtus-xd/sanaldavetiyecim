import type { MetadataRoute } from 'next';
import { SITE_META } from '@/lib/constants';
import { getTemplates } from '@/lib/data/templates';

const BASE = SITE_META.url;

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE,                              lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0  },
  { url: `${BASE}/tasarimlar`,              lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9  },
  { url: `${BASE}/nasil-calisir`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7  },
  { url: `${BASE}/hakkimizda`,              lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6  },
  { url: `${BASE}/iletisim`,                lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6  },
  { url: `${BASE}/sikca-sorulan-sorular`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6  },
  { url: `${BASE}/siparis`,                 lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let templateRoutes: MetadataRoute.Sitemap = [];

  try {
    const templates = await getTemplates();
    templateRoutes = templates.map((t) => ({
      url:             `${BASE}/tasarimlar/${t.slug}`,
      lastModified:    new Date(t.updatedAt ?? t.createdAt),
      changeFrequency: 'weekly' as const,
      priority:        0.8,
    }));
  } catch {
    // Build zamanında Supabase yoksa atla
  }

  return [...STATIC_ROUTES, ...templateRoutes];
}
