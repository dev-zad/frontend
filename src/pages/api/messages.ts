import { NextApiRequest, NextApiResponse } from 'next';

const STRAPI_API_URL = process.env.STRAPI_API_URL || 'http://127.0.0.1:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, username, name, leader, tribe, message } = req.body;

    try {
      const response = await fetch(`${STRAPI_API_URL}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        },
        body: JSON.stringify({ data: { email, username, name, leader, tribe, message } })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      return res.status(201).json(responseData);

    } catch (error) {
      console.error('Error sending message:', error);
      return res.status(500).json({ error: 'Failed to send message.' });
    }
  } else if (req.method === 'GET') {
    try {
      const response = await fetch(`${STRAPI_API_URL}/api/messages`, {
        headers: {
          'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      return res.status(200).json(responseData.data);

    } catch (error) {
      console.error('Error fetching messages:', error);
      return res.status(500).json({ error: 'Failed to fetch messages.' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;

    try {
      const response = await fetch(`${STRAPI_API_URL}/api/messages/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return res.status(200).json({ success: true });

    } catch (error) {
      console.error('Error deleting message:', error);
      return res.status(500).json({ error: 'Failed to delete message.' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
