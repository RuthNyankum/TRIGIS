// import nodemailer from "nodemailer";

// /////only for production
// // const transporter = nodemailer.createTransport({
// //   host: "smtp.sendgrid.net",
// //   port: 587,
// //   auth: {
// //     user: "apikey", // this is literally the string "apikey"
// //     pass: process.env.SENDGRID_API_KEY, // your SendGrid API Key
// //   },
// // });

// const transporter = nodemailer.createTransport({
//   host: "sandbox.smtp.mailtrap.io", // Mailtrap SMTP
//   port: 2525,
//   auth: {
//     user: process.env.MAILTRAP_USER, // from your Mailtrap inbox
//     pass: process.env.MAILTRAP_PASS, // from your Mailtrap inbox
//   },
// });

// export const sendMail = async ({ to, subject, html }) => {
//   try {
//     await transporter.sendMail({
//       from: '"My App" <no-reply@myapp.com>', // sender
//       to, // recipient (user email)
//       subject,
//       html,
//     });
//     console.log("📩 Email sent successfully!");
//   } catch (err) {
//     console.error("❌ Error sending email:", err);
//     throw err;
//   }
// };

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

// Base sendMail function
export const sendMail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: '"TRIGIS Consult" <no-reply@trigisconsult.com>', // sender
      to, // recipient (user email)
      subject,
      html,
    });
    console.log("📩 Email sent successfully to:", to);
  } catch (err) {
    console.error("❌ Error sending email:", err);
    throw err;
  }
};

/**
 * Send admin notification email
 * @param {Object} contact - Contact object from database
 */
export const sendAdminNotification = async (contact) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(to right, #7c3aed, #eab308); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0;">New Contact Submission</h1>
      </div>
      
      <div style="padding: 30px; background-color: #ffffff; border: 1px solid #e5e7eb; border-top: none;">
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">📋 Contact Information</h3>
          <p><strong>Name:</strong> ${contact.firstName} ${contact.lastName}</p>
          <p><strong>Email:</strong> <a href="mailto:${contact.email}">${
    contact.email
  }</a></p>
          <p><strong>Phone:</strong> ${contact.phone || "Not provided"}</p>
          <p><strong>Company:</strong> ${contact.company || "Not provided"}</p>
        </div>

        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">💼 Project Details</h3>
          <p><strong>Service:</strong> ${contact.service}</p>
          <p><strong>Project Type:</strong> ${
            contact.projectType || "Not specified"
          }</p>
          <p><strong>Budget:</strong> ${contact.budget || "Not specified"}</p>
        </div>

        <div style="background-color: #e0e7ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">💬 Message</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${
            contact.message
          }</p>
        </div>

        <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #374151; margin-top: 0;">📊 Additional Info</h4>
          <p style="font-size: 13px; color: #6b7280; margin: 5px 0;">
            <strong>Submission ID:</strong> ${contact._id}
          </p>
          <p style="font-size: 13px; color: #6b7280; margin: 5px 0;">
            <strong>Submitted:</strong> ${new Date(
              contact.createdAt
            ).toLocaleString()}
          </p>
          <p style="font-size: 13px; color: #6b7280; margin: 5px 0;">
            <strong>IP Address:</strong> ${contact.ipAddress || "N/A"}
          </p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <a href="${
            process.env.ADMIN_DASHBOARD_URL || "http://localhost:3000/admin"
          }/contacts/${contact._id}" 
             style="display: inline-block; background: linear-gradient(to right, #7c3aed, #eab308); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
            View in Dashboard
          </a>
        </div>
      </div>

      <div style="padding: 20px; background-color: #f9fafb; border-radius: 0 0 8px 8px; text-align: center;">
        <p style="color: #6b7280; font-size: 12px; margin: 0;">
          This is an automated notification from TRIGIS Consult Contact Form
        </p>
      </div>
    </div>
  `;

  await sendMail({
    to: process.env.ADMIN_EMAIL || "hello@trigisconsult.com",
    subject: `🔔 New Contact Form Submission - ${contact.service}`,
    html,
  });

  console.log("✅ Admin notification sent");
};

/**
 * Send auto-reply to client
 * @param {Object} contact - Contact object from database
 */
export const sendClientAutoReply = async (contact) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(to right, #7c3aed, #eab308); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0;">TRIGIS Consult</h1>
        <p style="color: white; margin: 10px 0 0 0;">Content & Marketing Excellence</p>
      </div>
      
      <div style="padding: 30px; background-color: #ffffff; border: 1px solid #e5e7eb; border-top: none;">
        <h2 style="color: #374151; margin-top: 0;">Thank You, ${
          contact.firstName
        }! 🎉</h2>
        
        <p style="color: #6b7280; line-height: 1.8; font-size: 15px;">
          We've received your message and appreciate you reaching out to us. 
          Our team is excited to learn more about your project and help you achieve your goals.
        </p>

        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px; margin: 25px 0;">
          <h3 style="color: white; margin-top: 0;">⏱️ What Happens Next?</h3>
          <ul style="color: white; line-height: 1.8; margin: 0; padding-left: 20px;">
            <li>We'll carefully review your project details</li>
            <li>A dedicated team member will reach out within <strong>24 hours</strong></li>
            <li>We'll discuss your needs and provide a customized solution</li>
            <li>You'll receive a detailed proposal tailored to your goals</li>
          </ul>
        </div>

        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">📝 Your Submission Summary</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280;"><strong>Service:</strong></td>
              <td style="padding: 8px 0; color: #374151;">${
                contact.service
              }</td>
            </tr>
            ${
              contact.projectType
                ? `
            <tr>
              <td style="padding: 8px 0; color: #6b7280;"><strong>Project Type:</strong></td>
              <td style="padding: 8px 0; color: #374151;">${contact.projectType}</td>
            </tr>
            `
                : ""
            }
            ${
              contact.budget
                ? `
            <tr>
              <td style="padding: 8px 0; color: #6b7280;"><strong>Budget:</strong></td>
              <td style="padding: 8px 0; color: #374151;">${contact.budget}</td>
            </tr>
            `
                : ""
            }
            <tr>
              <td style="padding: 8px 0; color: #6b7280;"><strong>Submitted:</strong></td>
              <td style="padding: 8px 0; color: #374151;">${new Date(
                contact.createdAt
              ).toLocaleString()}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">💡 In the Meantime...</h3>
          <p style="color: #6b7280; line-height: 1.6; margin-bottom: 15px;">
            While you wait, feel free to explore our resources and learn more about how we can help transform your content strategy:
          </p>
          <ul style="color: #6b7280; line-height: 1.8; margin: 0; padding-left: 20px;">
            <li><a href="${
              process.env.WEBSITE_URL || "https://trigisconsult.com"
            }/blog" style="color: #7c3aed; text-decoration: none;">Read our latest blog posts</a></li>
            <li><a href="${
              process.env.WEBSITE_URL || "https://trigisconsult.com"
            }/portfolio" style="color: #7c3aed; text-decoration: none;">View our portfolio</a></li>
            <li><a href="${
              process.env.WEBSITE_URL || "https://trigisconsult.com"
            }/courses" style="color: #7c3aed; text-decoration: none;">Check out our courses</a></li>
          </ul>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
          <h3 style="color: #374151; margin-top: 0;">📞 Need Immediate Assistance?</h3>
          <p style="color: #6b7280; margin-bottom: 15px;">We're here to help!</p>
          <table style="width: 100%;">
            <tr>
              <td style="padding: 8px 0;">
                <span style="font-size: 20px;">📧</span>
                <strong style="color: #374151;"> Email:</strong>
                <a href="mailto:hello@trigisconsult.com" style="color: #7c3aed; text-decoration: none; margin-left: 10px;">hello@trigisconsult.com</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0;">
                <span style="font-size: 20px;">📱</span>
                <strong style="color: #374151;"> Phone:</strong>
                <a href="tel:+233241234567" style="color: #7c3aed; text-decoration: none; margin-left: 10px;">+233 24 123 4567</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0;">
                <span style="font-size: 20px;">💬</span>
                <strong style="color: #374151;"> WhatsApp:</strong>
                <a href="https://wa.me/233241234567" style="color: #7c3aed; text-decoration: none; margin-left: 10px;">+233 24 123 4567</a>
              </td>
            </tr>
          </table>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #6b7280; font-size: 14px; margin-bottom: 15px;">Follow us on social media:</p>
          <a href="#" style="display: inline-block; margin: 0 8px; color: #7c3aed; text-decoration: none;">LinkedIn</a> |
          <a href="#" style="display: inline-block; margin: 0 8px; color: #7c3aed; text-decoration: none;">Twitter</a> |
          <a href="#" style="display: inline-block; margin: 0 8px; color: #7c3aed; text-decoration: none;">Facebook</a> |
          <a href="#" style="display: inline-block; margin: 0 8px; color: #7c3aed; text-decoration: none;">Instagram</a>
        </div>
      </div>

      <div style="padding: 20px; background-color: #f9fafb; border-radius: 0 0 8px 8px; text-align: center;">
        <p style="color: #6b7280; font-size: 12px; margin: 5px 0;">
          © ${new Date().getFullYear()} TRIGIS Consult. All rights reserved.
        </p>
        <p style="color: #9ca3af; font-size: 11px; margin: 5px 0;">
          You're receiving this email because you submitted a contact form on our website.
        </p>
      </div>
    </div>
  `;

  await sendMail({
    to: contact.email,
    subject: "Thank You for Contacting TRIGIS Consult ✨",
    html,
  });

  console.log("✅ Client auto-reply sent to:", contact.email);
};

export default { sendMail, sendAdminNotification, sendClientAutoReply };
