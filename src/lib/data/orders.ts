/**
 * Sipariş veri erişim fonksiyonları — Supabase.
 */
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { generateOrderNumber } from '@/lib/utils';
import type { Order, OrderStatus } from '@/types';
import type { OrderFormValues } from '@/lib/validations';

function mapRow(row: Record<string, unknown>): Order {
  return {
    id:              row.id              as string,
    orderNumber:     row.order_number    as string,
    templateId:      (row.template_id    as string)  ?? null,
    status:          row.status          as OrderStatus,
    customerName:    row.customer_name   as string,
    customerEmail:   row.customer_email  as string,
    customerPhone:   row.customer_phone  as string,
    eventType:       row.event_type      as Order['eventType'],
    eventDate:       row.event_date      as string,
    eventTime:       (row.event_time     as string)  ?? '',
    eventLocation:   (row.event_location as string)  ?? '',
    eventVenue:      (row.event_venue    as string)  ?? '',
    groomName:       (row.groom_name     as string)  ?? '',
    brideName:       (row.bride_name     as string)  ?? '',
    customMessage:   (row.custom_message as string)  ?? '',
    additionalNotes: (row.additional_notes as string) ?? '',
    totalPrice:      Number(row.total_price),
    deliveredUrl:    (row.delivered_url  as string)  ?? null,
    createdAt:       row.created_at      as string,
    updatedAt:       row.updated_at      as string,
  };
}

/** Yeni sipariş oluştur */
export async function createOrder(data: OrderFormValues, totalPrice: number): Promise<{ order: Order | null; error: string | null }> {
  const supabase = createAdminClient();
  const orderNumber = generateOrderNumber();

  const { data: row, error } = await supabase
    .from('orders')
    .insert({
      order_number:    orderNumber,
      template_id:     data.templateId   ?? null,
      status:          'beklemede',
      customer_name:   data.customerName,
      customer_email:  data.customerEmail,
      customer_phone:  data.customerPhone,
      event_type:      data.eventType,
      event_date:      data.eventDate,
      event_time:      data.eventTime,
      event_location:  data.eventLocation,
      event_venue:     data.eventVenue,
      groom_name:      data.groomName,
      bride_name:      data.brideName,
      custom_message:  data.customMessage,
      additional_notes: data.additionalNotes,
      total_price:     totalPrice,
    })
    .select()
    .single();

  if (error) {
    console.error('createOrder error:', error);
    return { order: null, error: 'Sipariş oluşturulamadı. Lütfen tekrar deneyin.' };
  }

  return { order: mapRow(row as Record<string, unknown>), error: null };
}

/** Sipariş numarasına göre sorgula */
export async function getOrderByNumber(orderNumber: string): Promise<Order | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('order_number', orderNumber.toUpperCase())
    .single();

  if (error || !data) return null;
  return mapRow(data as Record<string, unknown>);
}

/** E-posta ile siparişleri sorgula */
export async function getOrdersByEmail(email: string): Promise<Order[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('customer_email', email.toLowerCase())
    .order('created_at', { ascending: false });

  if (error) return [];
  return (data ?? []).map((r) => mapRow(r as Record<string, unknown>));
}

/** Sipariş durumunu güncelle (admin) */
export async function updateOrderStatus(id: string, status: OrderStatus, deliveredUrl?: string): Promise<boolean> {
  const supabase = createAdminClient();
  const update: Record<string, unknown> = { status };
  if (deliveredUrl) update.delivered_url = deliveredUrl;

  const { error } = await supabase
    .from('orders')
    .update(update)
    .eq('id', id);

  return !error;
}
