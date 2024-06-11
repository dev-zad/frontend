
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // Handle form submission logic here
        const { email, fullName, tribe, leader } = req.body;
        console.log('Form data:', { email, fullName, tribe, leader });

        // You can process the form data further (e.g., send an email, save to database, etc.)

        return res.status(200).json({ message: 'Form submitted successfully' });
    } else {
        // Method Not Allowed
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
