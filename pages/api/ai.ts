// pages/api/ai.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { aiApi } from '../../lib/actions/aiApi.action';  // Assuming aiApi is in this path


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt, img } = req.body;  // Extract the prompt and image from the request body

  try {
    const data = await aiApi({ prompt, img });  // Call the aiApi
    res.status(200).json({ success: true, data });  // Return the result
  } catch (error) {
    console.error('API call error:', error);
    res.status(500).json({ success: false, error: error });
  }
}
