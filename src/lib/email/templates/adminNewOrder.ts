import { formatPrice } from '@/lib/utils';
import { EVENT_TYPES } from '@/lib/constants';
import type { EventType } from '@/types';

interface AdminNewOrderData {
  orderNumber:   string;
  customerName:  string;
  customerEmail: string;
  customerPhone: string;
  eventType:     string;
  eventDate:     string;
  templateName:  string;
  totalPrice:    number;
  notes?:        string;
  siteUrl:       string;
}

export function adminNewOrderHtml(data: AdminNewOrderData): string {
  const eventLabel = EVENT_TYPES[data.eventType as EventType] ?? data.eventType;

  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <title>Yeni Sipariş</title>
</head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">

          <tr>
            <td style="background:#1a1a1a;padding:24px 40px;">
              <h1 style="margin:0;color:#ffffff;font-size:18px;">
                🛍️ Yeni Sipariş — ${data.orderNumber}
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #eee;">
                    <span style="color:#888;font-size:13px;display:block;">Müşteri</span>
                    <strong style="color:#1a1a1a;">${data.customerName}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #eee;">
                    <span style="color:#888;font-size:13px;display:block;">E-posta</span>
                    <a href="mailto:${data.customerEmail}" style="color:#B8860B;">${data.customerEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #eee;">
                    <span style="color:#888;font-size:13px;display:block;">Telefon</span>
                    <a href="tel:${data.customerPhone}" style="color:#1a1a1a;">${data.customerPhone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #eee;">
                    <span style="color:#888;font-size:13px;display:block;">Etkinlik</span>
                    <strong style="color:#1a1a1a;">${eventLabel} — ${data.eventDate}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #eee;">
                    <span style="color:#888;font-size:13px;display:block;">Tasarım</span>
                    <strong style="color:#1a1a1a;">${data.templateName}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #eee;">
                    <span style="color:#888;font-size:13px;display:block;">Tutar</span>
                    <strong style="color:#B8860B;font-size:18px;">${formatPrice(data.totalPrice)}</strong>
                  </td>
                </tr>
                ${data.notes ? `
                <tr>
                  <td style="padding:8px 0;">
                    <span style="color:#888;font-size:13px;display:block;">Notlar</span>
                    <span style="color:#1a1a1a;">${data.notes}</span>
                  </td>
                </tr>` : ''}
              </table>

              <div style="text-align:center;margin-top:32px;">
                <a href="${data.siteUrl}/admin/siparisler"
                   style="display:inline-block;background:#1a1a1a;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:600;">
                  Admin Panele Git
                </a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function adminNewOrderText(data: AdminNewOrderData): string {
  const eventLabel = EVENT_TYPES[data.eventType as EventType] ?? data.eventType;
  return `Yeni sipariş: ${data.orderNumber}

Müşteri  : ${data.customerName}
E-posta  : ${data.customerEmail}
Telefon  : ${data.customerPhone}
Etkinlik : ${eventLabel} — ${data.eventDate}
Tasarım  : ${data.templateName}
Tutar    : ${formatPrice(data.totalPrice)}
${data.notes ? `Notlar   : ${data.notes}` : ''}

Admin paneli: ${data.siteUrl}/admin/siparisler
`;
}
