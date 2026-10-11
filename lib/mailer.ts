import nodemailer from "nodemailer";

interface EmailPayload {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendLiveEmail({ to, subject, text, html }: EmailPayload) {
  const host = process.env.SMTP_HOST || "smtp.hostinger.com";
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER || "info@poljobhub.pl";
  const pass = process.env.SMTP_PASS;

  // If live credentials are not yet entered in .env, simulate successful dispatch in dev mode
  if (!pass || pass === "your_email_password_here") {
    console.log(`[SIMULATED DISPATCH] To: ${to} | Subject: ${subject}`);
    return { success: true, simulated: true };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass
    }
  });

  const info = await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME || 'PolJobHub Desk'}" <${user}>`,
    to,
    subject,
    text,
    html: html || text.replace(/\n/g, "<br/>")
  });

  return { success: true, messageId: info.messageId };
}
