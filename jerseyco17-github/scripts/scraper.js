const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

// Configuration for different stores
const storeConfigs = {
  mizojerseyhome: {
    baseUrl: 'https://mizojerseyhome.in',
    selectors: {
      productContainer: '.product-item, .grid-product-item, .product-card',
      name: '.product-title, .product-name, h3, h4',
      price: '.price, .product-price, .money',
      originalPrice: '.compare-price, .was-price, .original-price',
      image: '.product-image img, .product-photo img, img',
      link: 'a',
      brand: '.product-brand, .brand',
      category: '.product-category, .category',
      inStock: '.stock-status, .availability, .in-stock',
      sizes: '.size-option, .size-selector .size, .variant-option',
      colors: '.color-option, .color-selector .color, .swatch'
    },
    pagination: {
      nextPage: '.pagination .next, .pagination-next, .next-page',
      maxPages: 5
    }
  },
  zealevince: {
    baseUrl: 'https://zealevince.in',
    selectors: {
      productContainer: '.product-card, .product-item, .grid-item',
      name: '.product-name, .product-title, h3, h4',
      price: '.product-price, .price, .money',
      originalPrice: '.product-compare-price, .was-price, .original-price',
      image: '.product-image img, .product-photo img, img',
      link: 'a',
      brand: '.product-brand, .brand',
      category: '.product-category, .category',
      inStock: '.availability, .stock-status, .in-stock',
      sizes: '.size-selector .size, .size-option, .variant-option',
      colors: '.color-selector .color, .color-option, .swatch'
    },
    pagination: {
      nextPage: '.pagination-next, .pagination .next, .next-page',
      maxPages: 3
    }
  },
  nike: {
    baseUrl: 'https://www.nike.com',
    selectors: {
      productContainer: '.product-card, .product-item',
      name: '.product-name, .product-title',
      price: '.product-price, .price',
      originalPrice: '.product-compare-price, .was-price',
      image: '.product-image img, .product-photo img',
      link: 'a',
      brand: '.product-brand',
      category: '.product-category',
      inStock: '.availability, .stock-status',
      sizes: '.size-selector .size',
      colors: '.color-selector .color'
    },
    pagination: {
      nextPage: '.pagination-next',
      maxPages: 3
    }
  },
  adidas: {
    baseUrl: 'https://www.adidas.com',
    selectors: {
      productContainer: '.product-card, .product-item',
      name: '.product-name, .product-title',
      price: '.product-price, .price',
      originalPrice: '.product-compare-price, .was-price',
      image: '.product-image img, .product-photo img',
      link: 'a',
      brand: '.product-brand',
      category: '.product-category',
      inStock: '.availability, .stock-status',
      sizes: '.size-selector .size',
      colors: '.color-selector .color'
    },
    pagination: {
      nextPage: '.pagination-next',
      maxPages: 3
    }
  }
};

class WebScraper {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async init() {
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });
    this.page = await this.browser.newPage();
    
    // Set user agent to avoid detection
    await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // Set viewport
    await this.page.setViewport({ width: 1366, height: 768 });
  }

  async scrapeStore(storeName, category = 'all') {
    const config = storeConfigs[storeName];
    if (!config) {
      throw new Error(`Store configuration not found for: ${storeName}`);
    }

    console.log(`Starting to scrape ${storeName}...`);
    const products = [];
    let currentPage = 1;
    const maxPages = config.pagination?.maxPages || 3;

    try {
      while (currentPage <= maxPages) {
        console.log(`Scraping page ${currentPage}...`);
        
        let url = `${config.baseUrl}/collections/${category}`;
        if (currentPage > 1) {
          url += `?page=${currentPage}`;
        }

        await this.page.goto(url, { 
          waitUntil: 'networkidle2',
          timeout: 30000 
        });

        // Wait for products to load
        await this.page.waitForSelector(config.selectors.productContainer, { timeout: 10000 });

        const pageProducts = await this.page.evaluate((selectors) => {
          const productElements = document.querySelectorAll(selectors.productContainer);
          const products = [];

          productElements.forEach(element => {
            try {
              const name = element.querySelector(selectors.name)?.textContent?.trim();
              const priceText = element.querySelector(selectors.price)?.textContent?.trim();
              const originalPriceText = element.querySelector(selectors.originalPrice)?.textContent?.trim();
              const imageElement = element.querySelector(selectors.image);
              const linkElement = element.querySelector(selectors.link);
              const brand = element.querySelector(selectors.brand)?.textContent?.trim();
              const category = element.querySelector(selectors.category)?.textContent?.trim();
              const inStockElement = element.querySelector(selectors.inStock);
              const sizeElements = element.querySelectorAll(selectors.sizes);
              const colorElements = element.querySelectorAll(selectors.colors);

              if (name && priceText) {
                // Extract price numbers
                const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
                const originalPrice = originalPriceText ? parseFloat(originalPriceText.replace(/[^\d.]/g, '')) : null;
                
                // Calculate discount
                const discount = originalPrice && price < originalPrice 
                  ? Math.round(((originalPrice - price) / originalPrice) * 100)
                  : null;

                const product = {
                  name,
                  price,
                  originalPrice,
                  discount,
                  image: imageElement?.src || imageElement?.getAttribute('data-src'),
                  url: linkElement?.href,
                  brand: brand || 'Unknown',
                  category: category || 'General',
                  inStock: !inStockElement || !inStockElement.textContent.includes('Out of stock'),
                  sizes: Array.from(sizeElements).map(el => el.textContent.trim()),
                  colors: Array.from(colorElements).map(el => el.textContent.trim()),
                  scrapedAt: new Date().toISOString()
                };

                products.push(product);
              }
            } catch (error) {
              console.error('Error parsing product:', error);
            }
          });

          return products;
        }, config.selectors);

        products.push(...pageProducts);
        console.log(`Found ${pageProducts.length} products on page ${currentPage}`);

        // Check if there's a next page
        const hasNextPage = await this.page.evaluate((nextPageSelector) => {
          const nextButton = document.querySelector(nextPageSelector);
          return nextButton && !nextButton.classList.contains('disabled');
        }, config.pagination.nextPage);

        if (!hasNextPage || pageProducts.length === 0) {
          break;
        }

        currentPage++;
        
        // Add delay between requests
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      console.log(`Scraping completed. Total products found: ${products.length}`);
      return products;

    } catch (error) {
      console.error(`Error scraping ${storeName}:`, error);
      throw error;
    }
  }

  async scrapeAllStores() {
    const allProducts = {};
    
    for (const storeName of Object.keys(storeConfigs)) {
      try {
        console.log(`\n=== Scraping ${storeName} ===`);
        const products = await this.scrapeStore(storeName);
        allProducts[storeName] = products;
        
        // Save individual store data
        await this.saveProducts(products, `${storeName}_products.json`);
        
        // Add delay between stores
        await new Promise(resolve => setTimeout(resolve, 5000));
      } catch (error) {
        console.error(`Failed to scrape ${storeName}:`, error);
        allProducts[storeName] = [];
      }
    }

    // Save combined data
    await this.saveProducts(allProducts, 'all_products.json');
    
    // Generate price comparisons
    const priceComparisons = await this.generatePriceComparisons(allProducts);
    await this.saveProducts(priceComparisons, 'price_comparisons.json');
    
    return allProducts;
  }

  async generatePriceComparisons(allProducts) {
    const comparisons = [];
    const productMap = new Map();

    // Group products by name and brand
    Object.entries(allProducts).forEach(([store, products]) => {
      products.forEach(product => {
        const key = `${product.name.toLowerCase()}_${product.brand.toLowerCase()}`;
        if (!productMap.has(key)) {
          productMap.set(key, []);
        }
        productMap.get(key).push({ ...product, store });
      });
    });

    // Generate comparisons for products found in multiple stores
    productMap.forEach((products, key) => {
      if (products.length > 1) {
        const sortedProducts = products.sort((a, b) => a.price - b.price);
        const bestPrice = sortedProducts[0];
        const ourPrice = products.find(p => p.store === 'jerseyco17') || products[0];
        
        const comparison = {
          productName: products[0].name,
          productBrand: products[0].brand,
          ourPrice: ourPrice.price,
          competitorPrices: products.map(p => ({
            store: p.store,
            price: p.price,
            originalPrice: p.originalPrice,
            discount: p.discount,
            url: p.url,
            inStock: p.inStock,
            lastUpdated: p.scrapedAt
          })),
          bestPrice: {
            store: bestPrice.store,
            price: bestPrice.price,
            originalPrice: bestPrice.originalPrice,
            discount: bestPrice.discount,
            url: bestPrice.url,
            inStock: bestPrice.inStock,
            lastUpdated: bestPrice.scrapedAt
          },
          savings: ourPrice.price - bestPrice.price,
          priceHistory: products.map(p => ({
            date: p.scrapedAt,
            price: p.price,
            store: p.store
          }))
        };
        
        comparisons.push(comparison);
      }
    });

    return comparisons;
  }

  async saveProducts(products, filename) {
    const dataDir = path.join(__dirname, '..', 'data');
    await fs.mkdir(dataDir, { recursive: true });
    
    const filePath = path.join(dataDir, filename);
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));
    console.log(`Products saved to ${filePath}`);
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// Main execution
async function main() {
  const scraper = new WebScraper();
  
  try {
    await scraper.init();
    
    const args = process.argv.slice(2);
    const store = args[0] || 'all';
    
    if (store === 'all') {
      await scraper.scrapeAllStores();
    } else if (storeConfigs[store]) {
      const products = await scraper.scrapeStore(store);
      await scraper.saveProducts(products, `${store}_products.json`);
    } else {
      console.error(`Unknown store: ${store}`);
      console.log('Available stores:', Object.keys(storeConfigs).join(', '));
      process.exit(1);
    }
    
  } catch (error) {
    console.error('Scraping failed:', error);
    process.exit(1);
  } finally {
    await scraper.close();
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { WebScraper, storeConfigs };
