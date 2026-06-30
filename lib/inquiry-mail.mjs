const brand = {
  name: "Bertig Sanitär- und Heizungstechnik",
  navy: "#001e40",
  orange: "#ea7a1e",
  warm: "#f4b324",
  linen: "#fef8f3",
  muted: "#5f6670",
};

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function textToHtml(value) {
  return escapeHtml(value).replaceAll("\n", "<br>");
}

function renderRows(rows) {
  return rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 0;width:180px;color:${brand.muted};font-size:14px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:8px 0;color:#111827;font-size:15px;font-weight:600;vertical-align:top;">${textToHtml(value || "nicht angegeben")}</td>
        </tr>
      `,
    )
    .join("");
}

export function buildInquiryHtml({ title, eyebrow, summary, sections }) {
  return `
    <!doctype html>
    <html>
      <body style="margin:0;padding:0;background:${brand.linen};font-family:Arial,Helvetica,sans-serif;color:#111827;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${brand.linen};padding:24px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="background:${brand.navy};padding:22px 28px;color:#ffffff;">
                    <div style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#d7dee8;">${escapeHtml(brand.name)}</div>
                    <div style="font-size:13px;color:${brand.warm};margin-top:6px;">${escapeHtml(eyebrow)}</div>
                    <div style="font-size:22px;line-height:1.25;font-weight:700;margin-top:8px;">${escapeHtml(title)}</div>
                    <div style="height:4px;background:${brand.orange};width:88px;margin-top:18px;border-radius:4px;"></div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px 28px 6px;">
                    <p style="margin:0 0 18px;color:${brand.muted};font-size:15px;line-height:1.5;">${escapeHtml(summary)}</p>
                  </td>
                </tr>
                ${sections
                  .map(
                    (section) => `
                      <tr>
                        <td style="padding:10px 28px 20px;">
                          <h2 style="margin:0 0 10px;color:${brand.navy};font-size:17px;line-height:1.3;">${escapeHtml(section.title)}</h2>
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #e5e7eb;">
                            ${renderRows(section.rows)}
                          </table>
                        </td>
                      </tr>
                    `,
                  )
                  .join("")}
                <tr>
                  <td style="padding:18px 28px 24px;background:#f8fafc;color:${brand.muted};font-size:13px;line-height:1.5;">
                    Diese Anfrage wurde über heizung-rügen.de gesendet. Wenn eine E-Mail-Adresse angegeben wurde, kann direkt auf diese Nachricht geantwortet werden.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}
