# JerseyCo17 Hosting Guide - Simplified

Complete guide for hosting your JerseyCo17 e-commerce platform with web scraping capabilities.

## 🚀 Quick Start Options

### Option 1: Vercel (Recommended - FREE)
**Best for**: Quick deployment, automatic scaling, built-in CI/CD

#### Steps:
1. **Connect to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login and deploy
   vercel login
   vercel
   ```

2. **Configure Environment Variables**
   In Vercel dashboard → Settings → Environment Variables:
   ```
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   SCRAPING_ENABLED=true
   DATABASE_URL=your_database_url
   ```

3. **Set up Cron Jobs**
   - Use Vercel Cron or external service like cron-job.org
   - Schedule: `0 */6 * * *` (every 6 hours)

**Cost**: Free tier available, $20/month for Pro

---

### Option 2: DigitalOcean App Platform
**Best for**: Production-ready deployment

#### Steps:
1. **Create App Spec**
   ```yaml
   # .do/app.yaml
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
     - key: DATABASE_URL
       value: ${db.DATABASE_URL}
   databases:
   - name: db
     engine: PG
     version: "15"
   ```

2. **Deploy**
   - Connect GitHub repository
   - Configure environment variables
   - Deploy automatically

**Cost**: $12/month for basic plan

---

### Option 3: Netlify (Alternative)
**Best for**: Static site hosting with serverless functions

#### Steps:
1. **Deploy to Netlify**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Login and deploy
   netlify login
   netlify deploy --prod
   ```

2. **Configure Environment**
   - Go to Netlify dashboard
   - Add environment variables
   - Set up build settings

**Cost**: Free tier available, $19/month for Pro

---

## 🗄️ Database Hosting

### Option 1: Supabase (Recommended - FREE)
```bash
# Install Supabase CLI
npm install -g supabase

# Initialize project
supabase init

# Start local development
supabase start

# Deploy to production
supabase db push
```

**Cost**: Free tier available, $25/month for Pro

### Option 2: PlanetScale
```bash
# Install PlanetScale CLI
brew install planetscale/tap/pscale

# Create database
pscale database create jerseyco17

# Connect
pscale connect jerseyco17 main
```

**Cost**: Free tier available, $29/month for Pro

### Option 3: Neon (PostgreSQL)
```bash
# Sign up at neon.tech
# Create new project
# Get connection string
# Add to environment variables
```

**Cost**: Free tier available, $19/month for Pro

---

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
JWT_SECRET=your-jwt-secret-key
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

---

## 🚀 Deployment Scripts

### Automated Deployment
```bash
#!/bin/bash
# deploy.sh

echo "🚀 Deploying JerseyCo17..."

# Build application
npm run build

# Run tests
npm run test

# Deploy to production
if [ "$1" = "vercel" ]; then
  vercel --prod
elif [ "$1" = "netlify" ]; then
  netlify deploy --prod
elif [ "$1" = "digitalocean" ]; then
  echo "Deploy to DigitalOcean App Platform"
else
  echo "Usage: ./deploy.sh [vercel|netlify|digitalocean]"
fi

echo "✅ Deployment complete!"
```

### Cron Job Setup
```bash
#!/bin/bash
# setup-cron.sh

# Add scraping cron job
(crontab -l 2>/dev/null; echo "0 */6 * * * cd /path/to/jerseyco17 && npm run scrape:all") | crontab -

# Add health check
(crontab -l 2>/dev/null; echo "*/5 * * * * curl -f http://localhost:3000/health || echo 'Service down'") | crontab -

echo "✅ Cron jobs configured"
```

---

## 📊 Monitoring Setup

### Health Check Endpoint
```javascript
// pages/api/health.js
export default function handler(req, res) {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version
  });
}
```

### Monitoring with PM2 (if using VPS)
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start npm --name "jerseyco17" -- start

# Monitor
pm2 monit

# Setup auto-restart
pm2 startup
pm2 save
```

---

## 🔒 Security Configuration

### SSL Certificate
```bash
# Install Certbot
sudo apt install certbot

# Get SSL certificate
sudo certbot certonly --standalone -d jerseyco17.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Firewall Setup
```bash
# Configure UFW
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

---

## 💰 Cost Comparison

| Option | Monthly Cost | Difficulty | Best For |
|--------|-------------|------------|----------|
| Vercel | $0-20 | Easy | Quick start |
| Netlify | $0-19 | Easy | Static sites |
| DigitalOcean | $12-24 | Medium | Production |

---

## 🎯 Recommended Setup

### For Beginners: Vercel + Supabase
1. Deploy to Vercel (free)
2. Use Supabase for database (free)
3. Set up external cron for scraping
4. Total cost: $0/month

### For Production: DigitalOcean + Supabase
1. Deploy to DigitalOcean App Platform
2. Use Supabase for database
3. Set up monitoring
4. Total cost: $12/month

### For Advanced: VPS + PM2
1. Get a VPS ($5/month)
2. Use PM2 for process management
3. Set up monitoring
4. Total cost: $5/month

---

## 🆘 Troubleshooting

### Common Issues
1. **Scraping fails**: Check rate limits and user agents
2. **Database connection**: Verify connection string
3. **Build errors**: Check Node.js version compatibility
4. **Performance**: Monitor memory usage and optimize

### Support Resources
- Check logs: `pm2 logs jerseyco17`
- Monitor resources: `pm2 monit`
- Restart services: `pm2 restart jerseyco17`

---

**Choose the option that best fits your needs and budget! 🚀**
