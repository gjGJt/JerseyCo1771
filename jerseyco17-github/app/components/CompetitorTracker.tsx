'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import { PriceComparison } from '@/app/types';

interface CompetitorTrackerProps {
  productId: string;
  onPriceAlert?: (alert: PriceAlert) => void;
}

interface PriceAlert {
  id: string;
  productId: string;
  type: 'price_drop' | 'price_increase' | 'out_of_stock' | 'back_in_stock';
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
}

const CompetitorTracker: React.FC<CompetitorTrackerProps> = ({ productId, onPriceAlert }) => {
  const [comparisons, setComparisons] = useState<PriceComparison[]>([]);
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [trackingEnabled, setTrackingEnabled] = useState(false);

  useEffect(() => {
    if (trackingEnabled) {
      fetchPriceComparisons();
      // Set up interval for regular updates
      const interval = setInterval(fetchPriceComparisons, 300000); // 5 minutes
      return () => clearInterval(interval);
    }
  }, [trackingEnabled, productId]);

  const fetchPriceComparisons = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/price-comparison?product=${productId}`);
      const data = await response.json();
      
      if (data.success) {
        setComparisons(data.comparisons);
        checkForAlerts(data.comparisons);
      }
    } catch (error) {
      console.error('Failed to fetch price comparisons:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkForAlerts = (newComparisons: PriceComparison[]) => {
    const newAlerts: PriceAlert[] = [];
    
    newComparisons.forEach(comparison => {
      // Check for significant price drops
      if (comparison.savings > 0 && comparison.savings > comparison.ourPrice * 0.1) {
        newAlerts.push({
          id: `price_drop_${Date.now()}`,
          productId: comparison.productId,
          type: 'price_drop',
          message: `Price dropped by ${Math.round((comparison.savings / comparison.ourPrice) * 100)}% at ${comparison.bestPrice.store}`,
          timestamp: new Date().toISOString(),
          severity: comparison.savings > comparison.ourPrice * 0.2 ? 'high' : 'medium'
        });
      }

      // Check for out of stock items
      comparison.competitorPrices.forEach(competitor => {
        if (!competitor.inStock) {
          newAlerts.push({
            id: `out_of_stock_${Date.now()}`,
            productId: comparison.productId,
            type: 'out_of_stock',
            message: `${competitor.store} is out of stock`,
            timestamp: new Date().toISOString(),
            severity: 'medium'
          });
        }
      });
    });

    if (newAlerts.length > 0) {
      setAlerts(prev => [...prev, ...newAlerts]);
      newAlerts.forEach(alert => onPriceAlert?.(alert));
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'price_drop':
        return <TrendingDown className="w-5 h-5 text-green-500" />;
      case 'price_increase':
        return <TrendingUp className="w-5 h-5 text-red-500" />;
      case 'out_of_stock':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'back_in_stock':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'low':
        return 'bg-green-50 border-green-200 text-green-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Competitor Price Tracker</h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setTrackingEnabled(!trackingEnabled)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              trackingEnabled
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-gray-100 text-gray-800 border border-gray-200'
            }`}
          >
            {trackingEnabled ? 'Tracking Active' : 'Start Tracking'}
          </button>
          <button
            onClick={fetchPriceComparisons}
            disabled={loading}
            className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium border border-blue-200 hover:bg-blue-200 disabled:opacity-50"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              'Refresh'
            )}
          </button>
        </div>
      </div>

      {/* Current Price Comparison */}
      {comparisons.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Current Prices</h4>
          <div className="space-y-3">
            {comparisons[0].competitorPrices
              .sort((a, b) => a.price - b.price)
              .map((competitor, index) => (
                <div
                  key={competitor.store}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    index === 0 ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold">{competitor.store}</span>
                    {competitor.inStock ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{formatPrice(competitor.price)}</p>
                    {competitor.discount && (
                      <p className="text-sm text-green-600">-{competitor.discount}% OFF</p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Price Alerts */}
      {alerts.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Recent Alerts</h4>
          <div className="space-y-3">
            {alerts.slice(0, 5).map((alert) => (
              <div
                key={alert.id}
                className={`flex items-center space-x-3 p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}
              >
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs opacity-75">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tracking Status */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Tracking Status</p>
            <p className="text-xs text-gray-600">
              {trackingEnabled 
                ? 'Monitoring competitor prices every 5 minutes' 
                : 'Price tracking is disabled'
              }
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${trackingEnabled ? 'bg-green-500' : 'bg-gray-400'}`} />
            <span className="text-sm text-gray-600">
              {trackingEnabled ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitorTracker;
