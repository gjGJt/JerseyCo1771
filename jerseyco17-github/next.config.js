/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['mizojerseyhome.in', 'zealevince.in', 'images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
  async rewrites() {
    return [
      {
        source: '/api/scrape/:path*',
        destination: '/api/scrape/:path*',
      },
    ];
  },
}

module.exports = nextConfig
