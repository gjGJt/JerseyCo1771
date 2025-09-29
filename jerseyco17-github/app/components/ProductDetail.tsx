'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Star, ShoppingCart, Minus, Plus, Share2, Truck, RotateCcw, Shield } from 'lucide-react';
import { useCartStore } from '@/app/lib/store';
import { Product } from '@/app/types';
import toast from 'react-hot-toast';

interface ProductDetailProps {
  productId: string;
}

// Mock product data - in a real app, this would come from an API
const mockProduct: Product = {
  id: '1',
  name: 'Nike Air Max 270',
  description: 'The Nike Air Max 270 delivers visible cushioning under every step. The design draws inspiration from Air Max icons, showcasing Nike\'s greatest innovation with its large window and fresh array of colors.',
  price: 129.99,
  originalPrice: 159.99,
  discount: 19,
  images: [
    '/images/products/nike-air-max-270-1.jpg',
    '/images/products/nike-air-max-270-2.jpg',
    '/images/products/nike-air-max-270-3.jpg',
    '/images/products/nike-air-max-270-4.jpg',
  ],
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
};

export function ProductDetail({ productId }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProduct(mockProduct);
      setSelectedSize(mockProduct.sizes[0]);
      setSelectedColor(mockProduct.colors[0]);
      setIsLoading(false);
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product || !selectedSize || !selectedColor) {
      toast.error('Please select size and color');
      return;
    }

    addItem({
      product,
      quantity,
      selectedSize,
      selectedColor,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = () => {
    if (!product) return;
    toast.success(`${product.name} added to wishlist!`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: product?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square bg-secondary-200 rounded-xl animate-pulse" />
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="aspect-square bg-secondary-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="h-8 bg-secondary-200 rounded animate-pulse" />
          <div className="h-4 bg-secondary-200 rounded animate-pulse w-3/4" />
          <div className="h-6 bg-secondary-200 rounded animate-pulse w-1/2" />
          <div className="space-y-2">
            <div className="h-4 bg-secondary-200 rounded animate-pulse" />
            <div className="h-4 bg-secondary-200 rounded animate-pulse" />
            <div className="h-4 bg-secondary-200 rounded animate-pulse w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-secondary-900 mb-4">Product not found</h2>
        <p className="text-secondary-600">The product you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="aspect-square bg-secondary-100 rounded-xl overflow-hidden">
          <Image
            src={product.images[selectedImage]}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Thumbnail Images */}
        <div className="grid grid-cols-4 gap-2">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square bg-secondary-100 rounded-lg overflow-hidden border-2 transition-colors ${
                selectedImage === index 
                  ? 'border-primary-600' 
                  : 'border-transparent hover:border-secondary-300'
              }`}
            >
              <Image
                src={image}
                alt={`${product.name} view ${index + 1}`}
                width={150}
                height={150}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        {/* Brand and Rating */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-secondary-500 uppercase tracking-wide">
            {product.brand}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-secondary-600">{product.rating}</span>
            <span className="text-sm text-secondary-400">({product.reviewCount} reviews)</span>
          </div>
        </div>

        {/* Product Name */}
        <h1 className="text-3xl font-bold text-secondary-900">{product.name}</h1>

        {/* Price */}
        <div className="flex items-center space-x-4">
          <span className="text-3xl font-bold text-secondary-900">${product.price}</span>
          {product.originalPrice && (
            <>
              <span className="text-xl text-secondary-400 line-through">
                ${product.originalPrice}
              </span>
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-semibold">
                Save {product.discount}%
              </span>
            </>
          )}
        </div>

        {/* Description */}
        <p className="text-secondary-700 leading-relaxed">{product.description}</p>

        {/* Size Selection */}
        <div>
          <h3 className="text-lg font-semibold text-secondary-900 mb-3">Size</h3>
          <div className="grid grid-cols-5 gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-2 px-4 border rounded-lg text-center font-medium transition-colors ${
                  selectedSize === size
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-secondary-300 text-secondary-700 hover:border-secondary-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div>
          <h3 className="text-lg font-semibold text-secondary-900 mb-3">Color</h3>
          <div className="flex space-x-3">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-12 h-12 rounded-full border-2 transition-all ${
                  selectedColor === color
                    ? 'border-primary-600 scale-110'
                    : 'border-secondary-300 hover:border-secondary-400'
                }`}
                style={{
                  backgroundColor: color.toLowerCase() === 'black' ? '#000' : 
                                 color.toLowerCase() === 'white' ? '#fff' :
                                 color.toLowerCase() === 'blue' ? '#3b82f6' : '#6b7280'
                }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <h3 className="text-lg font-semibold text-secondary-900 mb-3">Quantity</h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 border border-secondary-300 rounded-lg hover:bg-secondary-50 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 border border-secondary-300 rounded-lg hover:bg-secondary-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>
          <button
            onClick={handleAddToWishlist}
            className="p-3 border border-secondary-300 rounded-lg hover:bg-secondary-50 transition-colors"
          >
            <Heart className="w-5 h-5" />
          </button>
          <button
            onClick={handleShare}
            className="p-3 border border-secondary-300 rounded-lg hover:bg-secondary-50 transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-secondary-200">
          <div className="flex items-center space-x-3">
            <Truck className="w-5 h-5 text-primary-600" />
            <div>
              <div className="font-medium text-secondary-900">Free Shipping</div>
              <div className="text-sm text-secondary-600">On orders over $50</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <RotateCcw className="w-5 h-5 text-primary-600" />
            <div>
              <div className="font-medium text-secondary-900">Easy Returns</div>
              <div className="text-sm text-secondary-600">30-day return policy</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-primary-600" />
            <div>
              <div className="font-medium text-secondary-900">Secure Payment</div>
              <div className="text-sm text-secondary-600">100% secure checkout</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
