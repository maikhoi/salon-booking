import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  to: string,
  subject: string,
  html: string,
  bcc?: string
) => {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_USER || "Salon Booking <no-reply@katenails.beauty>",
      to,
      subject,
      html,
      bcc: bcc || process.env.LOG_EMAIL,
    });

    console.log("✅ Email sent successfully via Resend");
  } catch (error) {
    console.error("❌ Error sending email via Resend:", error);
  }
};
