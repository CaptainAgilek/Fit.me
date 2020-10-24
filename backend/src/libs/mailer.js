import nodemailer from 'nodemailer';

  export const sendEmail = async(from, to, subject, text)  => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      
    return await transporter.sendMail({
       from: from, // sender address
       to: to,
       subject: subject, // Subject line
       text: text, // plain text body
     });
  }
