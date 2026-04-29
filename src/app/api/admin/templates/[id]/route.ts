import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient, verifyAdminSession } from '@/lib/supabase/server';
import { EVENT_TYPES, TEMPLATE_STYLES } from '@/lib/constants';

const VALID_CATEGORIES = Object.keys(EVENT_TYPES);
const VALID_STYLES     = Object.keys(TEMPLATE_STYLES);

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body   = await request.json();

  const updates: Record<string, unknown> = {};

  if (body.is_active !== undefined) {
    if (typeof body.is_active !== 'boolean') {
      return NextResponse.json({ error: 'is_active boolean olmalı' }, { status: 400 });
    }
    updates.is_active = body.is_active;
  }
  if (body.is_popular !== undefined) {
    if (typeof body.is_popular !== 'boolean') {
      return NextResponse.json({ error: 'is_popular boolean olmalı' }, { status: 400 });
    }
    updates.is_popular = body.is_popular;
  }

  if (body.name !== undefined) {
    if (typeof body.name !== 'string' || body.name.trim().length === 0) {
      return NextResponse.json({ error: 'name boş olamaz' }, { status: 400 });
    }
    updates.name = body.name.trim();
  }

  if (body.description !== undefined) {
    if (typeof body.description !== 'string') {
      return NextResponse.json({ error: 'description metin olmalı' }, { status: 400 });
    }
    updates.description = body.description;
  }

  if (body.category !== undefined) {
    if (typeof body.category !== 'string' || !VALID_CATEGORIES.includes(body.category)) {
      return NextResponse.json({ error: 'category geçersiz' }, { status: 400 });
    }
    updates.category = body.category;
  }

  if (body.style !== undefined) {
    if (typeof body.style !== 'string' || !VALID_STYLES.includes(body.style)) {
      return NextResponse.json({ error: 'style geçersiz' }, { status: 400 });
    }
    updates.style = body.style;
  }

  if (body.price !== undefined) {
    const n = Number(body.price);
    if (!Number.isFinite(n) || n < 0) {
      return NextResponse.json({ error: 'price geçersiz' }, { status: 400 });
    }
    updates.price = n;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from('templates')
    .update(updates)
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
