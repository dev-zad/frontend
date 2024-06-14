// pages/api/threads.ts
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'GET') {
            const response = await fetch('http://127.0.0.1:1337/threads');
            if (!response.ok) {
                throw new Error('Failed to fetch threads');
            }
            const data = await response.json();
            return res.status(200).json(data);
        } else if (req.method === 'POST') {
            const { title, content } = req.body;

            const response = await fetch('http://127.0.0.1:1337/api/threads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    content,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create thread');
            }

            const data = await response.json();
            return res.status(200).json({ data, message: 'Thread created successfully' });
        } else {
            return res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error: any) {
        console.error('API request error:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default handler;
