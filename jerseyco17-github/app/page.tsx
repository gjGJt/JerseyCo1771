import { Metadata } from 'next';
import { Hero } from '@/app/components/Hero';
import { FeaturedProducts } from '@/app/components/FeaturedProducts';
import { Categories } from '@/app/components/Categories';
import { Newsletter } from '@/app/components/Newsletter';
import { Testimonials } from '@/app/components/Testimonials';

export const metadata: Metadata = {
  title: 'JerseyCo17 - Premium Sports Jerseys & Athletic Wear | Best Price Guarantee',
  description: 'Shop premium sports jerseys, athletic wear, and streetwear at JerseyCo17. Compare prices with competitors and get the best deals on Nike, Adidas, and more. Free shipping on orders over ₹999.',
  keywords: [
    'sports jerseys', 'athletic wear', 'Nike jerseys', 'Adidas jerseys', 'sports clothing',
    'jerseyco17', 'price comparison', 'best deals', 'sports fashion', 'athletic gear',
    'team jerseys', 'basketball jerseys', 'football jerseys', 'soccer jerseys'
  ],
  openGraph: {
    title: 'JerseyCo17 - Premium Sports Jerseys & Athletic Wear',
    description: 'Shop premium sports jerseys and athletic wear with price comparison. Best deals on Nike, Adidas, and more with free shipping.',
    type: 'website',
    url: 'https://jerseyco17.com',
    images: [
      {
        url: '/images/og-homepage.jpg',
        width: 1200,
        height: 630,
        alt: 'JerseyCo17 - Premium Sports Jerseys',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JerseyCo17 - Premium Sports Jerseys & Athletic Wear',
    description: 'Shop premium sports jerseys and athletic wear with price comparison. Best deals guaranteed.',
    images: ['/images/twitter-homepage.jpg'],
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Testimonials />
      <Newsletter />
    </div>
  );
}