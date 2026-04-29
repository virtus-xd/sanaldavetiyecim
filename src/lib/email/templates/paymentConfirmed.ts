interface PaymentConfirmedData {
  orderNumber:  string;
  customerName: string;
  siteUrl:      string;
}

export function paymentConfirmedHtml(data: PaymentConfirmedData): string {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ödeme Onayı</title>
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
                Ödemeniz Onaylandı!
              </h2>
              <p style="margin:0 0 24px;color:#555;font-size:15px;line-height:1.6;">
                Merhaba <strong>${data.customerName}</strong>,<br/>
                <strong>${data.orderNumber}</strong> numaralı siparişiniz için ödemeniz başarıyla onaylanmıştır.
                Davetiyeniz hazırlanmaya başlandı.
              </p>

              <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:20px;text-align:center;margin-bottom:24px;">
                <p style="margin:0;color:#16a34a;font-size:16px;font-weight:600;">
                  Davetiyeniz en kısa sürede hazır olacak!
                </p>
                <p style="margin:8px 0 0;color:#555;font-size:14px;">
                  Hazır olduğunda size e-posta ile bildirim göndereceğiz.
                </p>
              </div>

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

export function paymentConfirmedText(data: PaymentConfirmedData): string {
  return `Merhaba ${data.customerName},

${data.orderNumber} numaralı siparişiniz için ödemeniz onaylanmıştır.
Davetiyeniz hazırlanmaya başlandı. Hazır olduğunda size bilgi vereceğiz.

Sipariş takibi: ${data.siteUrl}/siparis-sorgula?siparis=${data.orderNumber}

Sanal Davetiye
`;
}
