'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Star, ShoppingCart, Eye } from 'lucide-react';
import { useCartStore } from '@/app/lib/store';
import { Product } from '@/app/types';
import toast from 'react-hot-toast';

// Products from Mizo Jersey Home streetwear collection
const mizoProducts: Product[] = [
  {
    id: '1',
    name: 'The North Face Green Puffer Jacket',
    description: 'Premium puffer jacket with excellent insulation and modern design',
    price: 2599,
    originalPrice: 4000,
    discount: 35,
    images: ['/images/products/north-face-green-puffer.jpg'],
    category: 'streetwear',
    subcategory: 'jackets',
    brand: 'The North Face',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Green'],
    inStock: true,
    rating: 4.5,
    reviewCount: 128,
    tags: ['puffer', 'winter', 'premium'],
    featured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Off-White Plain Unisex Puffer Jacket',
    description: 'Minimalist puffer jacket with clean design and premium materials',
    price: 1899,
    originalPrice: 3000,
    discount: 36,
    images: ['/images/products/off-white-puffer.jpg'],
    category: 'streetwear',
    subcategory: 'jackets',
    brand: 'Off-White',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black'],
    inStock: true,
    rating: 4.3,
    reviewCount: 95,
    tags: ['minimalist', 'unisex', 'premium'],
    featured: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: '3',
    name: 'Stussy 8 Ball Sherpa Reversible Jacket Green & Black',
    description: 'Reversible sherpa jacket with 8-ball design and premium comfort',
    price: 4499,
    originalPrice: 5500,
    discount: 18,
    images: ['/images/products/stussy-8ball-green.jpg'],
    category: 'streetwear',
    subcategory: 'jackets',
    brand: 'Stussy',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Green', 'Black'],
    inStock: true,
    rating: 4.7,
    reviewCount: 67,
    tags: ['sherpa', 'reversible', 'streetwear'],
    featured: true,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
  },
  {
    id: '4',
    name: 'Butterfly Print Women\'s Baggy Jeans',
    description: 'Trendy baggy jeans with butterfly print design for a unique look',
    price: 1499,
    originalPrice: 2200,
    discount: 31,
    images: ['/images/products/butterfly-jeans.jpg'],
    category: 'streetwear',
    subcategory: 'jeans',
    brand: 'JerseyCo',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Black'],
    inStock: true,
    rating: 4.4,
    reviewCount: 43,
    tags: ['baggy', 'butterfly', 'women'],
    featured: true,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
  },
  {
    id: '5',
    name: 'Nike Fleece Black Fur Jacket',
    description: 'Comfortable fleece jacket with fur lining and Nike branding',
    price: 3599,
    originalPrice: 4999,
    discount: 28,
    images: ['/images/products/nike-fleece-black.jpg'],
    category: 'streetwear',
    subcategory: 'jackets',
    brand: 'Nike',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    inStock: true,
    rating: 4.6,
    reviewCount: 89,
    tags: ['fleece', 'fur', 'nike'],
    featured: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
  {
    id: '6',
    name: 'Bunny Love Print Women\'s Hoodie',
    description: 'Cute bunny love print hoodie perfect for casual wear',
    price: 999,
    originalPrice: 2000,
    discount: 50,
    images: ['/images/products/bunny-hoodie.jpg'],
    category: 'streetwear',
    subcategory: 'hoodies',
    brand: 'JerseyCo',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Pink', 'White'],
    inStock: true,
    rating: 4.2,
    reviewCount: 56,
    tags: ['bunny', 'love', 'cute'],
    featured: true,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
  },
  {
    id: '7',
    name: 'Halloween Flame & Skull Zip-Up Hoodie White',
    description: 'Edgy Halloween-themed hoodie with flame and skull design',
    price: 1099,
    originalPrice: 2500,
    discount: 56,
    images: ['/images/products/halloween-hoodie-white.jpg'],
    category: 'streetwear',
    subcategory: 'hoodies',
    brand: 'JerseyCo',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black'],
    inStock: true,
    rating: 4.8,
    reviewCount: 156,
    tags: ['halloween', 'flame', 'skull'],
    featured: true,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '8',
    name: 'Skeleton & Heart Black Hoodie',
    description: 'Gothic-style hoodie with skeleton and heart design',
    price: 899,
    originalPrice: 2500,
    discount: 64,
    images: ['/images/products/skeleton-heart-black.jpg'],
    category: 'streetwear',
    subcategory: 'hoodies',
    brand: 'JerseyCo',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White'],
    inStock: true,
    rating: 4.5,
    reviewCount: 78,
    tags: ['skeleton', 'heart', 'gothic'],
    featured: true,
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: '9',
    name: 'Spiderman Red Zip-up Hoodie',
    description: 'Superhero-themed hoodie with Spiderman design',
    price: 2199,
    originalPrice: 2999,
    discount: 26,
    images: ['/images/products/spiderman-red-hoodie.jpg'],
    category: 'streetwear',
    subcategory: 'hoodies',
    brand: 'JerseyCo',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Red', 'Blue'],
    inStock: true,
    rating: 4.7,
    reviewCount: 124,
    tags: ['spiderman', 'superhero', 'red'],
    featured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '10',
    name: 'Brooklyn Nets Jacket',
    description: 'NBA team jacket with Brooklyn Nets branding',
    price: 2499,
    originalPrice: 3500,
    discount: 28,
    images: ['/images/products/brooklyn-nets-jacket.jpg'],
    category: 'streetwear',
    subcategory: 'jackets',
    brand: 'JerseyCo',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White'],
    inStock: true,
    rating: 4.4,
    reviewCount: 67,
    tags: ['nba', 'brooklyn', 'nets'],
    featured: true,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
  },
  {
    id: '11',
    name: 'Miami Heat Jacket',
    description: 'NBA team jacket with Miami Heat branding and colors',
    price: 2199,
    originalPrice: 3500,
    discount: 37,
    images: ['/images/products/miami-heat-jacket.jpg'],
    category: 'streetwear',
    subcategory: 'jackets',
    brand: 'JerseyCo',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Red', 'Black'],
    inStock: true,
    rating: 4.3,
    reviewCount: 89,
    tags: ['nba', 'miami', 'heat'],
    featured: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: '12',
    name: 'Jordan Bomber Jacket Black',
    description: 'Classic bomber jacket with Jordan branding',
    price: 3299,
    images: ['/images/products/jordan-bomber-black.jpg'],
    category: 'streetwear',
    subcategory: 'jackets',
    brand: 'Jordan',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    inStock: true,
    rating: 4.9,
    reviewCount: 203,
    tags: ['jordan', 'bomber', 'classic'],
    featured: true,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
  }
];

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProducts(mizoProducts);
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
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600">
              Discover our most popular streetwear items
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="card animate-pulse">
                <div className="h-64 bg-gray-200 rounded-t-xl" />
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded mb-4 w-3/4" />
                  <div className="h-6 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Featured Products
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600"
          >
            Discover our most popular streetwear items
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                <div className="aspect-square bg-gray-100">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={400}
                    height={400}
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
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-blue-50 hover:text-blue-500 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick Add Button */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-black text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Quick Add</span>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 uppercase tracking-wide">
                    {product.brand}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                    <span className="text-sm text-gray-400">({product.reviewCount})</span>
                  </div>
                </div>

                <Link href={`/products/${product.id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-gray-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    {product.colors.slice(0, 3).map((color, colorIndex) => (
                      <div
                        key={colorIndex}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{
                          backgroundColor: color.toLowerCase() === 'black' ? '#000' : 
                                         color.toLowerCase() === 'white' ? '#fff' :
                                         color.toLowerCase() === 'red' ? '#ef4444' :
                                         color.toLowerCase() === 'blue' ? '#3b82f6' :
                                         color.toLowerCase() === 'green' ? '#10b981' :
                                         color.toLowerCase() === 'pink' ? '#ec4899' : '#6b7280'
                        }}
                      />
                    ))}
                    {product.colors.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{product.colors.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/collections/streetwear"
            className="inline-flex items-center px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}