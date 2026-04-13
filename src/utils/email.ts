import nodemailer from 'nodemailer'
import config from '../config'

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.port === 465,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
})

interface EbookEmailPayload {
  to: string
  customerName: string
  ebookTitle: string
  downloadUrl: string
}

export const sendEbookEmail = async (payload: EbookEmailPayload) => {
  const { to, customerName, ebookTitle, downloadUrl } = payload

  const html = `
<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#f4f7fa; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f7fa; padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #e63946 0%, #d62828 100%); padding:36px 40px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:26px; font-weight:700; letter-spacing:0.5px;">
                LearnSafety
              </h1>
              <p style="margin:8px 0 0; color:rgba(255,255,255,0.9); font-size:14px;">
                Fire Safety Education
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">

              <!-- Congratulations Badge -->
              <div style="text-align:center; margin-bottom:32px;">
                <div style="display:inline-block; background-color:#f0fdf4; border:2px solid #22c55e; border-radius:50%; width:72px; height:72px; line-height:72px; font-size:36px; text-align:center;">
                  &#10003;
                </div>
              </div>

              <h2 style="margin:0 0 8px; color:#1a1a2e; font-size:22px; text-align:center; font-weight:700;">
                Payment Confirmed!
              </h2>
              <p style="margin:0 0 28px; color:#6b7280; font-size:15px; text-align:center;">
                Congratulations, your ebook is ready to download
              </p>

              <!-- Customer Info -->
              <p style="margin:0 0 20px; color:#374151; font-size:15px; line-height:1.7;">
                Dear <strong>${customerName}</strong>,
              </p>
              <p style="margin:0 0 20px; color:#374151; font-size:15px; line-height:1.7;">
                Thank you for your purchase! Your payment has been verified and your ebook is now ready for download.
              </p>

              <!-- Ebook Card -->
              <div style="background-color:#fef9f0; border:1px solid #fbbf24; border-radius:10px; padding:24px; margin-bottom:28px;">
                <p style="margin:0 0 4px; color:#92400e; font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:1px;">
                  Your Ebook
                </p>
                <p style="margin:0; color:#1a1a2e; font-size:18px; font-weight:700;">
                  ${ebookTitle}
                </p>
              </div>

              <!-- Download Button -->
              <div style="text-align:center; margin:32px 0;">
                <a href="${downloadUrl}"
                   style="display:inline-block; background:linear-gradient(135deg, #e63946 0%, #d62828 100%); color:#ffffff; text-decoration:none; padding:16px 48px; border-radius:8px; font-size:16px; font-weight:700; letter-spacing:0.5px; box-shadow:0 4px 14px rgba(230,57,70,0.35);">
                  Download Ebook (PDF)
                </a>
              </div>

              <p style="margin:28px 0 0; color:#6b7280; font-size:13px; line-height:1.7; text-align:center;">
                If the button doesn't work, copy and paste this link into your browser:<br/>
                <a href="${downloadUrl}" style="color:#e63946; word-break:break-all;">${downloadUrl}</a>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f9fafb; padding:28px 40px; border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 8px; color:#6b7280; font-size:13px; text-align:center;">
                Need help? Reply to this email or contact us.
              </p>
              <p style="margin:0; color:#9ca3af; font-size:12px; text-align:center;">
                &copy; ${new Date().getFullYear()} LearnSafety. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  await transporter.sendMail({
    from: `"LearnSafety" <${config.smtp.user}>`,
    to,
    subject: `Your Ebook is Ready - ${ebookTitle}`,
    html,
  })
}
