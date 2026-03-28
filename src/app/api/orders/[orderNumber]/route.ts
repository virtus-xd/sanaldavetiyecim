/**
 * GET /api/orders/[orderNumber] — Sipariş durumu sorgula
 */
import { NextRequest, NextResponse } from 'next/server';
import { getOrderByNumber, getOrdersByEmail } from '@/lib/data/orders';
import { ORDER_STATUSES } from '@/lib/constants';

interface Params {
  params: Promise<{ orderNumber: string }>;
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { orderNumber } = await params;

  if (!orderNumber || orderNumber.length < 3) {
    return NextResponse.json({ error: 'Geçersiz sorgu' }, { status: 400 });
  }

  // E-posta ile sorgulama
  if (orderNumber.includes('@')) {
    const orders = await getOrdersByEmail(orderNumber);
    if (!orders.length) {
      return NextResponse.json({ error: 'Sipariş bulunamadı' }, { status: 404 });
    }
    return NextResponse.json({
      orders: orders.map((o) => ({
        orderNumber:  o.orderNumber,
        status:       o.status,
        statusLabel:  ORDER_STATUSES[o.status],
        eventType:    o.eventType,
        customerName: o.customerName,
        deliveredUrl: o.deliveredUrl,
        createdAt:    o.createdAt,
      })),
    });
  }

  // Sipariş numarası ile sorgulama
  const order = await getOrderByNumber(orderNumber);
  if (!order) {
    return NextResponse.json({ error: 'Sipariş bulunamadı' }, { status: 404 });
  }

  return NextResponse.json({
    orderNumber:  order.orderNumber,
    status:       order.status,
    statusLabel:  ORDER_STATUSES[order.status],
    eventType:    order.eventType,
    customerName: order.customerName,
    deliveredUrl: order.deliveredUrl,
    createdAt:    order.createdAt,
  });
}
