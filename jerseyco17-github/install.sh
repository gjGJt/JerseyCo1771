#!/bin/bash

# SportWear Hub Installation Script
echo "🚀 Setting up SportWear Hub..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create data directory for scraping
echo "📁 Creating data directory..."
mkdir -p data

# Create environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "⚙️ Creating environment file..."
    cp env.example .env.local
    echo "📝 Please update .env.local with your configuration"
fi

# Create public images directory
echo "🖼️ Creating images directory..."
mkdir -p public/images/products
mkdir -p public/images/avatars
mkdir -p public/images/category

# Build the project
echo "🔨 Building the project..."
npm run build

echo "✅ Installation complete!"
echo ""
echo "🚀 To start the development server:"
echo "   npm run dev"
echo ""
echo "🌐 Open http://localhost:3000 in your browser"
echo ""
echo "🕷️ To run web scraping:"
echo "   npm run scrape"
echo ""
echo "📚 For more information, see README.md"
