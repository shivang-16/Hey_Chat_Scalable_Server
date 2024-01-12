import nodemailer from "nodemailer";

const sendMail = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    service: process.env.SMTP_SERVICE,
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: subject,
    html: message,
  });
};

export default sendMail;
