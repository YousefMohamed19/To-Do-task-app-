// import module
import nodemailer from 'nodemailer';
import { hTMLTemplate } from './htmlTemplate.js';
// send email function
export const sendEmail = async (email,token) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: 'yousef01121977646@gmail.com',
          pass: 'zmrsalgqdymzcmob',
        },
      });
      // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Yousef Fadel" <yousef01121977646@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world", // plain text body
    html: hTMLTemplate(token), // html body
  });
  
}