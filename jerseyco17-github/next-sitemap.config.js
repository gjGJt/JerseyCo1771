/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://jerseyco17.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/api/*',
    '/admin/*',
    '/_next/*',
    '/private/*',
    '/temp/*',
    '/data/*',
    '/scripts/*',
    '/node_modules/*',
  ],
  additionalPaths: async (config) => {
    const result = []
    
    // Add dynamic product pages
    const products = [
      'nike-air-jordan-1-retro',
      'adidas-ultraboost-22',
      'nike-dri-fit-basketball-jersey',
      'adidas-primeblue-soccer-jersey',
      'nike-basketball-shorts',
      'adidas-soccer-cleats',
      'puma-team-jersey',
      'under-armour-training-tank',
      'nike-dri-fit-t-shirt',
      'adidas-originals-hoodie'
    ]
    
    products.forEach(product => {
      result.push({
        loc: `/products/${product}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      })
    })
    
    // Add category pages
    const categories = [
      'sports-jerseys',
      'athletic-wear',
      'streetwear',
      'basketball',
      'football',
      'soccer',
      'accessories'
    ]
    
    categories.forEach(category => {
      result.push({
        loc: `/category/${category}`,
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      })
    })
    
    return result
  },
  robotsTxtOptions: {
    policies: [
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
    ],
    additionalSitemaps: [
      'https://jerseyco17.com/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Custom transform for different page types
    if (path.startsWith('/products/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      }
    }
    
    if (path.startsWith('/category/')) {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      }
    }
    
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }
    }
    
    return {
      loc: path,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }
  },
}
