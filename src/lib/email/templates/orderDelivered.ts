interface OrderDeliveredData {
  orderNumber:  string;
  customerName: string;
  deliveredUrl: string;
  siteUrl:      string;
}

export function orderDeliveredHtml(data: OrderDeliveredData): string {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <title>Davetiyeniz Hazır</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f0;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <tr>
            <td style="background:#B8860B;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">
                Sanal Davetiye
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding:40px;text-align:center;">
              <div style="font-size:48px;margin-bottom:16px;">✨</div>
              <h2 style="margin:0 0 12px;color:#1a1a1a;font-size:22px;">
                Davetiyeniz Hazır!
              </h2>
              <p style="margin:0 0 32px;color:#555;font-size:15px;line-height:1.6;">
                Merhaba <strong>${data.customerName}</strong>,<br/>
                Dijital davetiyeniz hazırlandı ve yayına alındı. Aşağıdaki butona tıklayarak
                davetiyenizi görüntüleyebilir ve misafirlerinizle paylaşabilirsiniz.
              </p>

              <a href="${data.deliveredUrl}"
                 style="display:inline-block;background:#B8860B;color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:8px;font-size:16px;font-weight:700;letter-spacing:0.3px;">
                Davetiyemi Görüntüle
              </a>

              <p style="margin:32px 0 0;color:#aaa;font-size:13px;">
                Sipariş No: <span style="font-family:monospace;">${data.orderNumber}</span>
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 40px 24px;background:#fdf8f0;">
              <p style="margin:0;color:#888;font-size:13px;line-height:1.6;text-align:center;">
                Davetiye linkinizi güvenli bir yerde saklayın. Herhangi bir sorun için
                <a href="${data.siteUrl}/iletisim" style="color:#B8860B;">bizimle iletişime geçin</a>.
              </p>
            </td>
          </tr>

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

export function orderDeliveredText(data: OrderDeliveredData): string {
  return `Merhaba ${data.customerName},

Davetiyeniz hazır! 🎉

Davetiye linkiniz: ${data.deliveredUrl}

Sipariş No: ${data.orderNumber}

Herhangi bir sorun için: ${data.siteUrl}/iletisim

Sanal Davetiye
`;
}
