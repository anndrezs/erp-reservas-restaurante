import nodemailer from 'nodemailer';

export const sendConfirmationEmail = async (to: string, reservationId: string, date: Date) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Confirmação de Reserva',
    html: `<p>Sua reserva foi criada com sucesso!</p><p>ID: ${reservationId}</p><p>Data: ${new Date(date).toLocaleString()}</p>`
  });
};