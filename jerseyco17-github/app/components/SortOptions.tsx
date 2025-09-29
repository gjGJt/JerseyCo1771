'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useProductStore } from '@/app/lib/store';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'popularity', label: 'Most Popular' },
];

export function SortOptions() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('featured');
  const { filters, setFilters, applyFilters } = useProductStore();

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    
    // Parse sort value
    const [sortBy, sortOrder] = value.includes('-') 
      ? value.split('-') 
      : [value, 'asc'];
    
    setFilters({
      ...filters,
      sortBy: sortBy as any,
      sortOrder: sortOrder as 'asc' | 'desc'
    });
    
    applyFilters();
    setIsOpen(false);
  };

  const selectedOption = sortOptions.find(option => option.value === selectedSort);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-secondary-300 rounded-lg hover:border-secondary-400 transition-colors"
      >
        <span className="text-sm font-medium text-secondary-700">
          Sort by: {selectedOption?.label}
        </span>
        <ChevronDown className={`w-4 h-4 text-secondary-400 transition-transform ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-secondary-200 rounded-lg shadow-lg z-50">
          <div className="py-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortChange(option.value)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  selectedSort === option.value
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-secondary-700 hover:bg-secondary-50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
