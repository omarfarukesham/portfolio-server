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
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#f0fdf4; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0fdf4; padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 6px 30px rgba(34,197,94,0.15);">

          <!-- Top Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #86efac 0%, #4ade80 100%); padding:10px 40px; text-align:center;">
              <p style="margin:0; color:#064e3b; font-size:13px; font-weight:600; letter-spacing:2px; text-transform:uppercase;">
                Fire Safety Education
              </p>
            </td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); padding:40px 40px 36px; text-align:center; border-bottom:3px solid #4ade80;">
              <h1 style="margin:0; color:#064e3b; font-size:32px; font-weight:800; letter-spacing:0.5px;">
                LearnSafety
              </h1>
              <p style="margin:10px 0 0; color:#166534; font-size:14px; font-weight:500;">
                Learn. Protect. Save Lives.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:44px 40px 32px;">

              <!-- Success Badge -->
              <div style="text-align:center; margin-bottom:28px;">
                <div style="display:inline-block; background-color:#dcfce7; border:3px solid #22c55e; border-radius:50%; width:80px; height:80px; line-height:74px; font-size:40px; color:#15803d; text-align:center; font-weight:bold;">
                  &#10003;
                </div>
              </div>

              <h2 style="margin:0 0 10px; color:#064e3b; font-size:24px; text-align:center; font-weight:800;">
                Congratulations!
              </h2>
              <p style="margin:0 0 32px; color:#4b5563; font-size:15px; text-align:center; line-height:1.6;">
                Your payment is verified. Your ebook is ready to download.
              </p>

              <!-- Customer Greeting -->
              <p style="margin:0 0 18px; color:#1f2937; font-size:16px; line-height:1.7;">
                Dear <strong style="color:#15803d;">${customerName}</strong>,
              </p>
              <p style="margin:0 0 24px; color:#4b5563; font-size:15px; line-height:1.8;">
                Thank you for trusting LearnSafety! We're excited to have you on your journey to mastering fire safety. Your knowledge today could save lives tomorrow.
              </p>

              <!-- Ebook Card -->
              <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-left:4px solid #22c55e; border-radius:10px; padding:24px 26px; margin-bottom:32px;">
                <p style="margin:0 0 6px; color:#166534; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px;">
                  Your Ebook
                </p>
                <p style="margin:0; color:#064e3b; font-size:19px; font-weight:700; line-height:1.4;">
                  ${ebookTitle}
                </p>
              </div>

              <!-- Download Button -->
              <div style="text-align:center; margin:36px 0 28px;">
                <a href="${downloadUrl}"
                   style="display:inline-block; background:linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color:#ffffff; text-decoration:none; padding:17px 52px; border-radius:10px; font-size:16px; font-weight:700; letter-spacing:0.5px; box-shadow:0 6px 18px rgba(34,197,94,0.35);">
                  Download Ebook (PDF)
                </a>
              </div>

              <p style="margin:24px 0 0; color:#6b7280; font-size:12px; line-height:1.7; text-align:center;">
                Having trouble? Copy this link into your browser:<br/>
                <a href="${downloadUrl}" style="color:#16a34a; word-break:break-all;">${downloadUrl}</a>
              </p>

            </td>
          </tr>

          <!-- Author Section -->
          <tr>
            <td style="padding:0 40px 32px;">
              <div style="border-top:1px solid #e5e7eb; padding-top:28px; text-align:center;">
                <p style="margin:0 0 6px; color:#6b7280; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:1.5px;">
                  Written by
                </p>
                <p style="margin:0 0 4px; color:#064e3b; font-size:19px; font-weight:700;">
                  Omar Faruk
                </p>
                <p style="margin:0 0 18px; color:#6b7280; font-size:13px;">
                  Fire Safety Trainer &amp; Educator
                </p>

                <!-- Social Links -->
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                  <tr>
                    <td style="padding:0 6px;">
                      <a href="https://www.facebook.com/learnsafetybd" style="display:inline-block; background-color:#1877f2; color:#ffffff; text-decoration:none; padding:9px 16px; border-radius:6px; font-size:12px; font-weight:600;">
                        Facebook
                      </a>
                    </td>
                    <td style="padding:0 6px;">
                      <a href="https://www.linkedin.com/in/omar-trainer/" style="display:inline-block; background-color:#0a66c2; color:#ffffff; text-decoration:none; padding:9px 16px; border-radius:6px; font-size:12px; font-weight:600;">
                        LinkedIn
                      </a>
                    </td>
                    <td style="padding:0 6px;">
                      <a href="https://www.youtube.com/watch?v=OevJGqgkmEI" style="display:inline-block; background-color:#ff0000; color:#ffffff; text-decoration:none; padding:9px 16px; border-radius:6px; font-size:12px; font-weight:600;">
                        YouTube
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="margin:20px 0 0; color:#6b7280; font-size:13px; line-height:1.6;">
                  Follow for more safety tips, training videos, and updates!
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#064e3b; padding:26px 40px; text-align:center;">
              <p style="margin:0 0 6px; color:#bbf7d0; font-size:13px; font-weight:600;">
                Thank you for choosing LearnSafety
              </p>
              <p style="margin:0; color:#86efac; font-size:11px;">
                &copy; ${new Date().getFullYear()} LearnSafety. All rights reserved. | Need help? Reply to this email.
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
    from: `"LearnSafety - Omar Faruk" <${config.smtp.user}>`,
    to,
    subject: `Your Ebook is Ready - ${ebookTitle}`,
    html,
  })
}
