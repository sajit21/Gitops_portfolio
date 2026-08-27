import transporter from "../nodemailer/email.js";
import dotenv from "dotenv";
dotenv.config();

export const contactSent = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required",
      });
    }

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>New Contact Form Submission</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #2c3e50;">Message:</h3>
            <p style="background-color: #ffffff; padding: 15px; border-left: 4px solid #3498db; border-radius: 3px;">
              ${message}
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="font-size: 12px; color: #666;">
            This email was sent from your portfolio contact form.
          </p>
        </div>
      </body>
      </html>
    `;

    const result = await transporter.sendMail({
      from: {
        name: "Portfolio Contact Form",
        address: process.env.FROM_EMAIL
      },
      to: "sajitmhr12@gmail.com",
      subject: `New Portfolio Contact: ${name}`,
      html: content,
      replyTo: {
        name: name,
        address: email
      },
      // Add these headers to improve deliverability
      headers: {
        'X-Priority': '3',
        'X-Mailer': 'Portfolio Contact Form',
        'Reply-To': email
      }
    });

    console.log("Email sent:", result.messageId);
    return res.status(201).json({
      success: true,
      message: "Email sent successfully!",
    });

  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email. Please try again.",
    });
  }
};