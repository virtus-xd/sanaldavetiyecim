/**
 * POST /api/orders — Yeni sipariş oluştur
 */
import { NextRequest, NextResponse } from 'next/server';
import { orderFormSchema }  from '@/lib/validations';
import { createOrder }      from '@/lib/data/orders';
import { sendOrderConfirmation, sendAdminNewOrder } from '@/lib/email/sendEmail';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validasyon
    const parsed = orderFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Geçersiz form verisi', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Fiyatı hesapla
    let totalPrice    = 199; // varsayılan
    let templateName  = 'Seçilen Tasarım';
    if (data.templateId) {
      const { createAdminClient } = await import('@/lib/supabase/server');
      const supabase = createAdminClient();
      const { data: tpl } = await supabase
        .from('templates')
        .select('price, name')
        .eq('id', data.templateId)
        .single();
      if (tpl) {
        totalPrice   = Number(tpl.price);
        templateName = tpl.name as string;
      }
    }

    // Sipariş oluştur
    const { order, error } = await createOrder(data, totalPrice);
    if (error || !order) {
      return NextResponse.json({ error: error ?? 'Sipariş oluşturulamadı' }, { status: 500 });
    }

    // E-postalar (hata görmezden gel — sipariş zaten oluştu)
    const emailPayload = {
      orderNumber:   order.orderNumber,
      customerName:  data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      eventType:     data.eventType,
      eventDate:     data.eventDate,
      templateName,
      totalPrice,
      notes:         (data as Record<string, unknown>).notes as string | undefined,
    };

    await Promise.allSettled([
      sendOrderConfirmation(emailPayload),
      sendAdminNewOrder(emailPayload),
    ]);

    return NextResponse.json(
      { orderNumber: order.orderNumber, orderId: order.id },
      { status: 201 }
    );

  } catch (err) {
    console.error('POST /api/orders error:', err);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
