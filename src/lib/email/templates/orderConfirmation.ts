import { formatPrice } from '@/lib/utils';
import { EVENT_TYPES } from '@/lib/constants';
import type { EventType } from '@/types';

interface OrderConfirmationData {
  orderNumber:   string;
  customerName:  string;
  eventType:     string;
  eventDate:     string;
  templateName:  string;
  totalPrice:    number;
  siteUrl:       string;
}

export function orderConfirmationHtml(data: OrderConfirmationData): string {
  const eventLabel = EVENT_TYPES[data.eventType as EventType] ?? data.eventType;

  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sipariş Onayı</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f0;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#B8860B;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:0.5px;">
                Sanal Davetiye
              </h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">
                dijital davetiye hizmetleri
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h2 style="margin:0 0 8px;color:#1a1a1a;font-size:20px;">
                Siparişiniz Alındı! 🎉
              </h2>
              <p style="margin:0 0 24px;color:#555;font-size:15px;line-height:1.6;">
                Merhaba <strong>${data.customerName}</strong>,<br/>
                Siparişiniz başarıyla alındı. Ekibimiz en kısa sürede hazırlamaya başlayacak.
              </p>

              <!-- Order Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#fdf8f0;border-radius:8px;padding:24px;margin-bottom:24px;">
                <tr>
                  <td style="padding:6px 0;">
                    <span style="color:#888;font-size:13px;">Sipariş No</span><br/>
                    <strong style="color:#1a1a1a;font-size:15px;font-family:monospace;">${data.orderNumber}</strong>
                  </td>
                </tr>
                <tr><td style="border-top:1px solid #eee;padding:6px 0 0;margin-top:6px;"></td></tr>
                <tr>
                  <td style="padding:6px 0;">
                    <span style="color:#888;font-size:13px;">Etkinlik Türü</span><br/>
                    <strong style="color:#1a1a1a;font-size:15px;">${eventLabel}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;">
                    <span style="color:#888;font-size:13px;">Etkinlik Tarihi</span><br/>
                    <strong style="color:#1a1a1a;font-size:15px;">${data.eventDate}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;">
                    <span style="color:#888;font-size:13px;">Seçilen Tasarım</span><br/>
                    <strong style="color:#1a1a1a;font-size:15px;">${data.templateName}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;">
                    <span style="color:#888;font-size:13px;">Toplam Tutar</span><br/>
                    <strong style="color:#B8860B;font-size:18px;">${formatPrice(data.totalPrice)}</strong>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 24px;color:#555;font-size:14px;line-height:1.6;">
                Siparişinizin durumunu takip etmek için aşağıdaki bağlantıyı kullanabilirsiniz:
              </p>

              <div style="text-align:center;margin-bottom:32px;">
                <a href="${data.siteUrl}/siparis-sorgula?siparis=${data.orderNumber}"
                   style="display:inline-block;background:#B8860B;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:15px;font-weight:600;">
                  Sipariş Durumunu Takip Et
                </a>
              </div>

              <p style="margin:0;color:#999;font-size:13px;line-height:1.6;">
                Herhangi bir sorunuz için
                <a href="${data.siteUrl}/iletisim" style="color:#B8860B;">iletişim sayfamızdan</a>
                bize ulaşabilirsiniz.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9f9f9;padding:20px 40px;border-top:1px solid #eee;text-align:center;">
              <p style="margin:0;color:#aaa;font-size:12px;">
                © ${new Date().getFullYear()} Sanal Davetiye · sanaldavetiyecim.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function orderConfirmationText(data: OrderConfirmationData): string {
  const eventLabel = EVENT_TYPES[data.eventType as EventType] ?? data.eventType;
  return `Merhaba ${data.customerName},

Siparişiniz alındı!

Sipariş No   : ${data.orderNumber}
Etkinlik     : ${eventLabel}
Tarih        : ${data.eventDate}
Tasarım      : ${data.templateName}
Tutar        : ${formatPrice(data.totalPrice)}

Sipariş takibi: ${data.siteUrl}/siparis-sorgula?siparis=${data.orderNumber}

Sanal Davetiye
`;
}
