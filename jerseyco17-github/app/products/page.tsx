import { Metadata } from 'next';
import { ProductGrid } from '@/app/components/ProductGrid';
import { ProductFilters } from '@/app/components/ProductFilters';
import { SearchBar } from '@/app/components/SearchBar';
import { SortOptions } from '@/app/components/SortOptions';

export const metadata: Metadata = {
  title: 'All Products - SportWear Hub',
  description: 'Browse our complete collection of athletic wear, streetwear, and sports gear. Find the perfect products for your active lifestyle.',
  keywords: ['products', 'sportswear', 'athletic wear', 'streetwear', 'sports gear'],
  openGraph: {
    title: 'All Products - SportWear Hub',
    description: 'Browse our complete collection of athletic wear, streetwear, and sports gear.',
    type: 'website',
  },
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            All Products
          </h1>
          <p className="text-lg text-secondary-600">
            Discover our complete collection of premium athletic wear and streetwear
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <SearchBar />
            </div>
            <div className="lg:w-80">
              <SortOptions />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-80">
            <ProductFilters />
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <ProductGrid />
          </main>
        </div>
      </div>
    </div>
  );
}
