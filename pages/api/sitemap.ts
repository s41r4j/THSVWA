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
    '/terms',
    '/purchase',
  ];

  // Include all 8 products plus hidden IDOR product
  const productPages = [1, 2, 3, 4, 5, 6, 7, 8, 0].map(id => `/product/${id}`);

  const allPages = [...staticPages, ...productPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages.map(page => {
    const url = `${baseUrl}${page}`;
    let priority = '0.6';
    let changefreq = 'monthly';
    
    if (page === '') {
      priority = '1.0';
      changefreq = 'weekly';
    } else if (page === '/login') {
      priority = '0.8';
    } else if (page.includes('/product/')) {
      priority = page.includes('/product/0') ? '0.3' : '0.7';
    } else if (page === '/purchase') {
      priority = '0.7';
    } else if (page === '/flag' || page === '/terms') {
      priority = '0.4';
      changefreq = 'rarely';
    }
    
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
