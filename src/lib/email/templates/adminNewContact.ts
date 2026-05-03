interface AdminNewContactData {
  name:    string;
  email:   string;
  phone?:  string | null;
  message: string;
  siteUrl: string;
}

export function adminNewContactHtml(data: AdminNewContactData): string {
  const safeMessage = data.message.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br />');

  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <title>Yeni İletişim Mesajı</title>
</head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">

          <tr>
            <td style="background:#1a1a1a;padding:24px 40px;">
              <h1 style="margin:0;color:#ffffff;font-size:18px;">
                ✉️ Yeni İletişim Mesajı
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #eee;">
                    <span style="color:#888;font-size:13px;display:block;">Ad Soyad</span>
                    <strong style="color:#1a1a1a;">${data.name}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #eee;">
                    <span style="color:#888;font-size:13px;display:block;">E-posta</span>
                    <a href="mailto:${data.email}" style="color:#B8860B;">${data.email}</a>
                  </td>
                </tr>
                ${data.phone ? `
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #eee;">
                    <span style="color:#888;font-size:13px;display:block;">Telefon</span>
                    <a href="tel:${data.phone}" style="color:#1a1a1a;">${data.phone}</a>
                  </td>
                </tr>` : ''}
                <tr>
                  <td style="padding:16px 0;">
                    <span style="color:#888;font-size:13px;display:block;margin-bottom:8px;">Mesaj</span>
                    <div style="background:#f7f7f5;border-left:3px solid #B8860B;padding:14px 16px;border-radius:6px;color:#1a1a1a;line-height:1.6;">
                      ${safeMessage}
                    </div>
                  </td>
                </tr>
              </table>

              <div style="text-align:center;margin-top:24px;">
                <a href="${data.siteUrl}/admin/mesajlar"
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

export function adminNewContactText(data: AdminNewContactData): string {
  return `Yeni iletişim mesajı

Ad Soyad : ${data.name}
E-posta  : ${data.email}
${data.phone ? `Telefon  : ${data.phone}\n` : ''}
Mesaj:
${data.message}

Admin paneli: ${data.siteUrl}/admin/mesajlar
`;
}
