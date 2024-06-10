import { NextApiRequest, NextApiResponse } from 'next';

const STRAPI_API_URL = process.env.STRAPI_API_URL || 'http://127.0.0.1:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Request method:', req.method);

  try {
    if (req.method === 'POST') {
      const { email, name, number, gender, leader, tribe, message, profile_picture } = req.body;
      console.log('POST request body:', req.body);

      const response = await fetch(`${STRAPI_API_URL}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        },
        body: JSON.stringify({ data: { email, name, number, gender, leader, tribe, message, profile_picture } })
      });

      console.log('POST response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('POST response error:', errorText);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      return res.status(201).json(responseData);
    } else if (req.method === 'GET') {
      console.log('GET request');

      const response = await fetch(`${STRAPI_API_URL}/api/messages?populate=*`, {
        headers: {
          'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
      });

      console.log('GET response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('GET response error:', errorText);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      return res.status(200).json(responseData.data);
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      console.log('DELETE request id:', id);

      const response = await fetch(`${STRAPI_API_URL}/api/messages/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
      });

      console.log('DELETE response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('DELETE response error:', errorText);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return res.status(200).json({ success: true });
    } else {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
