'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';
import { useProductStore } from '@/app/lib/store';

const brands = ['Nike', 'Adidas', 'Under Armour', 'Puma', 'Reebok', 'Champion', 'Jordan'];
const categories = ['Athletic', 'Streetwear', 'Men', 'Women', 'Accessories'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL'];
const colors = ['Black', 'White', 'Navy', 'Blue', 'Red', 'Gray', 'Olive', 'Green'];
const priceRanges = [
  { label: 'Under $25', value: [0, 25] },
  { label: '$25 - $50', value: [25, 50] },
  { label: '$50 - $100', value: [50, 100] },
  { label: '$100 - $200', value: [100, 200] },
  { label: 'Over $200', value: [200, 1000] },
];

export function ProductFilters() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>(['category', 'brand']);
  const { filters, setFilters, applyFilters } = useProductStore();

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brand?.includes(brand)
      ? filters.brand.filter(b => b !== brand)
      : [...(filters.brand || []), brand];
    
    setFilters({ ...filters, brand: newBrands });
    applyFilters();
  };

  const handleCategoryChange = (category: string) => {
    setFilters({ 
      ...filters, 
      category: filters.category === category ? undefined : category 
    });
    applyFilters();
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    setFilters({ 
      ...filters, 
      priceRange: filters.priceRange?.toString() === range.toString() ? undefined : range 
    });
    applyFilters();
  };

  const handleSizeChange = (size: string) => {
    const newSizes = filters.sizes?.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...(filters.sizes || []), size];
    
    setFilters({ ...filters, sizes: newSizes });
    applyFilters();
  };

  const handleColorChange = (color: string) => {
    const newColors = filters.colors?.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...(filters.colors || []), color];
    
    setFilters({ ...filters, colors: newColors });
    applyFilters();
  };

  const handleStockChange = (inStock: boolean) => {
    setFilters({ 
      ...filters, 
      inStock: filters.inStock === inStock ? undefined : inStock 
    });
    applyFilters();
  };

  const clearFilters = () => {
    setFilters({});
    applyFilters();
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    Array.isArray(value) ? value.length > 0 : value !== undefined
  );

  return (
    <>
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full flex items-center justify-between p-4 bg-white rounded-lg border border-secondary-200 mb-4"
      >
        <span className="font-medium">Filters</span>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
              {Object.values(filters).filter(v => Array.isArray(v) ? v.length > 0 : v !== undefined).length}
            </span>
          )}
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Filter Panel */}
      <motion.div
        initial={false}
        animate={{ height: isOpen || window.innerWidth >= 1024 ? 'auto' : 0 }}
        className={`lg:block ${isOpen ? 'block' : 'hidden'} bg-white rounded-lg border border-secondary-200 p-6`}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Filters</h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 flex items-center space-x-1"
            >
              <X className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        <div className="space-y-6">
          {/* Category Filter */}
          <div>
            <button
              onClick={() => toggleSection('category')}
              className="w-full flex items-center justify-between text-left font-medium mb-3"
            >
              <span>Category</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${
                openSections.includes('category') ? 'rotate-180' : ''
              }`} />
            </button>
            <motion.div
              initial={false}
              animate={{ 
                height: openSections.includes('category') ? 'auto' : 0,
                opacity: openSections.includes('category') ? 1 : 0
              }}
              className="overflow-hidden"
            >
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={filters.category === category.toLowerCase()}
                      onChange={() => handleCategoryChange(category.toLowerCase())}
                      className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-secondary-700">{category}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Brand Filter */}
          <div>
            <button
              onClick={() => toggleSection('brand')}
              className="w-full flex items-center justify-between text-left font-medium mb-3"
            >
              <span>Brand</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${
                openSections.includes('brand') ? 'rotate-180' : ''
              }`} />
            </button>
            <motion.div
              initial={false}
              animate={{ 
                height: openSections.includes('brand') ? 'auto' : 0,
                opacity: openSections.includes('brand') ? 1 : 0
              }}
              className="overflow-hidden"
            >
              <div className="space-y-2">
                {brands.map(brand => (
                  <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.brand?.includes(brand) || false}
                      onChange={() => handleBrandChange(brand)}
                      className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-secondary-700">{brand}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Price Range Filter */}
          <div>
            <button
              onClick={() => toggleSection('price')}
              className="w-full flex items-center justify-between text-left font-medium mb-3"
            >
              <span>Price Range</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${
                openSections.includes('price') ? 'rotate-180' : ''
              }`} />
            </button>
            <motion.div
              initial={false}
              animate={{ 
                height: openSections.includes('price') ? 'auto' : 0,
                opacity: openSections.includes('price') ? 1 : 0
              }}
              className="overflow-hidden"
            >
              <div className="space-y-2">
                {priceRanges.map((range, index) => (
                  <label key={index} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={filters.priceRange?.toString() === range.value.toString()}
                      onChange={() => handlePriceRangeChange(range.value as [number, number])}
                      className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-secondary-700">{range.label}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Size Filter */}
          <div>
            <button
              onClick={() => toggleSection('size')}
              className="w-full flex items-center justify-between text-left font-medium mb-3"
            >
              <span>Size</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${
                openSections.includes('size') ? 'rotate-180' : ''
              }`} />
            </button>
            <motion.div
              initial={false}
              animate={{ 
                height: openSections.includes('size') ? 'auto' : 0,
                opacity: openSections.includes('size') ? 1 : 0
              }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-2">
                {sizes.map(size => (
                  <label key={size} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.sizes?.includes(size) || false}
                      onChange={() => handleSizeChange(size)}
                      className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-secondary-700">{size}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Color Filter */}
          <div>
            <button
              onClick={() => toggleSection('color')}
              className="w-full flex items-center justify-between text-left font-medium mb-3"
            >
              <span>Color</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${
                openSections.includes('color') ? 'rotate-180' : ''
              }`} />
            </button>
            <motion.div
              initial={false}
              animate={{ 
                height: openSections.includes('color') ? 'auto' : 0,
                opacity: openSections.includes('color') ? 1 : 0
              }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-2">
                {colors.map(color => (
                  <label key={color} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.colors?.includes(color) || false}
                      onChange={() => handleColorChange(color)}
                      className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-secondary-700">{color}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stock Filter */}
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.inStock === true}
                onChange={() => handleStockChange(true)}
                className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-secondary-700">In Stock Only</span>
            </label>
          </div>
        </div>
      </motion.div>
    </>
  );
}
