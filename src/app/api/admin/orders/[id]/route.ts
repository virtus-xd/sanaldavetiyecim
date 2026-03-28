import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient, verifyAdminSession } from '@/lib/supabase/server';
import { sendOrderDelivered } from '@/lib/email/sendEmail';

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
  if (body.status       !== undefined) updates.status        = body.status;
  if (body.deliveredUrl !== undefined) updates.delivered_url = body.deliveredUrl;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data: order, error } = await supabase
    .from('orders')
    .update(updates)
    .eq('id', id)
    .select('order_number, customer_name, customer_email, delivered_url')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

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
