import nodemailer from "nodemailer";

export const sendEmail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or "hotmail", etc.
    auth: {
      user: process.env.EMAIL_USER, // your Gmail
      pass: process.env.EMAIL_PASS, // app password (not your real Gmail password!)
    },
  });

  await transporter.sendMail({
    from: `"Salon Booking" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });

  transporter.verify(function(error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
    });
};
