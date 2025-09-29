'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, ThumbsDown, Filter } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  helpful: number;
  verified: boolean;
}

interface ProductReviewsProps {
  productId: string;
}

const mockReviews: Review[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    rating: 5,
    date: '2024-01-20',
    title: 'Perfect fit and comfort!',
    comment: 'These shoes are amazing! The fit is perfect and they\'re so comfortable for all-day wear. The design is exactly what I was looking for.',
    helpful: 12,
    verified: true,
  },
  {
    id: '2',
    name: 'Mike Chen',
    rating: 4,
    date: '2024-01-18',
    title: 'Great quality, minor sizing issue',
    comment: 'Overall great shoes, but I had to size up half a size. The quality is excellent and they look great.',
    helpful: 8,
    verified: true,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    rating: 5,
    date: '2024-01-15',
    title: 'Love these!',
    comment: 'Perfect for my daily runs. The cushioning is excellent and they look stylish too. Highly recommend!',
    helpful: 15,
    verified: true,
  },
  {
    id: '4',
    name: 'David Kim',
    rating: 3,
    date: '2024-01-12',
    title: 'Good but not perfect',
    comment: 'The shoes are decent quality but the sizing runs a bit small. Had to return for a larger size.',
    helpful: 5,
    verified: false,
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    rating: 5,
    date: '2024-01-10',
    title: 'Excellent purchase',
    comment: 'These are my new favorite shoes! Comfortable, stylish, and great for both casual wear and light exercise.',
    helpful: 20,
    verified: true,
  },
];

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [filter, setFilter] = useState<'all' | '5' | '4' | '3' | '2' | '1'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'helpful'>('newest');
  const [showForm, setShowForm] = useState(false);

  const filteredReviews = reviews
    .filter(review => filter === 'all' || review.rating.toString() === filter)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'helpful':
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingCounts = reviews.reduce((counts, review) => {
    counts[review.rating] = (counts[review.rating] || 0) + 1;
    return counts;
  }, {} as Record<number, number>);

  const handleHelpful = (reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
  };

  return (
    <div className="mt-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-2xl font-bold text-secondary-900 mb-6"
      >
        Customer Reviews
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Review Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-secondary-900 mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(averageRating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-secondary-300'
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-secondary-600">
                Based on {reviews.length} reviews
              </div>
            </div>

            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(rating => (
                <div key={rating} className="flex items-center space-x-2">
                  <span className="text-sm text-secondary-600 w-8">{rating}</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <div className="flex-1 bg-secondary-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{
                        width: `${((ratingCounts[rating] || 0) / reviews.length) * 100}%`
                      }}
                    />
                  </div>
                  <span className="text-sm text-secondary-600 w-8">
                    {ratingCounts[rating] || 0}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2">
          {/* Filters and Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-secondary-500" />
                <span className="text-sm text-secondary-600">Filter:</span>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="text-sm border border-secondary-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-secondary-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-sm border border-secondary-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>
          </div>

          {/* Reviews */}
          <div className="space-y-6">
            {filteredReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="card p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold text-sm">
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-secondary-900">{review.name}</div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-secondary-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-secondary-500">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                        {review.verified && (
                          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <h4 className="font-semibold text-secondary-900 mb-2">{review.title}</h4>
                <p className="text-secondary-700 mb-4">{review.comment}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleHelpful(review.id)}
                      className="flex items-center space-x-1 text-sm text-secondary-600 hover:text-primary-600 transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                    <button className="flex items-center space-x-1 text-sm text-secondary-600 hover:text-primary-600 transition-colors">
                      <ThumbsDown className="w-4 h-4" />
                      <span>Not helpful</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Write Review Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              Write a Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
