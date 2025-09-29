import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/app/components/Navbar'
import { Footer } from '@/app/components/Footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'JerseyCo17 - Premium Sports Jerseys & Athletic Wear | Best Price Guarantee',
    template: '%s | JerseyCo17'
  },
  description: 'Shop premium sports jerseys, athletic wear, and streetwear at JerseyCo17. Compare prices with competitors and get the best deals on Nike, Adidas, and more. Free shipping on orders over ₹999.',
  keywords: [
    'sports jerseys', 'athletic wear', 'Nike jerseys', 'Adidas jerseys', 'sports clothing',
    'jerseyco17', 'price comparison', 'best deals', 'sports fashion', 'athletic gear',
    'team jerseys', 'basketball jerseys', 'football jerseys', 'soccer jerseys'
  ],
  authors: [{ name: 'JerseyCo17' }],
  creator: 'JerseyCo17',
  publisher: 'JerseyCo17',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://jerseyco17.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jerseyco17.com',
    title: 'JerseyCo17 - Premium Sports Jerseys & Athletic Wear',
    description: 'Shop premium sports jerseys and athletic wear with price comparison. Best deals on Nike, Adidas, and more with free shipping.',
    siteName: 'JerseyCo17',
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
    creator: '@jerseyco17',
    images: ['/images/twitter-homepage.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  )
}