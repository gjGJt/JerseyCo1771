'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'streetwear',
    name: 'Streetwear',
    description: 'Urban fashion and lifestyle clothing',
    image: '/images/category-streetwear.jpg',
    href: '/collections/streetwear',
    color: 'from-gray-800 to-black',
    productCount: 175,
  },
  {
    id: 'hoodies',
    name: 'Hoodies',
    description: 'Comfortable and stylish hoodies for every occasion',
    image: '/images/category-hoodies.jpg',
    href: '/collections/hoodies',
    color: 'from-red-600 to-orange-600',
    productCount: 89,
  },
  {
    id: 'jackets',
    name: 'Jackets',
    description: 'Premium jackets and outerwear for all seasons',
    image: '/images/category-jackets.jpg',
    href: '/collections/jackets',
    color: 'from-blue-600 to-indigo-600',
    productCount: 67,
  },
  {
    id: 'jeans',
    name: 'Jeans',
    description: 'Trendy baggy jeans and denim collection',
    image: '/images/category-jeans.jpg',
    href: '/collections/jeans',
    color: 'from-indigo-600 to-purple-600',
    productCount: 45,
  },
  {
    id: 'men',
    name: 'Men',
    description: 'Men\'s streetwear and urban fashion',
    image: '/images/category-men.jpg',
    href: '/collections/men',
    color: 'from-gray-600 to-gray-800',
    productCount: 98,
  },
  {
    id: 'women',
    name: 'Women',
    description: 'Women\'s fashion and streetwear essentials',
    image: '/images/category-women.jpg',
    href: '/collections/women',
    color: 'from-pink-600 to-rose-600',
    productCount: 77,
  },
];

export function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Shop by Category
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Discover our carefully curated collections designed for the modern urban lifestyle
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href={category.href} className="block">
                {/* Background Image */}
                <div className="relative h-64 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90`}
                  />
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${category.image})`,
                      backgroundBlendMode: 'overlay',
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-end p-6">
                    <div className="text-white">
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="text-white/90 mb-3">{category.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/80">
                          {category.productCount} products
                        </span>
                        <div className="flex items-center text-white group-hover:translate-x-1 transition-transform duration-300">
                          <span className="text-sm font-medium mr-1">Shop Now</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Categories Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/collections"
            className="inline-flex items-center px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            View All Categories
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}