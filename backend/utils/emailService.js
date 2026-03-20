const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Créer un transporteur
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // 2) Définir les options de l'email
  const mailOptions = {
    from: `Data Consultance <${process.env.EMAIL_FROM}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html // envoyer au format HTML si souhaité
  };

  // 3) Envoyer l'email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
