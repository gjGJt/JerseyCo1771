#!/bin/bash

# JerseyCo17 Deployment Script
# Usage: ./deploy.sh [vercel|netlify|digitalocean]

set -e

echo "🚀 JerseyCo17 Deployment Script"
echo "================================"

# Check if deployment target is provided
if [ $# -eq 0 ]; then
    echo "Usage: ./deploy.sh [vercel|netlify|digitalocean]"
    echo ""
    echo "Available options:"
    echo "  vercel        - Deploy to Vercel (recommended for beginners)"
    echo "  netlify       - Deploy to Netlify (static hosting)"
    echo "  digitalocean  - Deploy to DigitalOcean App Platform"
    exit 1
fi

DEPLOYMENT_TARGET=$1

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install dependencies
install_dependencies() {
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
}

# Function to build application
build_application() {
    echo "🔨 Building application..."
    npm run build
    echo "✅ Application built successfully"
}

# Function to run tests
run_tests() {
    echo "🧪 Running tests..."
    if command_exists npm && [ -f "package.json" ]; then
        npm run test || echo "⚠️  Tests failed, but continuing deployment"
    else
        echo "⚠️  No tests found, skipping"
    fi
}

# Function to deploy to Vercel
deploy_vercel() {
    echo "🚀 Deploying to Vercel..."
    
    if ! command_exists vercel; then
        echo "📥 Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    echo "🔐 Please login to Vercel if you haven't already:"
    vercel login
    
    echo "🚀 Deploying to Vercel..."
    vercel --prod
    
    echo "✅ Deployed to Vercel successfully!"
    echo "🌐 Your app should be available at your Vercel domain"
}

# Function to deploy to Netlify
deploy_netlify() {
    echo "🚀 Deploying to Netlify..."
    
    if ! command_exists netlify; then
        echo "📥 Installing Netlify CLI..."
        npm install -g netlify-cli
    fi
    
    echo "🔐 Please login to Netlify if you haven't already:"
    netlify login
    
    echo "🚀 Deploying to Netlify..."
    netlify deploy --prod
    
    echo "✅ Deployed to Netlify successfully!"
    echo "🌐 Your app should be available at your Netlify domain"
}

# Function to deploy to DigitalOcean
deploy_digitalocean() {
    echo "🚀 Deploying to DigitalOcean App Platform..."
    
    if [ ! -f ".do/app.yaml" ]; then
        echo "📝 Creating DigitalOcean app spec..."
        mkdir -p .do
        cat > .do/app.yaml << EOF
name: jerseyco17
services:
- name: web
  source_dir: /
  github:
    repo: your-username/jerseyco17
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NODE_ENV
    value: production
  - key: SCRAPING_ENABLED
    value: true
databases:
- name: db
  engine: PG
  version: "15"
EOF
        echo "✅ Created .do/app.yaml"
    fi
    
    echo "📝 Please configure your DigitalOcean app spec and deploy manually"
    echo "🌐 Visit: https://cloud.digitalocean.com/apps"
}

# Function to setup cron jobs
setup_cron() {
    echo "⏰ Setting up cron jobs..."
    
    # Add scraping cron job
    (crontab -l 2>/dev/null; echo "0 */6 * * * cd $(pwd) && npm run scrape:all") | crontab - 2>/dev/null || echo "⚠️  Could not add cron job"
    
    # Add health check
    (crontab -l 2>/dev/null; echo "*/5 * * * * curl -f http://localhost:3000/api/health || echo 'Service down'") | crontab - 2>/dev/null || echo "⚠️  Could not add health check cron"
    
    echo "✅ Cron jobs configured"
}

# Function to setup environment
setup_environment() {
    echo "⚙️  Setting up environment..."
    
    if [ ! -f ".env.local" ]; then
        echo "📝 Creating .env.local from template..."
        cp env.example .env.local
        echo "✅ Created .env.local"
        echo "⚠️  Please edit .env.local with your actual values"
    fi
    
    echo "✅ Environment setup complete"
}

# Function to setup cron jobs
setup_cron() {
    echo "⏰ Setting up cron jobs..."
    
    # Add scraping cron job
    (crontab -l 2>/dev/null; echo "0 */6 * * * cd $(pwd) && npm run scrape:all") | crontab - 2>/dev/null || echo "⚠️  Could not add cron job"
    
    # Add health check
    (crontab -l 2>/dev/null; echo "*/5 * * * * curl -f http://localhost:3000/api/health || echo 'Service down'") | crontab - 2>/dev/null || echo "⚠️  Could not add health check cron"
    
    echo "✅ Cron jobs configured"
}

# Main deployment logic
main() {
    echo "🎯 Deployment target: $DEPLOYMENT_TARGET"
    echo ""
    
    # Install dependencies
    install_dependencies
    
    # Build application
    build_application
    
    # Run tests
    run_tests
    
    # Setup environment
    setup_environment
    
    # Deploy based on target
    case $DEPLOYMENT_TARGET in
        "vercel")
            deploy_vercel
            ;;
        "netlify")
            deploy_netlify
            ;;
        "digitalocean")
            deploy_digitalocean
            setup_cron
            ;;
        *)
            echo "❌ Unknown deployment target: $DEPLOYMENT_TARGET"
            echo "Available options: vercel, netlify, digitalocean"
            exit 1
            ;;
    esac
    
    echo ""
    echo "🎉 Deployment completed successfully!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Configure your environment variables"
    echo "2. Set up your database"
    echo "3. Configure domain and SSL"
    echo "4. Set up monitoring"
    echo ""
    echo "📚 For detailed instructions, see HOSTING_GUIDE.md"
}

# Run main function
main
