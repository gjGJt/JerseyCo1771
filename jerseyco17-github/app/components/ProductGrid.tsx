'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Star, ShoppingCart, Eye, Grid, List } from 'lucide-react';
import { useCartStore, useProductStore } from '@/app/lib/store';
import { Product } from '@/app/types';
import toast from 'react-hot-toast';

// Mock data - in a real app, this would come from an API
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Nike Air Max 270',
    description: 'Comfortable running shoes with modern design and responsive cushioning',
    price: 129.99,
    originalPrice: 159.99,
    discount: 19,
    images: ['/images/products/nike-air-max-270-1.jpg', '/images/products/nike-air-max-270-2.jpg'],
    category: 'athletic',
    subcategory: 'shoes',
    brand: 'Nike',
    sizes: ['8', '9', '10', '11', '12'],
    colors: ['Black', 'White', 'Blue'],
    inStock: true,
    rating: 4.5,
    reviewCount: 128,
    tags: ['running', 'comfortable', 'modern'],
    featured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Adidas Originals Hoodie',
    description: 'Classic streetwear hoodie with three stripes and comfortable fit',
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    images: ['/images/products/adidas-hoodie-1.jpg', '/images/products/adidas-hoodie-2.jpg'],
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
    description: 'Moisture-wicking tank top for intense workouts and training sessions',
    price: 34.99,
    images: ['/images/products/ua-tank-1.jpg', '/images/products/ua-tank-2.jpg'],
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
    description: 'Urban style jacket with modern cut and street-ready design',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    images: ['/images/products/puma-jacket-1.jpg', '/images/products/puma-jacket-2.jpg'],
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
    description: 'Timeless design meets modern comfort in these classic sneakers',
    price: 69.99,
    originalPrice: 89.99,
    discount: 22,
    images: ['/images/products/reebok-classic-1.jpg', '/images/products/reebok-classic-2.jpg'],
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
  {
    id: '6',
    name: 'Champion Athletic Shorts',
    description: 'Lightweight and comfortable shorts for any athletic activity',
    price: 29.99,
    images: ['/images/products/champion-shorts-1.jpg', '/images/products/champion-shorts-2.jpg'],
    category: 'athletic',
    subcategory: 'bottoms',
    brand: 'Champion',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Gray'],
    inStock: true,
    rating: 4.2,
    reviewCount: 56,
    tags: ['athletic', 'lightweight', 'comfortable'],
    featured: true,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
  },
  {
    id: '7',
    name: 'Jordan Retro 1',
    description: 'Iconic basketball sneakers with premium leather construction',
    price: 149.99,
    originalPrice: 179.99,
    discount: 17,
    images: ['/images/products/jordan-retro-1.jpg', '/images/products/jordan-retro-2.jpg'],
    category: 'streetwear',
    subcategory: 'shoes',
    brand: 'Jordan',
    sizes: ['8', '9', '10', '11', '12'],
    colors: ['Black', 'White', 'Red'],
    inStock: true,
    rating: 4.8,
    reviewCount: 156,
    tags: ['basketball', 'iconic', 'premium'],
    featured: true,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '8',
    name: 'Nike Dri-FIT T-Shirt',
    description: 'Moisture-wicking performance t-shirt for active lifestyle',
    price: 24.99,
    images: ['/images/products/nike-dri-fit-1.jpg', '/images/products/nike-dri-fit-2.jpg'],
    category: 'athletic',
    subcategory: 'tops',
    brand: 'Nike',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Navy', 'Red'],
    inStock: true,
    rating: 4.4,
    reviewCount: 78,
    tags: ['performance', 'moisture-wicking', 'comfortable'],
    featured: true,
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
  },
];

export function ProductGrid() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();
  const { filteredProducts, applyFilters } = useProductStore();

  const itemsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProducts(mockProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

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

  const displayProducts = filteredProducts.length > 0 ? filteredProducts : products;
  const totalPages = Math.ceil(displayProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = displayProducts.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 bg-secondary-200 rounded w-48 animate-pulse" />
          <div className="flex space-x-2">
            <div className="w-10 h-10 bg-secondary-200 rounded animate-pulse" />
            <div className="w-10 h-10 bg-secondary-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
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
    <div>
      {/* Header with View Options */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-secondary-600">
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, displayProducts.length)} of {displayProducts.length} products
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid' 
                ? 'bg-primary-600 text-white' 
                : 'bg-secondary-200 text-secondary-600 hover:bg-secondary-300'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list' 
                ? 'bg-primary-600 text-white' 
                : 'bg-secondary-200 text-secondary-600 hover:bg-secondary-300'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Grid/List */}
      <div className={
        viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'space-y-6'
      }>
        {paginatedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            className={`group card hover:shadow-lg transition-all duration-300 ${
              viewMode === 'list' ? 'flex' : ''
            }`}
          >
            <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-64 flex-shrink-0' : ''}`}>
              <div className={`${viewMode === 'list' ? 'h-48' : 'aspect-square'} bg-secondary-100`}>
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
                  className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Quick Add</span>
                </button>
              </div>
            </div>

            <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-secondary-500 uppercase tracking-wide">
                  {product.brand}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-secondary-600">{product.rating}</span>
                  <span className="text-sm text-secondary-400">({product.reviewCount})</span>
                </div>
              </div>

              <Link href={`/products/${product.id}`}>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2 hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>
              </Link>

              <p className={`text-secondary-600 text-sm mb-4 ${
                viewMode === 'list' ? '' : 'line-clamp-2'
              }`}>
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
                <div className="flex items-center space-x-1">
                  {product.colors.slice(0, 3).map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-4 h-4 rounded-full border border-secondary-300"
                      style={{
                        backgroundColor: color.toLowerCase() === 'black' ? '#000' : 
                                       color.toLowerCase() === 'white' ? '#fff' :
                                       color.toLowerCase() === 'navy' ? '#1e3a8a' :
                                       color.toLowerCase() === 'blue' ? '#3b82f6' :
                                       color.toLowerCase() === 'red' ? '#ef4444' :
                                       color.toLowerCase() === 'gray' ? '#6b7280' :
                                       color.toLowerCase() === 'olive' ? '#84cc16' : '#6b7280'
                      }}
                    />
                  ))}
                  {product.colors.length > 3 && (
                    <span className="text-xs text-secondary-500">
                      +{product.colors.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-12">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-secondary-200 text-secondary-600 rounded-lg hover:bg-secondary-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-primary-600 text-white'
                    : 'bg-secondary-200 text-secondary-600 hover:bg-secondary-300'
                }`}
              >
                {page}
              </button>
            );
          })}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-secondary-200 text-secondary-600 rounded-lg hover:bg-secondary-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
