// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get(
      `https://api.nomics.com/v1/currencies/ticker?key=${process.env.NOMICS_API_KEY}`
    );
    return res.status(200).json(JSON.parse(JSON.stringify(response.data)));
  } catch (e: any) {
    return res.status(e.status).end(e.message);
  }
}
