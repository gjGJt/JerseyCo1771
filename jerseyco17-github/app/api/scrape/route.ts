import { NextRequest, NextResponse } from 'next/server';
import { WebScraper, storeConfigs } from '../../../scripts/scraper';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const store = searchParams.get('store') || 'all';
  const category = searchParams.get('category') || 'all';

  try {
    const scraper = new WebScraper();
    await scraper.init();

    let products;
    if (store === 'all') {
      products = await scraper.scrapeAllStores();
    } else if (storeConfigs[store]) {
      products = await scraper.scrapeStore(store, category);
    } else {
      return NextResponse.json(
        { error: `Unknown store: ${store}` },
        { status: 400 }
      );
    }

    await scraper.close();

    return NextResponse.json({
      success: true,
      store,
      category,
      productCount: Array.isArray(products) ? products.length : Object.values(products).flat().length,
      products,
      scrapedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Scraping error:', error);
    return NextResponse.json(
      { 
        error: 'Scraping failed', 
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { store, category, schedule } = body;

    // Validate request
    if (!store || !storeConfigs[store]) {
      return NextResponse.json(
        { error: 'Invalid store specified' },
        { status: 400 }
      );
    }

    // Start scraping in background
    const scraper = new WebScraper();
    await scraper.init();

    // Run scraping asynchronously
    scraper.scrapeStore(store, category)
      .then(async (products) => {
        await scraper.saveProducts(products, `${store}_${category}_products.json`);
        console.log(`Background scraping completed for ${store}`);
      })
      .catch(error => {
        console.error(`Background scraping failed for ${store}:`, error);
      })
      .finally(async () => {
        await scraper.close();
      });

    return NextResponse.json({
      success: true,
      message: `Scraping started for ${store}`,
      scheduledAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to start scraping' },
      { status: 500 }
    );
  }
}
