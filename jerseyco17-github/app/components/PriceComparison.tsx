'use client';

import React, { useState, useEffect } from 'react';
import { TrendingDown, TrendingUp, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';
import { PriceComparison, CompetitorPrice } from '@/app/types';

interface PriceComparisonProps {
  productId: string;
  productName: string;
  ourPrice: number;
  competitorPrices: CompetitorPrice[];
  bestPrice: CompetitorPrice;
  savings: number;
  priceHistory: Array<{
    date: string;
    price: number;
    store: string;
  }>;
}

const PriceComparisonComponent: React.FC<PriceComparisonProps> = ({
  productId,
  productName,
  ourPrice,
  competitorPrices,
  bestPrice,
  savings,
  priceHistory
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStoreLogo = (store: string) => {
    const logos: { [key: string]: string } = {
      'mizojerseyhome': '🏪',
      'zealevince': '🛍️',
      'nike': '✓',
      'adidas': '⚡',
      'jerseyco17': '🏆'
    };
    return logos[store] || '🏪';
  };

  const getStoreName = (store: string) => {
    const names: { [key: string]: string } = {
      'mizojerseyhome': 'Mizo Jersey Home',
      'zealevince': 'Zeal Evince',
      'nike': 'Nike',
      'adidas': 'Adidas',
      'jerseyco17': 'JerseyCo17'
    };
    return names[store] || store;
  };

  const isOurPriceBest = bestPrice.store === 'jerseyco17';
  const savingsPercentage = Math.round((savings / ourPrice) * 100);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Price Comparison</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          {isExpanded ? 'Show Less' : 'Show Details'}
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Our Price</p>
              <p className="text-2xl font-bold text-green-700">{formatPrice(ourPrice)}</p>
            </div>
            <div className="text-green-600">
              {isOurPriceBest ? <CheckCircle className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Best Price</p>
              <p className="text-2xl font-bold text-blue-700">{formatPrice(bestPrice.price)}</p>
              <p className="text-xs text-blue-500">{getStoreName(bestPrice.store)}</p>
            </div>
            <div className="text-blue-600">
              <TrendingDown className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className={`border rounded-lg p-4 ${savings > 0 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${savings > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {savings > 0 ? 'Overpriced by' : 'Savings'}
              </p>
              <p className={`text-2xl font-bold ${savings > 0 ? 'text-red-700' : 'text-green-700'}`}>
                {formatPrice(Math.abs(savings))}
              </p>
              <p className={`text-xs ${savings > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {Math.abs(savingsPercentage)}%
              </p>
            </div>
            <div className={savings > 0 ? 'text-red-600' : 'text-green-600'}>
              {savings > 0 ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Comparison */}
      {isExpanded && (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900 mb-3">All Prices</h4>
          <div className="space-y-3">
            {competitorPrices
              .sort((a, b) => a.price - b.price)
              .map((competitor, index) => (
                <div
                  key={competitor.store}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    competitor.store === 'jerseyco17'
                      ? 'bg-blue-50 border-blue-200'
                      : competitor.store === bestPrice.store
                      ? 'bg-green-50 border-green-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getStoreLogo(competitor.store)}</span>
                    <div>
                      <p className="font-medium text-gray-900">{getStoreName(competitor.store)}</p>
                      {competitor.originalPrice && (
                        <p className="text-sm text-gray-500 line-through">
                          {formatPrice(competitor.originalPrice)}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        {formatPrice(competitor.price)}
                      </p>
                      {competitor.discount && (
                        <p className="text-sm text-green-600 font-medium">
                          -{competitor.discount}% OFF
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {competitor.inStock ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      )}
                      
                      {competitor.url && (
                        <a
                          href={competitor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Price History */}
          {priceHistory.length > 1 && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Price History</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  {priceHistory
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 5)
                    .map((entry, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          {new Date(entry.date).toLocaleDateString()}
                        </span>
                        <span className="font-medium">{formatPrice(entry.price)}</span>
                        <span className="text-gray-500">{getStoreName(entry.store)}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PriceComparisonComponent;
