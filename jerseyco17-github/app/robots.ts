import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
          '/temp/',
          '/data/',
          '/scripts/',
          '/node_modules/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
          '/temp/',
          '/data/',
          '/scripts/',
          '/node_modules/',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
          '/temp/',
          '/data/',
          '/scripts/',
          '/node_modules/',
        ],
      },
    ],
    sitemap: 'https://jerseyco17.com/sitemap.xml',
    host: 'https://jerseyco17.com',
  }
}