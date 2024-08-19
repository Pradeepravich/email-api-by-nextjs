// pages/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail password or App password
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO, // The email address to receive the contact form submission
        subject: `New contact form submission from ${name}`,
        text: `You have a new contact form submission from:
        Name: ${name}
        Email: ${email}
        Message: ${message}`,
      });

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to send email.' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
