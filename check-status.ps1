# Check server status
$SERVER_IP = "64.7.199.156"
$SERVER_USER = "root"

Write-Host "🔍 Checking server status..." -ForegroundColor Green

# Check if we can connect to server
Write-Host "📡 Testing SSH connection..." -ForegroundColor Yellow
try {
    $result = ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "echo 'Connection successful'"
    Write-Host "✅ SSH connection working" -ForegroundColor Green
} catch {
    Write-Host "❌ SSH connection failed" -ForegroundColor Red
    exit 1
}

# Check nginx status
Write-Host "🌐 Checking nginx status..." -ForegroundColor Yellow
ssh $SERVER_USER@$SERVER_IP "systemctl is-active nginx"

# Check if Node.js is installed
Write-Host "📦 Checking Node.js..." -ForegroundColor Yellow
ssh $SERVER_USER@$SERVER_IP "node --version"
ssh $SERVER_USER@$SERVER_IP "npm --version"

# Check if PM2 is installed
Write-Host "🚀 Checking PM2..." -ForegroundColor Yellow
ssh $SERVER_USER@$SERVER_IP "pm2 --version"

# Check if project directory exists
Write-Host "📁 Checking project directory..." -ForegroundColor Yellow
ssh $SERVER_USER@$SERVER_IP "ls -la /var/www/jobportal"

# Check running processes
Write-Host "⚙️ Checking running processes..." -ForegroundColor Yellow
ssh $SERVER_USER@$SERVER_IP "ps aux | grep node"

Write-Host "✅ Status check completed!" -ForegroundColor Green 