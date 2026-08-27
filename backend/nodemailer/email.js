// import sgMail from "@sendgrid/mail";
// import dotenv from "dotenv";
// dotenv.config();
// sgMail.setApiKey(process.env.SENDGRID_API_KEY); // authenticate SendGrid

// export const sendEmail = async ({ to, subject, html,replyTo }) => {
//   const msg = {
//     to,
//     from: process.env.FROM_EMAIL,
//     subject,
//     html,
//     replyTo
//   };

//   try {
//     await sgMail.send(msg);
//     console.log("email send successfully");
//     return { success: true };
//   } catch (error) {
//     console.error("something went wrong", error);
//     if (error.response) {
//       console.error(error.response.body);
//     }
//     return { success: false, error };
//   }
// };

import nodemailer from "nodemailer";
import dotnenv from "dotenv";
dotnenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false,
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY,
  },
});

export default transporter;
