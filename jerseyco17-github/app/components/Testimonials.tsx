'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Fashion Blogger',
    avatar: '/images/avatars/priya.jpg',
    rating: 5,
    text: 'The quality of the streetwear is outstanding. I\'ve been using their products for my daily outfits and they never disappoint. Comfortable, durable, and stylish!',
  },
  {
    id: 2,
    name: 'Arjun Patel',
    role: 'Streetwear Enthusiast',
    avatar: '/images/avatars/arjun.jpg',
    rating: 5,
    text: 'Finally found a store that understands streetwear culture. The designs are fresh, the materials are premium, and the customer service is top-notch.',
  },
  {
    id: 3,
    name: 'Sneha Reddy',
    role: 'Fashion Designer',
    avatar: '/images/avatars/sneha.jpg',
    rating: 5,
    text: 'As a fashion designer, I need pieces that inspire. This store delivers exactly that. The streetwear collection has helped me create amazing looks.',
  },
  {
    id: 4,
    name: 'Rahul Kumar',
    role: 'Fashion Influencer',
    avatar: '/images/avatars/rahul.jpg',
    rating: 5,
    text: 'The curation of products is exceptional. Every piece I\'ve purchased has become a staple in my wardrobe. Highly recommend to anyone looking for quality streetwear.',
  },
  {
    id: 5,
    name: 'Ananya Singh',
    role: 'Style Blogger',
    avatar: '/images/avatars/ananya.jpg',
    rating: 5,
    text: 'The streetwear collection is perfect for my style. The fabrics are comfortable, the fit is flattering, and the designs are trendy.',
  },
  {
    id: 6,
    name: 'Vikram Joshi',
    role: 'Urban Explorer',
    avatar: '/images/avatars/vikram.jpg',
    rating: 5,
    text: 'Great selection of urban wear that fits my lifestyle perfectly. Fast shipping and excellent customer service. Will definitely be ordering again!',
  },
];

export function Testimonials() {
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
            What Our Customers Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="card p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              <div className="relative mb-4">
                <Quote className="w-8 h-8 text-gray-200 absolute -top-2 -left-2" />
                <p className="text-gray-700 italic relative z-10">
                  "{testimonial.text}"
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-semibold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-3xl md:text-4xl font-bold text-black mb-2">50K+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-black mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-black mb-2">100K+</div>
            <div className="text-gray-600">Products Sold</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-black mb-2">24/7</div>
            <div className="text-gray-600">Customer Support</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}