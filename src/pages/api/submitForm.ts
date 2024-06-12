import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, fullName, tribe, leader } = req.body;
        console.log('Form data:', { email, fullName, tribe, leader });

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        let mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: `Form Submission - ${fullName}, ${tribe}, ${leader}`,
            text: `Form submitted successfully by ${fullName}.
                    Email: ${email}
                    Tribe: ${tribe}
                    Leader: ${leader}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: 'Error sending email' });
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(200).json({ message: 'Form submitted successfully' });
            }
        });
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
