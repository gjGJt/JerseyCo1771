import { NextRequest, NextResponse } from 'next/server';
import { WebScraper, storeConfigs } from '../../../scripts/scraper';
import { PriceComparison, CompetitorPrice } from '@/app/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const productName = searchParams.get('product');
  const brand = searchParams.get('brand');
  const category = searchParams.get('category');

  try {
    const scraper = new WebScraper();
    await scraper.init();

    // Scrape all stores for comparison
    const allProducts = await scraper.scrapeAllStores();
    await scraper.close();

    // Generate price comparisons
    const comparisons = await generatePriceComparisons(allProducts);

    // Filter by product name if specified
    let filteredComparisons = comparisons;
    if (productName) {
      filteredComparisons = comparisons.filter(comp => 
        comp.productName.toLowerCase().includes(productName.toLowerCase())
      );
    }

    // Filter by brand if specified
    if (brand) {
      filteredComparisons = filteredComparisons.filter(comp => 
        comp.productBrand.toLowerCase().includes(brand.toLowerCase())
      );
    }

    return NextResponse.json({
      success: true,
      comparisons: filteredComparisons,
      totalComparisons: filteredComparisons.length,
      scrapedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Price comparison error:', error);
    return NextResponse.json(
      { 
        error: 'Price comparison failed', 
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productName, brand, category, schedule } = body;

    // Start price comparison scraping in background
    const scraper = new WebScraper();
    await scraper.init();

    // Run scraping asynchronously
    scraper.scrapeAllStores()
      .then(async (allProducts) => {
        const comparisons = await generatePriceComparisons(allProducts);
        await scraper.saveProducts(comparisons, 'price_comparisons.json');
        console.log('Background price comparison completed');
      })
      .catch(error => {
        console.error('Background price comparison failed:', error);
      })
      .finally(async () => {
        await scraper.close();
      });

    return NextResponse.json({
      success: true,
      message: 'Price comparison started',
      scheduledAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to start price comparison' },
      { status: 500 }
    );
  }
}

async function generatePriceComparisons(allProducts: any): Promise<PriceComparison[]> {
  const comparisons: PriceComparison[] = [];
  const productMap = new Map();

  // Group products by name and brand
  Object.entries(allProducts).forEach(([store, products]) => {
    products.forEach((product: any) => {
      const key = `${product.name.toLowerCase()}_${product.brand.toLowerCase()}`;
      if (!productMap.has(key)) {
        productMap.set(key, []);
      }
      productMap.get(key).push({ ...product, store });
    });
  });

  // Generate comparisons for products found in multiple stores
  productMap.forEach((products: any[], key: string) => {
    if (products.length > 1) {
      const sortedProducts = products.sort((a, b) => a.price - b.price);
      const bestPrice = sortedProducts[0];
      const ourPrice = products.find(p => p.store === 'jerseyco17') || products[0];
      
      const competitorPrices: CompetitorPrice[] = products.map(p => ({
        store: p.store,
        price: p.price,
        originalPrice: p.originalPrice,
        discount: p.discount,
        url: p.url,
        inStock: p.inStock,
        lastUpdated: p.scrapedAt
      }));

      const comparison: PriceComparison = {
        productId: key,
        productName: products[0].name,
        ourPrice: ourPrice.price,
        competitorPrices,
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
