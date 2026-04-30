/**
 * Tasarım şablonu veri erişim fonksiyonları — Supabase.
 */
import { createClient } from '@/lib/supabase/server';
import type { Template } from '@/types';

/** Supabase satır tipini uygulama tipine dönüştür */
function mapRow(row: Record<string, unknown>): Template {
  return {
    id:            row.id            as string,
    name:          row.name          as string,
    slug:          row.slug          as string,
    previewImages: (row.preview_images as string[]) ?? [],
    description:   (row.description  as string)  ?? '',
    price:         Number(row.price),
    isPopular:     row.is_popular     as boolean,
    isActive:      row.is_active      as boolean,
    createdAt:     row.created_at     as string,
    updatedAt:     row.updated_at     as string,
  };
}

/** Aktif tüm şablonları döndürür */
export async function getTemplates(): Promise<Template[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) { console.error('getTemplates error:', error); return []; }
  return (data ?? []).map(mapRow);
}

/** Slug'a göre tek şablon döndürür */
export async function getTemplateBySlug(slug: string): Promise<Template | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error || !data) return null;
  return mapRow(data as Record<string, unknown>);
}

/** Popüler şablonları döndürür */
export async function getPopularTemplates(limit = 6): Promise<Template[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('is_active',  true)
    .eq('is_popular', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) { console.error('getPopularTemplates error:', error); return []; }
  return (data ?? []).map(mapRow);
}

/** Diğer aktif şablonlardan bir kaçını döner (kendisi hariç) */
export async function getRelatedTemplates(template: Template, limit = 3): Promise<Template[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('is_active', true)
    .neq('id', template.id)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) return [];
  return (data ?? []).map(mapRow);
}
