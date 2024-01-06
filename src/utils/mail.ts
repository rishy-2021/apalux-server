import nodemailer, { Transporter } from 'nodemailer';

// Define the type for the email options
interface MailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
}

// Function to send email to the user
export const sendingMail = async ({ from, to, subject, text }: MailOptions): Promise<void> => {
  try {
    // Create mail options
    const mailOptions: MailOptions = {
      from,
      to,
      subject,
      text,
    };

    const transporter: Transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
      },
    });

    // Send the mail using the transporter and mail options
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};
