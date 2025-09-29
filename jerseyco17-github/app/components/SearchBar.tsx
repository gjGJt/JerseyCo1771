'use client';

import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

const searchSuggestions = [
  'Socket head cap screw',
  'Hex nut M8',
  'Flat washer',
  'Threaded rod',
  'Machine screw',
  'Lock washer',
  'Socket wrench',
  'Allen key',
  'Torque wrench',
  'Measuring tape'
];

const quickFilters = [
  { name: 'Fasteners', count: '50,000+' },
  { name: 'Tools', count: '25,000+' },
  { name: 'Hardware', count: '30,000+' },
  { name: 'Electrical', count: '20,000+' },
  { name: 'Plumbing', count: '10,000+' },
  { name: 'Automation', count: '15,000+' }
];

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Handle search logic
      console.log('Searching for:', query);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setIsFocused(false);
  };

  const clearSearch = () => {
    setQuery('');
    setIsFocused(false);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder="Search part number, description, or keyword..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
          
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>
      </form>

      {/* Search Suggestions */}
      {isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          <div className="p-4">
            <div className="text-sm text-gray-500 mb-3">Popular searches:</div>
            <div className="space-y-1">
              {searchSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Filters */}
      {showFilters && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Quick Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {quickFilters.map((filter, index) => (
                <button
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
                >
                  <div className="font-medium text-gray-900">{filter.name}</div>
                  <div className="text-sm text-gray-500">{filter.count} items</div>
                </button>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {(isFocused || showFilters) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsFocused(false);
            setShowFilters(false);
          }}
        />
      )}
    </div>
  );
}