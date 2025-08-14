import { NextApiRequest, NextApiResponse } from 'next';

const generateSitemap = () => {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://your-domain.com' 
    : 'http://localhost';

  const staticPages = [
    '',
    '/login',
    '/profile',
    '/flag',
  ];

  const productPages = [1, 2, 3, 4, 5].map(id => `/product/${id}`);

  const allPages = [...staticPages, ...productPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages.map(page => {
    const url = `${baseUrl}${page}`;
    const priority = page === '' ? '1.0' : page.includes('/product/') ? '0.7' : '0.8';
    const changefreq = page === '' ? 'weekly' : page.includes('/product/') ? 'monthly' : 'monthly';
    
    return `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('')}
</urlset>`;

  return sitemap;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const sitemap = generateSitemap();
    
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    
    res.status(200).send(sitemap);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
