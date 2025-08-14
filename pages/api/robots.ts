import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://your-domain.com' 
      : 'http://localhost';

    const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/api/sitemap

# Security-related paths (for educational CTF purposes)
Disallow: /admin
Disallow: /config
Disallow: /backup
Disallow: /.env
Disallow: /secrets

# Allow crawling of vulnerable endpoints for educational demonstration
Allow: /login
Allow: /profile
Allow: /flag
Allow: /product/`;

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    
    res.status(200).send(robotsTxt);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
