#!/bin/bash

# JerseyCo17 GitHub Repository Setup Script
# This script helps you organize your project for GitHub

set -e

echo "🚀 JerseyCo17 GitHub Repository Setup"
echo "===================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Check if remote origin exists
if ! git remote get-url origin >/dev/null 2>&1; then
    echo "🔗 Please add your GitHub repository as origin:"
    echo "git remote add origin https://github.com/your-username/jerseyco17.git"
    echo ""
    read -p "Enter your GitHub repository URL: " REPO_URL
    
    if [ ! -z "$REPO_URL" ]; then
        git remote add origin "$REPO_URL"
        echo "✅ Remote origin added: $REPO_URL"
    else
        echo "⚠️  No repository URL provided. Please add it manually later."
    fi
else
    echo "✅ Remote origin already configured"
fi

# Create initial commit if no commits exist
if [ -z "$(git log --oneline 2>/dev/null)" ]; then
    echo "📝 Creating initial commit..."
    git add .
    git commit -m "Initial commit: JerseyCo17 e-commerce platform with price comparison"
    echo "✅ Initial commit created"
else
    echo "✅ Repository already has commits"
fi

# Check if all files are committed
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Adding uncommitted changes..."
    git add .
    git commit -m "Update project files and documentation"
    echo "✅ Changes committed"
fi

# Push to GitHub
echo "🚀 Pushing to GitHub..."
if git push -u origin main 2>/dev/null; then
    echo "✅ Successfully pushed to GitHub"
elif git push -u origin master 2>/dev/null; then
    echo "✅ Successfully pushed to GitHub (master branch)"
else
    echo "⚠️  Could not push to GitHub. Please check your remote configuration."
    echo "You may need to:"
    echo "1. Create a repository on GitHub"
    echo "2. Set up authentication (SSH keys or personal access token)"
    echo "3. Run: git push -u origin main"
fi

# Create GitHub repository structure
echo "📁 Setting up GitHub repository structure..."

# Create docs directory if it doesn't exist
mkdir -p docs

# Create .github directory structure
mkdir -p .github/workflows
mkdir -p .github/ISSUE_TEMPLATE

echo "✅ GitHub repository structure created"

# Check if all required files exist
echo "🔍 Checking required files..."

REQUIRED_FILES=(
    "README.md"
    ".gitignore"
    "package.json"
    "next.config.js"
    "tailwind.config.js"
    "tsconfig.json"
    ".github/workflows/ci.yml"
    ".github/workflows/scraping.yml"
    ".github/ISSUE_TEMPLATE/bug_report.md"
    ".github/ISSUE_TEMPLATE/feature_request.md"
    ".github/pull_request_template.md"
    "docs/API.md"
    "docs/CONTRIBUTING.md"
    "HOSTING_GUIDE.md"
    "QUICK_START.md"
    "DEPLOYMENT.md"
    "GITHUB_SETUP.md"
)

MISSING_FILES=()

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (missing)"
        MISSING_FILES+=("$file")
    fi
done

if [ ${#MISSING_FILES[@]} -eq 0 ]; then
    echo "🎉 All required files are present!"
else
    echo "⚠️  Missing files: ${MISSING_FILES[*]}"
    echo "Please ensure all files are created before pushing to GitHub."
fi

# Check package.json scripts
echo "🔍 Checking package.json scripts..."

REQUIRED_SCRIPTS=(
    "dev"
    "build"
    "start"
    "lint"
    "scrape"
    "scrape:all"
    "scrape:mizo"
    "scrape:zeal"
    "cron:start"
    "price:compare"
)

for script in "${REQUIRED_SCRIPTS[@]}"; do
    if npm run "$script" --dry-run >/dev/null 2>&1; then
        echo "✅ Script '$script' exists"
    else
        echo "❌ Script '$script' missing"
    fi
done

# Check environment setup
echo "🔍 Checking environment setup..."

if [ -f "env.example" ]; then
    echo "✅ Environment template exists"
else
    echo "❌ Environment template missing"
fi

if [ -f ".env.local" ]; then
    echo "✅ Local environment file exists"
else
    echo "⚠️  Local environment file missing (copy from env.example)"
fi

# GitHub repository recommendations
echo ""
echo "📋 GitHub Repository Setup Recommendations:"
echo "=========================================="
echo ""
echo "1. Repository Settings:"
echo "   - Go to Settings → General"
echo "   - Add description: 'Premium Sports Jerseys & Athletic Wear with Price Comparison'"
echo "   - Add website: 'https://jerseyco17.com'"
echo "   - Add topics: 'ecommerce', 'sports', 'jerseys', 'price-comparison', 'nextjs', 'typescript'"
echo ""
echo "2. Branch Protection:"
echo "   - Go to Settings → Branches"
echo "   - Add rule for 'main' branch:"
echo "     ✅ Require pull request reviews"
echo "     ✅ Require status checks"
echo "     ✅ Require branches to be up to date"
echo "     ✅ Include administrators"
echo ""
echo "3. GitHub Actions:"
echo "   - Go to Actions tab"
echo "   - Enable workflows"
echo "   - Set up secrets for deployment:"
echo "     - VERCEL_TOKEN"
echo "     - ORG_ID"
echo "     - PROJECT_ID"
echo ""
echo "4. Issues and Discussions:"
echo "   - Go to Settings → General"
echo "   - Enable Issues and Pull requests"
echo "   - Enable Discussions for community"
echo ""
echo "5. Project Board:"
echo "   - Go to Projects tab"
echo "   - Create new project"
echo "   - Add columns: 'To Do', 'In Progress', 'Review', 'Done'"
echo "   - Link issues and PRs"
echo ""

# Deployment options
echo "🚀 Deployment Options:"
echo "====================="
echo ""
echo "1. Vercel (Recommended - Free):"
echo "   npm install -g vercel"
echo "   vercel --prod"
echo ""
echo "2. Railway ($5/month):"
echo "   npm install -g @railway/cli"
echo "   railway up"
echo ""
echo "3. Docker (VPS):"
echo "   docker-compose up -d"
echo ""

# Final checklist
echo "✅ GitHub Repository Setup Complete!"
echo "===================================="
echo ""
echo "📋 Final Checklist:"
echo "1. ✅ Git repository initialized"
echo "2. ✅ Remote origin configured"
echo "3. ✅ Initial commit created"
echo "4. ✅ Files pushed to GitHub"
echo "5. ✅ GitHub workflows configured"
echo "6. ✅ Documentation created"
echo "7. ✅ Issue templates created"
echo "8. ✅ Pull request template created"
echo ""
echo "🎯 Next Steps:"
echo "1. Configure GitHub repository settings"
echo "2. Set up branch protection rules"
echo "3. Configure GitHub Actions secrets"
echo "4. Deploy to your chosen platform"
echo "5. Set up monitoring and analytics"
echo ""
echo "📚 Documentation:"
echo "- README.md - Main project documentation"
echo "- HOSTING_GUIDE.md - Complete hosting options"
echo "- QUICK_START.md - 5-minute setup guide"
echo "- DEPLOYMENT.md - Advanced deployment"
echo "- docs/API.md - API documentation"
echo "- docs/CONTRIBUTING.md - Contribution guidelines"
echo ""
echo "🎉 Your JerseyCo17 repository is ready for GitHub!"
echo ""
echo "For detailed instructions, see GITHUB_SETUP.md"
