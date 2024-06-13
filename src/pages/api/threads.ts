// Example of handling server-side components in a Next.js API route

import { NextApiRequest, NextApiResponse } from 'next';
import { threadList } from '@/data/thread';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'GET') {
            // Simulate fetching data from a database or API
            return res.status(200).json({ data: threadList });
        } else {
            return res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error: any) { // Explicitly define the type of 'error' as 'any'
        console.error('API request error:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default handler;
