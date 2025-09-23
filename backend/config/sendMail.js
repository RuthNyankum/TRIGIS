import nodemailer from "nodemailer";

/////only for production
// const transporter = nodemailer.createTransport({
//   host: "smtp.sendgrid.net",
//   port: 587,
//   auth: {
//     user: "apikey", // this is literally the string "apikey"
//     pass: process.env.SENDGRID_API_KEY, // your SendGrid API Key
//   },
// });

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io", // Mailtrap SMTP
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER, // from your Mailtrap inbox
    pass: process.env.MAILTRAP_PASS, // from your Mailtrap inbox
  },
});

export const sendMail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: '"My App" <no-reply@myapp.com>', // sender
      to, // recipient (user email)
      subject,
      html,
    });
    console.log("📩 Email sent successfully!");
  } catch (err) {
    console.error("❌ Error sending email:", err);
    throw err;
  }
};
