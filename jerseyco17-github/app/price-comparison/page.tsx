'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, TrendingDown, TrendingUp, ExternalLink, RefreshCw } from 'lucide-react';
import PriceComparisonComponent from '@/app/components/PriceComparison';
import CompetitorTracker from '@/app/components/CompetitorTracker';
import { PriceComparison } from '@/app/types';

export default function PriceComparisonPage() {
  const [comparisons, setComparisons] = useState<PriceComparison[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState<'savings' | 'price' | 'name'>('savings');

  const brands = ['Nike', 'Adidas', 'Puma', 'Under Armour', 'Jordan'];
  const categories = ['Sports Jerseys', 'Athletic Wear', 'Streetwear', 'Basketball', 'Football', 'Soccer'];

  useEffect(() => {
    fetchPriceComparisons();
  }, []);

  const fetchPriceComparisons = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('product', searchQuery);
      if (selectedBrand) params.append('brand', selectedBrand);
      if (selectedCategory) params.append('category', selectedCategory);

      const response = await fetch(`/api/price-comparison?${params.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setComparisons(data.comparisons);
      }
    } catch (error) {
      console.error('Failed to fetch price comparisons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPriceComparisons();
  };

  const sortedComparisons = [...comparisons].sort((a, b) => {
    switch (sortBy) {
      case 'savings':
        return b.savings - a.savings;
      case 'price':
        return a.ourPrice - b.ourPrice;
      case 'name':
        return a.productName.localeCompare(b.productName);
      default:
        return 0;
    }
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Price Comparison
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Compare prices across multiple stores and find the best deals on sports jerseys and athletic wear. 
            We track prices from Nike, Adidas, and other major retailers to ensure you get the best value.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Sort Options */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="savings">Best Savings</option>
                <option value="price">Price (Low to High)</option>
                <option value="name">Product Name</option>
              </select>
            </div>
            
            <div className="text-sm text-gray-600">
              {comparisons.length} products found
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading price comparisons...</span>
          </div>
        ) : comparisons.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or browse our categories.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedComparisons.map((comparison) => (
              <div key={comparison.productId}>
                <PriceComparisonComponent {...comparison} />
              </div>
            ))}
          </div>
        )}

        {/* Competitor Tracking Section */}
        <div className="mt-12">
          <CompetitorTracker 
            productId="all" 
            onPriceAlert={(alert) => {
              console.log('Price alert:', alert);
              // In a real app, you might show a notification or send an email
            }}
          />
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Get the Best Deals</h2>
          <p className="text-lg mb-6">
            Sign up for price alerts and never miss a great deal on your favorite sports gear.
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Sign Up for Price Alerts
          </button>
        </div>
      </div>
    </div>
  );
}
