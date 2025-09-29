import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jerseyco17.com'
  
  // Static pages
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/shipping',
    '/returns',
    '/privacy',
    '/terms',
    '/faq',
    '/size-guide',
    '/new-arrivals',
    '/best-sellers',
    '/sale',
    '/gift-cards',
    '/price-comparison',
    '/competitor-tracking'
  ]

  // Category pages
  const categories = [
    'sports-jerseys',
    'athletic-wear', 
    'streetwear',
    'basketball',
    'football',
    'soccer',
    'accessories'
  ]

  // Subcategory pages
  const subcategories = {
    'sports-jerseys': ['nike', 'adidas', 'puma', 'under-armour', 'team-jerseys'],
    'athletic-wear': ['running', 'gym', 'training', 'basketball', 'soccer'],
    'streetwear': ['hoodies', 't-shirts', 'jackets', 'pants', 'accessories'],
    'basketball': ['jerseys', 'shorts', 'shoes', 'accessories'],
    'football': ['jerseys', 'pants', 'cleats', 'accessories'],
    'soccer': ['jerseys', 'shorts', 'cleats', 'accessories'],
    'accessories': ['bags', 'hats', 'socks', 'belts', 'watches']
  }

  // Generate sitemap entries
  const sitemap: MetadataRoute.Sitemap = []

  // Add static pages
  staticPages.forEach(page => {
    sitemap.push({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'daily' : 'weekly',
      priority: page === '' ? 1 : 0.8,
    })
  })

  // Add category pages
  categories.forEach(category => {
    sitemap.push({
      url: `${baseUrl}/category/${category}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    })

    // Add subcategory pages
    if (subcategories[category as keyof typeof subcategories]) {
      subcategories[category as keyof typeof subcategories].forEach(subcategory => {
        sitemap.push({
          url: `${baseUrl}/category/${category}/${subcategory}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        })
      })
    }
  })

  // Add product pages (this would be dynamic in a real app)
  // For now, we'll add some example product pages
  const exampleProducts = [
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

  exampleProducts.forEach(product => {
    sitemap.push({
      url: `${baseUrl}/products/${product}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  return sitemap
}
