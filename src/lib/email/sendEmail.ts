import { getResend, FROM_ADDRESS, ADMIN_EMAIL } from './resend';
import { orderConfirmationHtml, orderConfirmationText } from './templates/orderConfirmation';
import { adminNewOrderHtml, adminNewOrderText }         from './templates/adminNewOrder';
import { orderDeliveredHtml, orderDeliveredText }       from './templates/orderDelivered';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sanaldavetiyecim.com';

/* ─── Sipariş onayı — müşteriye ─── */
export async function sendOrderConfirmation(order: {
  orderNumber:  string;
  customerName: string;
  customerEmail:string;
  eventType:    string;
  eventDate:    string;
  templateName: string;
  totalPrice:   number;
}) {
  const data = { ...order, siteUrl: SITE_URL };
  return getResend().emails.send({
    from:    FROM_ADDRESS,
    to:      order.customerEmail,
    subject: `Siparişiniz Alındı — ${order.orderNumber}`,
    html:    orderConfirmationHtml(data),
    text:    orderConfirmationText(data),
  });
}

/* ─── Yeni sipariş bildirimi — admine ─── */
export async function sendAdminNewOrder(order: {
  orderNumber:   string;
  customerName:  string;
  customerEmail: string;
  customerPhone: string;
  eventType:     string;
  eventDate:     string;
  templateName:  string;
  totalPrice:    number;
  notes?:        string;
}) {
  const data = { ...order, siteUrl: SITE_URL };
  return getResend().emails.send({
    from:    FROM_ADDRESS,
    to:      ADMIN_EMAIL,
    subject: `🛍️ Yeni Sipariş: ${order.orderNumber} — ${order.customerName}`,
    html:    adminNewOrderHtml(data),
    text:    adminNewOrderText(data),
  });
}

/* ─── Davetiye teslim bildirimi — müşteriye ─── */
export async function sendOrderDelivered(params: {
  orderNumber:   string;
  customerName:  string;
  customerEmail: string;
  deliveredUrl:  string;
}) {
  const data = { ...params, siteUrl: SITE_URL };
  return getResend().emails.send({
    from:    FROM_ADDRESS,
    to:      params.customerEmail,
    subject: `Davetiyeniz Hazır! ✨ — ${params.orderNumber}`,
    html:    orderDeliveredHtml(data),
    text:    orderDeliveredText(data),
  });
}
