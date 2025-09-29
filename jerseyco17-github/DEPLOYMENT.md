# JerseyCo17 Deployment Guide

This guide covers deploying JerseyCo17 to various platforms with proper configuration for web scraping and SEO optimization.

## 🚀 Quick Deployment (Vercel)

### 1. Prerequisites
- GitHub repository
- Vercel account
- Environment variables configured

### 2. Deploy to Vercel

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy
   vercel
   ```

2. **Configure Environment Variables**
   In Vercel dashboard, add these variables:
   ```
   NEXT_PUBLIC_SITE_URL=https://jerseyco17.com
   SCRAPING_ENABLED=true
   DATABASE_URL=your_database_url
   ```

3. **Set up Cron Jobs**
   ```bash
   # Add to Vercel dashboard or use external cron service
   # Schedule: 0 */6 * * * (every 6 hours)
   ```

## 🐳 Docker Deployment

### 1. Create Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### 2. Build and Run
```bash
# Build image
docker build -t jerseyco17 .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL=your_database_url \
  -e SCRAPING_ENABLED=true \
  jerseyco17
```

### 3. Docker Compose
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/jerseyco17
      - SCRAPING_ENABLED=true
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=jerseyco17
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

## ☁️ Cloud Deployment

### AWS Deployment

1. **EC2 Instance Setup**
   ```bash
   # Launch EC2 instance
   # Install Node.js, PM2, and dependencies
   sudo apt update
   sudo apt install nodejs npm
   npm install -g pm2
   ```

2. **Deploy Application**
   ```bash
   # Clone repository
   git clone https://github.com/your-username/jerseyco17.git
   cd jerseyco17
   
   # Install dependencies
   npm install
   
   # Build application
   npm run build
   
   # Start with PM2
   pm2 start npm --name "jerseyco17" -- start
   pm2 save
   pm2 startup
   ```

3. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name jerseyco17.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Google Cloud Platform

1. **App Engine Deployment**
   ```yaml
   # app.yaml
   runtime: nodejs18
   env: standard
   
   env_variables:
     NODE_ENV: production
     DATABASE_URL: your_database_url
     SCRAPING_ENABLED: true
   ```

2. **Deploy**
   ```bash
   gcloud app deploy
   ```

## 🔧 Environment Configuration

### Production Environment Variables

```bash
# Core Configuration
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://jerseyco17.com
NEXT_PUBLIC_SITE_NAME=JerseyCo17

# Database
DATABASE_URL=postgresql://user:pass@host:5432/jerseyco17

# Scraping
SCRAPING_ENABLED=true
SCRAPING_SCHEDULE=0 */6 * * *
SCRAPING_DELAY=2000
SCRAPING_TIMEOUT=30000

# Security
JWT_SECRET=your-jwt-secret
ENCRYPTION_KEY=your-encryption-key
SESSION_SECRET=your-session-secret

# Analytics
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
GOOGLE_TAG_MANAGER_ID=GTM_ID

# SEO
GOOGLE_VERIFICATION=your-google-verification
BING_VERIFICATION=your-bing-verification

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Storage
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_S3_BUCKET=jerseyco17-images
```

## 📊 Monitoring Setup

### 1. Application Monitoring
```bash
# Install monitoring tools
npm install -g pm2
npm install -g clinic

# Monitor performance
clinic doctor -- node server.js
```

### 2. Log Management
```bash
# Configure log rotation
sudo nano /etc/logrotate.d/jerseyco17

# Log rotation config
/var/log/jerseyco17/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
}
```

### 3. Health Checks
```javascript
// health-check.js
const express = require('express');
const app = express();

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.listen(3001);
```

## 🔒 Security Configuration

### 1. SSL/TLS Setup
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d jerseyco17.com
```

### 2. Firewall Configuration
```bash
# Configure UFW
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### 3. Rate Limiting
```javascript
// rate-limiter.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api/', limiter);
```

## 🚀 Performance Optimization

### 1. CDN Configuration
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['cdn.jerseyco17.com'],
    loader: 'custom',
    loaderFile: './lib/imageLoader.js'
  }
}
```

### 2. Caching Strategy
```javascript
// cache-config.js
const cacheConfig = {
  static: {
    maxAge: '1y',
    immutable: true
  },
  api: {
    maxAge: '1h'
  },
  scraping: {
    maxAge: '6h'
  }
};
```

### 3. Database Optimization
```sql
-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_created_at ON products(created_at);
```

## 📈 SEO Deployment Checklist

### 1. Pre-deployment
- [ ] All meta tags configured
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] Structured data implemented
- [ ] Images optimized
- [ ] Performance optimized

### 2. Post-deployment
- [ ] Submit sitemap to Google Search Console
- [ ] Verify Google Analytics
- [ ] Test all pages for SEO
- [ ] Check mobile-friendliness
- [ ] Validate structured data

### 3. Ongoing Monitoring
- [ ] Monitor Core Web Vitals
- [ ] Track search rankings
- [ ] Analyze competitor data
- [ ] Update content regularly
- [ ] Monitor backlinks

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📞 Support

For deployment issues:
- Check logs: `pm2 logs jerseyco17`
- Monitor resources: `pm2 monit`
- Restart services: `pm2 restart jerseyco17`

## 🎯 Performance Targets

- **Page Load Time**: < 3 seconds
- **Lighthouse Score**: 90+
- **Core Web Vitals**: All green
- **Uptime**: 99.9%
- **Scraping Success Rate**: 95%+

---

**JerseyCo17** - Deployed with confidence and optimized for performance.
