'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubscribed(true);
      toast.success('Successfully subscribed to our newsletter!');
      setEmail('');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="py-16 bg-black text-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay in the Loop
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Get exclusive access to new arrivals, special offers, and style tips delivered straight to your inbox.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center space-x-3 text-white"
              >
                <Check className="w-6 h-6 text-green-400" />
                <span className="text-lg font-medium">You're subscribed!</span>
              </motion.div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-300">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span className="text-sm">No spam, ever</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span className="text-sm">Unsubscribe anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span className="text-sm">Exclusive offers</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}