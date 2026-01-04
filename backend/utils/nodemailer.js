// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_PASS,
//   },
// });

// const sendEmail = async ({to , subject , body})=> {
//     const response = await transporter.sendMail({
//         from: process.env.GMAIL_USER,
//         to,
//         subject,
//         html: body,
//     })
//     return response
// }

// export default sendEmail;

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,                 // 🔴 IMPORTANT
  secure: false,             // 🔴 MUST be false for 587
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, // 🔴 APP PASSWORD ONLY
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 10 * 1000, // 10 seconds
  greetingTimeout: 10 * 1000,
  socketTimeout: 10 * 1000
});

const sendEmail = async ({ to, subject, body }) => {
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to,
    subject,
    html: body
  });
};

export default sendEmail;
