# JerseyCo17 Hosting Guide

Complete guide for hosting your JerseyCo17 e-commerce platform with web scraping capabilities.

## 🚀 Quick Start Options

### Option 1: Vercel (Recommended for Beginners)
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

### Option 2: Railway (Best for Full-Stack)
**Best for**: Full-stack apps with databases

#### Steps:
1. **Deploy to Railway**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login and deploy
   railway login
   railway init
   railway up
   ```

2. **Add Database**
   ```bash
   # Add PostgreSQL
   railway add postgresql
   
   # Get connection string
   railway variables
   ```

3. **Configure Environment**
   ```bash
   railway variables set NODE_ENV=production
   railway variables set SCRAPING_ENABLED=true
   ```

**Cost**: $5/month for hobby plan

---

### Option 3: DigitalOcean App Platform
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

## 🐳 Docker Deployment

### Option 4: Docker + VPS
**Best for**: Full control, custom configurations

#### 1. Prepare Docker Setup
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

#### 2. Docker Compose
```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/jerseyco17
      - SCRAPING_ENABLED=true
    depends_on:
      - db
      - redis
    restart: unless-stopped

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=jerseyco17
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

#### 3. Deploy to VPS
```bash
# On your VPS (Ubuntu/Debian)
sudo apt update
sudo apt install docker.io docker-compose

# Clone repository
git clone https://github.com/your-username/jerseyco17.git
cd jerseyco17

# Start services
docker-compose up -d

# Check status
docker-compose ps
```

**VPS Providers**:
- DigitalOcean: $5/month
- Linode: $5/month
- Vultr: $3.50/month
- AWS EC2: $3.50/month

---

## ☁️ Cloud Platform Options

### Option 5: AWS (Advanced)
**Best for**: Enterprise-scale applications

#### 1. AWS Elastic Beanstalk
```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init

# Create environment
eb create production

# Deploy
eb deploy
```

#### 2. AWS ECS with Fargate
```yaml
# task-definition.json
{
  "family": "jerseyco17",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "jerseyco17",
      "image": "your-account.dkr.ecr.region.amazonaws.com/jerseyco17:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ]
    }
  ]
}
```

**Cost**: $10-50/month depending on usage

---

### Option 6: Google Cloud Platform
**Best for**: Google services integration

#### 1. App Engine
```yaml
# app.yaml
runtime: nodejs18
env: standard
instance_class: F2

env_variables:
  NODE_ENV: production
  DATABASE_URL: your_database_url
  SCRAPING_ENABLED: true

automatic_scaling:
  min_instances: 1
  max_instances: 10
```

#### 2. Cloud Run
```bash
# Build and deploy
gcloud builds submit --tag gcr.io/your-project/jerseyco17
gcloud run deploy --image gcr.io/your-project/jerseyco17 --platform managed
```

**Cost**: $5-25/month

---

## 🗄️ Database Hosting

### Option 1: Supabase (Recommended)
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

### Option 3: AWS RDS
```bash
# Create RDS instance
aws rds create-db-instance \
  --db-instance-identifier jerseyco17 \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password your-password
```

**Cost**: $15-50/month

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
elif [ "$1" = "railway" ]; then
  railway up
elif [ "$1" = "docker" ]; then
  docker-compose up -d
else
  echo "Usage: ./deploy.sh [vercel|railway|docker]"
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

### Monitoring with PM2
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
| Railway | $5-25 | Easy | Full-stack |
| DigitalOcean | $12-24 | Medium | Production |
| AWS | $10-50 | Hard | Enterprise |
| VPS + Docker | $5-20 | Medium | Custom setup |

---

## 🎯 Recommended Setup

### For Beginners: Vercel + Supabase
1. Deploy to Vercel (free)
2. Use Supabase for database (free)
3. Set up external cron for scraping
4. Total cost: $0/month

### For Production: DigitalOcean + Docker
1. Deploy to DigitalOcean App Platform
2. Use managed PostgreSQL
3. Set up monitoring
4. Total cost: $17/month

### For Enterprise: AWS + ECS
1. Deploy to AWS ECS
2. Use RDS for database
3. Set up CloudWatch monitoring
4. Total cost: $30-100/month

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

**Choose the option that best fits your needs and budget!** 🚀
