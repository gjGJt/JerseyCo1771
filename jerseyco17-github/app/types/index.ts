export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: string;
  subcategory?: string;
  brand: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentId?: string;
  children?: Category[];
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  addresses: Address[];
  orders: Order[];
}

export interface Address {
  id: string;
  type: 'billing' | 'shipping';
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  shippingAddress: Address;
  billingAddress: Address;
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ScrapedProduct {
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  url: string;
  brand: string;
  category: string;
  inStock: boolean;
  sizes?: string[];
  colors?: string[];
  store: string;
  scrapedAt: string;
  discount?: number;
}

export interface CompetitorPrice {
  store: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  url: string;
  inStock: boolean;
  lastUpdated: string;
}

export interface PriceComparison {
  productId: string;
  productName: string;
  ourPrice: number;
  competitorPrices: CompetitorPrice[];
  bestPrice: CompetitorPrice;
  savings: number;
  priceHistory: PriceHistoryEntry[];
}

export interface PriceHistoryEntry {
  date: string;
  price: number;
  store: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: any;
}

export interface ScrapingConfig {
  baseUrl: string;
  selectors: {
    productContainer: string;
    name: string;
    price: string;
    originalPrice?: string;
    image: string;
    link: string;
    brand?: string;
    category?: string;
    inStock?: string;
    sizes?: string;
    colors?: string;
  };
  pagination?: {
    nextPage: string;
    maxPages: number;
  };
}

export interface FilterOptions {
  category?: string;
  brand?: string[];
  priceRange?: [number, number];
  sizes?: string[];
  colors?: string[];
  inStock?: boolean;
  rating?: number;
  sortBy?: 'name' | 'price' | 'rating' | 'newest' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResult {
  products: Product[];
  totalCount: number;
  page: number;
  totalPages: number;
  filters: FilterOptions;
}
