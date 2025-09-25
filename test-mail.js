// test-mail.js
const nodemailer = require("nodemailer");
require("dotenv").config();

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

console.log("Email user:", user);
console.log("Email pass length:", pass ? pass.length : "MISSING");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user, pass },
  logger: true,
  debug: true,
});

async function main() {
  try {
    await transporter.verify();
    console.log("✅ SMTP connection success!");

    const info = await transporter.sendMail({
      from: `"Salon Booking Test" <${user}>`,
      to: user,
      subject: "Test Booking Email",
      text: "Hello! This is a test email from Nodemailer + Gmail.",
    });

    console.log("📧 Message sent:", info.messageId);
  } catch (err) {
    console.error("❌ SMTP connection failed:", err);
  }
}

main();
