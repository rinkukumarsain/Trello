//  MailService.jsx

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_PASSWORD, 
  },
});

const sendMail = async (to, subject, text) => {
  try {
    const mailOption = {
      from: process.env.NODE_MAILER_EMAIL,
      to,
      subject,
      text,
    };
    const result = await transporter.sendMail(mailOption);
    console.log("Email sent");
    return result;
  } catch (err) {
    console.log('Error sending email', err);
    throw err;
  }
};

module.exports = sendMail;
