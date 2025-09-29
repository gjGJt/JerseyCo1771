'use client';

import React from 'react';
import Head from 'next/head';
import { SEOData } from '@/app/types';

interface SEOHeadProps {
  seoData: SEOData;
  product?: {
    name: string;
    price: number;
    description: string;
    images: string[];
    brand: string;
    category: string;
    inStock: boolean;
    rating: number;
    reviewCount: number;
  };
}

const SEOHead: React.FC<SEOHeadProps> = ({ seoData, product }) => {
  const generateStructuredData = () => {
    if (product) {
      return {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": product.images,
        "brand": {
          "@type": "Brand",
          "name": product.brand
        },
        "category": product.category,
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "INR",
          "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          "seller": {
            "@type": "Organization",
            "name": "JerseyCo17"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": product.rating,
          "reviewCount": product.reviewCount
        }
      };
    }

    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "JerseyCo17",
      "description": "Premium sports jerseys and athletic wear at competitive prices",
      "url": "https://jerseyco17.com",
      "logo": "https://jerseyco17.com/logo.png",
      "sameAs": [
        "https://www.facebook.com/jerseyco17",
        "https://www.instagram.com/jerseyco17",
        "https://twitter.com/jerseyco17"
      ]
    };
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords.join(', ')} />
      <link rel="canonical" href={seoData.canonical} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={seoData.ogTitle || seoData.title} />
      <meta property="og:description" content={seoData.ogDescription || seoData.description} />
      <meta property="og:image" content={seoData.ogImage || '/images/og-default.jpg'} />
      <meta property="og:url" content={seoData.canonical} />
      <meta property="og:type" content={product ? "product" : "website"} />
      <meta property="og:site_name" content="JerseyCo17" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={seoData.twitterCard || "summary_large_image"} />
      <meta name="twitter:title" content={seoData.twitterTitle || seoData.title} />
      <meta name="twitter:description" content={seoData.twitterDescription || seoData.description} />
      <meta name="twitter:image" content={seoData.twitterImage || seoData.ogImage || '/images/twitter-default.jpg'} />
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="JerseyCo17" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      
      {/* Product-specific tags */}
      {product && (
        <>
          <meta property="product:price:amount" content={product.price.toString()} />
          <meta property="product:price:currency" content="INR" />
          <meta property="product:availability" content={product.inStock ? "in stock" : "out of stock"} />
          <meta property="product:condition" content="new" />
          <meta property="product:brand" content={product.brand} />
          <meta property="product:category" content={product.category} />
        </>
      )}
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData())
        }}
      />
      
      {/* Additional SEO enhancements */}
      <meta name="theme-color" content="#1e40af" />
      <meta name="msapplication-TileColor" content="#1e40af" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Performance hints */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  );
};

export default SEOHead;
