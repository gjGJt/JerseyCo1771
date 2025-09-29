'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  User, 
  Heart,
  ChevronDown
} from 'lucide-react';
import { useCartStore } from '@/app/lib/store';

const categories = [
  { name: 'Streetwear', href: '/collections/streetwear', subcategories: ['Hoodies', 'Jackets', 'Jeans', 'T-Shirts', 'Accessories'] },
  { name: 'Men', href: '/collections/men', subcategories: ['Hoodies', 'Jackets', 'Jeans', 'T-Shirts', 'Shoes'] },
  { name: 'Women', href: '/collections/women', subcategories: ['Hoodies', 'Jackets', 'Jeans', 'Dresses', 'Shoes'] },
  { name: 'Hoodies', href: '/collections/hoodies', subcategories: ['Zip-Up', 'Pullover', 'Graphic', 'Plain'] },
  { name: 'Jackets', href: '/collections/jackets', subcategories: ['Puffer', 'Bomber', 'Denim', 'Leather'] },
  { name: 'Jeans', href: '/collections/jeans', subcategories: ['Baggy', 'Skinny', 'Straight', 'Ripped'] },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { items, isOpen, toggleCart, getTotalItems } = useCartStore();

  const totalItems = getTotalItems();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <span className="text-xl font-bold text-black">JerseyCo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {categories.map((category) => (
              <div
                key={category.name}
                className="relative group"
                onMouseEnter={() => setActiveCategory(category.name)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <Link
                  href={category.href}
                  className="flex items-center space-x-1 text-gray-700 hover:text-black transition-colors"
                >
                  <span>{category.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </Link>

                {/* Dropdown Menu */}
                {activeCategory === category.name && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub}
                        href={`${category.href}/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-black transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User Account */}
            <Link
              href="/account"
              className="hidden sm:flex items-center p-2 text-gray-600 hover:text-black transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="hidden sm:flex items-center p-2 text-gray-600 hover:text-black transition-colors"
            >
              <Heart className="w-5 h-5" />
            </Link>

            {/* Shopping Cart */}
            <button
              onClick={toggleCart}
              className="relative flex items-center p-2 text-gray-600 hover:text-black transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-black transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="py-4 space-y-4">
              {categories.map((category) => (
                <div key={category.name}>
                  <Link
                    href={category.href}
                    className="block text-lg font-medium text-gray-700 hover:text-black transition-colors"
                  >
                    {category.name}
                  </Link>
                  <div className="mt-2 space-y-1">
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub}
                        href={`${category.href}/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block text-sm text-gray-600 hover:text-black transition-colors ml-4"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <Link
                  href="/account"
                  className="flex items-center space-x-2 text-gray-700 hover:text-black transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>Account</span>
                </Link>
                <Link
                  href="/wishlist"
                  className="flex items-center space-x-2 text-gray-700 hover:text-black transition-colors mt-2"
                >
                  <Heart className="w-5 h-5" />
                  <span>Wishlist</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}