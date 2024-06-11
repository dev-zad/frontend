import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // Handle form submission logic here
        const { email, fullName, tribe, leader } = req.body;
        console.log('Form data:', { email, fullName, tribe, leader });

        // Create a Nodemailer transporter
        let transporter = nodemailer.createTransport({
            service: 'gmail', // replace with your email service
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        // Set up email data
        let mailOptions = {
            from: process.env.EMAIL_USERNAME, // sender address
            to: email, // list of receivers
            // Subject line with form details
            subject: `Form Submission - ${fullName}, ${tribe}, ${leader}`,
            // Text body with form details
            text: `Form submitted successfully by ${fullName}.
                    Email: ${email}
                    Tribe: ${tribe}
                    Leader: ${leader}`
        };

        // Send email
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
        // Method Not Allowed
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
