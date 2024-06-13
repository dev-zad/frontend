// src/pages/api/events.ts
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    if (method === 'POST') {
        const { name, date, description } = req.body;

        try {
            const response = await fetch(`${process.env.STRAPI_API_URL}/api/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
                },
                body: JSON.stringify({
                    data: {
                        name,
                        date,
                        description,
                    },
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                return res.status(response.status).json(data);
            }

            return res.status(201).json(data);
        } catch (error) {
            console.error('Error creating event:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
};

export default handler;
