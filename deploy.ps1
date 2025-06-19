Write-Host "🚀 Starting deployment process..." -ForegroundColor Green

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Build the project
Write-Host "🏗️ Building the project..." -ForegroundColor Yellow
npm run build

# Deploy to Firebase
Write-Host "🚀 Deploying to Firebase..." -ForegroundColor Yellow
firebase deploy

Write-Host "✅ Deployment completed!" -ForegroundColor Green 