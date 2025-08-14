import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://your-domain.com' 
      : 'http://localhost';

    const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Educational CTF - Security-related paths
# These paths are intentionally listed for educational vulnerability discovery
Disallow: /admin
Disallow: /config
Disallow: /backup
Disallow: /.env
Disallow: /secrets
Disallow: /hidden
Disallow: /internal

# Allow crawling of vulnerable endpoints for educational demonstration
Allow: /login
Allow: /profile
Allow: /flag
Allow: /terms
Allow: /purchase
Allow: /product/

# Educational hint for IDOR testing
# Try product IDs: 0, 999, negative numbers, or beyond normal range (1-8)

# LFI testing hints in purchase flow
# Explore file parameter: ?file=../../../etc/passwd

# XSS testing available in homepage search
# SQL injection opportunities in login form`;

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    
    res.status(200).send(robotsTxt);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
