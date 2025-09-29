'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const heroSlides = [
  {
    id: 1,
    title: 'Premium Streetwear',
    subtitle: 'Urban Style Redefined',
    description: 'Discover our latest collection of streetwear essentials designed for the modern urban lifestyle.',
    image: '/images/hero-streetwear.jpg',
    cta: 'Shop Streetwear',
    href: '/collections/streetwear',
    color: 'from-gray-900 to-black',
  },
  {
    id: 2,
    title: 'Hoodies & Jackets',
    subtitle: 'Comfort Meets Style',
    description: 'Stay warm and stylish with our premium hoodies and jackets collection.',
    image: '/images/hero-hoodies.jpg',
    cta: 'Shop Hoodies',
    href: '/collections/hoodies',
    color: 'from-red-600 to-orange-600',
  },
  {
    id: 3,
    title: 'Baggy Jeans',
    subtitle: 'Trendy & Comfortable',
    description: 'Express your unique style with our collection of baggy jeans and denim.',
    image: '/images/hero-jeans.jpg',
    cta: 'Shop Jeans',
    href: '/collections/jeans',
    color: 'from-blue-600 to-indigo-600',
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className={`absolute inset-0 bg-gradient-to-r ${slide.color} ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundBlendMode: 'overlay',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom">
          <div className="max-w-2xl">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                {heroSlides[currentSlide].title}
              </h1>
              <h2 className="text-2xl md:text-3xl text-white/90 mb-6">
                {heroSlides[currentSlide].subtitle}
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-lg">
                {heroSlides[currentSlide].description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={heroSlides[currentSlide].href}
                  className="inline-flex items-center px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {heroSlides[currentSlide].cta}
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
                <button className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-colors">
                  <Play className="mr-2 w-5 h-5" />
                  Watch Video
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-white rotate-180" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-8 right-8 z-20 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
      >
        {isPlaying ? (
          <div className="w-6 h-6 border-2 border-white border-l-transparent rounded-full animate-spin" />
        ) : (
          <Play className="w-6 h-6 text-white" />
        )}
      </button>
    </section>
  );
}