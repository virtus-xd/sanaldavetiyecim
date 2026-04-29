import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient, verifyAdminSession } from '@/lib/supabase/server';
import { sendOrderDelivered, sendPaymentConfirmed } from '@/lib/email/sendEmail';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const updates: Record<string, unknown> = {};
  if (body.status        !== undefined) updates.status         = body.status;
  if (body.deliveredUrl  !== undefined) updates.delivered_url  = body.deliveredUrl;
  if (body.paymentStatus !== undefined) {
    updates.payment_status = body.paymentStatus;
    if (body.paymentStatus === 'onaylandi') {
      updates.payment_confirmed_at = new Date().toISOString();
    }
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Tamamlandı yapılıyorsa ve delivered_url yoksa, otomatik davetiye URL'i set et
  if (body.status === 'tamamlandi' && !body.deliveredUrl) {
    const { data: existing } = await supabase
      .from('orders')
      .select('order_number, delivered_url')
      .eq('id', id)
      .single();

    if (existing && !existing.delivered_url) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sanaldavetiyecim.com';
      updates.delivered_url = `${siteUrl}/davetiye/${existing.order_number}`;
    }
  }

  const { data: order, error } = await supabase
    .from('orders')
    .update(updates)
    .eq('id', id)
    .select('order_number, customer_name, customer_email, delivered_url')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Ödeme onaylandı → bilgilendirme e-postası gönder
  if (
    body.paymentStatus === 'onaylandi' &&
    order?.customer_email
  ) {
    await sendPaymentConfirmed({
      orderNumber:   order.order_number as string,
      customerName:  order.customer_name as string,
      customerEmail: order.customer_email as string,
    }).catch((err) => console.error('Payment confirmed email error:', err));
  }

  // Tamamlandı → teslim e-postası gönder
  if (
    body.status === 'tamamlandi' &&
    order?.customer_email &&
    order?.delivered_url
  ) {
    await sendOrderDelivered({
      orderNumber:   order.order_number as string,
      customerName:  order.customer_name as string,
      customerEmail: order.customer_email as string,
      deliveredUrl:  order.delivered_url as string,
    }).catch((err) => console.error('Delivered email error:', err));
  }

  return NextResponse.json({ success: true });
}
