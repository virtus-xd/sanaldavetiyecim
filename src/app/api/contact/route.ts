/**
 * POST /api/contact — İletişim formu mesajı kaydet
 */
import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema }    from '@/lib/validations';
import { createContactMessage } from '@/lib/data/contact';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = contactFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Geçersiz form verisi' },
        { status: 400 }
      );
    }

    const { success, error } = await createContactMessage(parsed.data);
    if (!success) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });

  } catch (err) {
    console.error('POST /api/contact error:', err);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
