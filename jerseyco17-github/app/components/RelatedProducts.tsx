'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/app/lib/store';
import { Product } from '@/app/types';
import toast from 'react-hot-toast';

// Mock related products
const mockRelatedProducts: Product[] = [
  {
    id: '2',
    name: 'Adidas Originals Hoodie',
    description: 'Classic streetwear hoodie with three stripes',
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    images: ['/images/products/adidas-hoodie-1.jpg'],
    category: 'streetwear',
    subcategory: 'hoodies',
    brand: 'Adidas',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Navy'],
    inStock: true,
    rating: 4.3,
    reviewCount: 95,
    tags: ['streetwear', 'comfortable', 'classic'],
    featured: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: '3',
    name: 'Under Armour Training Tank',
    description: 'Moisture-wicking tank for intense workouts',
    price: 34.99,
    images: ['/images/products/ua-tank-1.jpg'],
    category: 'athletic',
    subcategory: 'tops',
    brand: 'Under Armour',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Gray'],
    inStock: true,
    rating: 4.7,
    reviewCount: 67,
    tags: ['training', 'moisture-wicking', 'performance'],
    featured: true,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
  },
  {
    id: '4',
    name: 'Puma Streetwear Jacket',
    description: 'Urban style jacket with modern cut',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    images: ['/images/products/puma-jacket-1.jpg'],
    category: 'streetwear',
    subcategory: 'jackets',
    brand: 'Puma',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Olive'],
    inStock: true,
    rating: 4.4,
    reviewCount: 43,
    tags: ['streetwear', 'urban', 'modern'],
    featured: true,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
  },
  {
    id: '5',
    name: 'Reebok Classic Sneakers',
    description: 'Timeless design meets modern comfort',
    price: 69.99,
    originalPrice: 89.99,
    discount: 22,
    images: ['/images/products/reebok-classic-1.jpg'],
    category: 'streetwear',
    subcategory: 'shoes',
    brand: 'Reebok',
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['White', 'Black', 'Red'],
    inStock: true,
    rating: 4.6,
    reviewCount: 89,
    tags: ['classic', 'comfortable', 'versatile'],
    featured: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
];

export function RelatedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProducts(mockRelatedProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem({
      product,
      quantity: 1,
      selectedSize: product.sizes[0],
      selectedColor: product.colors[0],
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = (product: Product) => {
    toast.success(`${product.name} added to wishlist!`);
  };

  if (loading) {
    return (
      <div className="mt-16">
        <div className="h-8 bg-secondary-200 rounded w-48 mb-6 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="card animate-pulse">
              <div className="h-64 bg-secondary-200 rounded-t-xl" />
              <div className="p-6">
                <div className="h-4 bg-secondary-200 rounded mb-2" />
                <div className="h-4 bg-secondary-200 rounded mb-4 w-3/4" />
                <div className="h-6 bg-secondary-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-2xl font-bold text-secondary-900 mb-6"
      >
        You Might Also Like
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group card hover:shadow-lg transition-all duration-300"
          >
            <div className="relative overflow-hidden">
              <div className="aspect-square bg-secondary-100">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Discount Badge */}
              {product.discount && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                  -{product.discount}%
                </div>
              )}

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => handleAddToWishlist(product)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Add Button */}
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Quick Add</span>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-secondary-500 uppercase tracking-wide">
                  {product.brand}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-secondary-600">{product.rating}</span>
                </div>
              </div>

              <Link href={`/products/${product.id}`}>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2 hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>
              </Link>

              <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-secondary-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-secondary-400 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
