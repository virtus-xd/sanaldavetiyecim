/**
 * Tasarım şablonu veri erişim fonksiyonları — Supabase.
 */
import { createClient } from '@/lib/supabase/server';
import type { Template, TemplateCategory, TemplateStyle } from '@/types';

export interface TemplateFilters {
  category?: TemplateCategory;
  style?:    TemplateStyle;
}

/** Supabase satır tipini uygulama tipine dönüştür */
function mapRow(row: Record<string, unknown>): Template {
  return {
    id:            row.id            as string,
    name:          row.name          as string,
    slug:          row.slug          as string,
    category:      row.category      as TemplateCategory,
    style:         row.style         as TemplateStyle,
    previewImages: (row.preview_images as string[]) ?? [],
    description:   (row.description  as string)  ?? '',
    price:         Number(row.price),
    isPopular:     row.is_popular     as boolean,
    isActive:      row.is_active      as boolean,
    createdAt:     row.created_at     as string,
    updatedAt:     row.updated_at     as string,
  };
}

/** Aktif tüm şablonları, opsiyonel filtrelerle döndürür */
export async function getTemplates(filters?: TemplateFilters): Promise<Template[]> {
  const supabase = await createClient();
  let query = supabase
    .from('templates')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (filters?.category) query = query.eq('category', filters.category);
  if (filters?.style)    query = query.eq('style',    filters.style);

  const { data, error } = await query;
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

/** Aynı kategori veya stildeki ilgili şablonlar (kendisi hariç) */
export async function getRelatedTemplates(template: Template, limit = 3): Promise<Template[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('is_active', true)
    .neq('id', template.id)
    .or(`category.eq.${template.category},style.eq.${template.style}`)
    .limit(limit);

  if (error) return [];
  return (data ?? []).map(mapRow);
}
