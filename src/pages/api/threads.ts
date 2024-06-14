// Example enhanced error handling in /api/threads endpoint

import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'POST') {
            // Extract data from request body
            const { title, content } = req.body;

            // Example: Handle database operation or external API call
            const response = await fetch('https://backend-49sv.onrender.com/api/threads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            });

            if (!response.ok) {
                throw new Error('Failed to create thread');
            }

            const data = await response.json();
            return res.status(200).json({ data, message: 'Thread created successfully!' });
        } else {
            return res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error: any) {
        console.error('API request error:', error.message);
        return res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
};

export default handler;
