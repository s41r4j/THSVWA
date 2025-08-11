import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { flag } = req.body;
    if (flag === 'FLAG{MASTER_HACKER}') {
      res.status(200).json({ message: 'Flag accepted! Score +100' });
    } else {
      res.status(400).json({ message: 'Invalid flag' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}