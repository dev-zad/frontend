import { NextApiRequest, NextApiResponse } from 'next';

const STRAPI_API_URL = process.env.STRAPI_API_URL || 'https://backend-49sv.onrender.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_API_URL || !STRAPI_API_TOKEN) {
  throw new Error('Missing STRAPI_API_URL or STRAPI_API_TOKEN environment variables');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Incoming request:', req.method, req.body, req.query);

  try {
    if (req.method === 'POST') {
      const { email, name, number, gender, leader, tribe, message, profile_picture } = req.body;
      console.log('Handling POST request:', req.body);

      const response = await fetch(`${STRAPI_API_URL}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        },
        body: JSON.stringify({ data: { email, name, number, gender, leader, tribe, message, profile_picture } })
      });

      const responseText = await response.text();
      console.log('POST response status:', response.status, 'Response body:', responseText);
      if (!response.ok) {
        console.error('Failed POST request:', response.status, responseText);
        throw new Error(`HTTP error! Status: ${response.status}, Body: ${responseText}`);
      }

      const responseData = JSON.parse(responseText);
      return res.status(201).json(responseData);
    } else if (req.method === 'GET') {
      console.log('Handling GET request');

      const response = await fetch(`${STRAPI_API_URL}/api/messages?populate=*`, {
        headers: {
          'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
      });

      const responseText = await response.text();
      console.log('GET response status:', response.status, 'Response body:', responseText);
      if (!response.ok) {
        console.error('Failed GET request:', response.status, responseText);
        throw new Error(`HTTP error! Status: ${response.status}, Body: ${responseText}`);
      }

      const responseData = JSON.parse(responseText);
      return res.status(200).json(responseData.data);
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      console.log('Handling DELETE request, id:', id);

      const response = await fetch(`${STRAPI_API_URL}/api/messages/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${STRAPI_API_TOKEN}`
        }
      });

      const responseText = await response.text();
      console.log('DELETE response status:', response.status, 'Response body:', responseText);
      if (!response.ok) {
        console.error('Failed DELETE request:', response.status, responseText);
        throw new Error(`HTTP error! Status: ${response.status}, Body: ${responseText}`);
      }

      return res.status(200).json({ success: true });
    } else {
      console.error('Method Not Allowed:', req.method);
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error occurred:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.error('Unknown error occurred:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
