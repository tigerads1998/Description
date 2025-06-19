# Deploy script - chạy tất cả trong một terminal
$SERVER_IP = "64.7.199.156"
$SERVER_USER = "root"
$PROJECT_PATH = "/var/www/jobportal"

Write-Host "🚀 Bắt đầu deploy toàn bộ dự án..." -ForegroundColor Green

# 1. Tạo thư mục project
Write-Host "📁 Tạo thư mục project..." -ForegroundColor Yellow
ssh $SERVER_USER@$SERVER_IP "mkdir -p $PROJECT_PATH"

# 2. Copy toàn bộ project
Write-Host "📤 Copy project files..." -ForegroundColor Yellow
scp -r . $SERVER_USER@$SERVER_IP:$PROJECT_PATH

# 3. Cài PM2
Write-Host "📦 Cài PM2..." -ForegroundColor Yellow
ssh $SERVER_USER@$SERVER_IP "npm install -g pm2"

# 4. Cài dependencies
Write-Host "🔧 Cài dependencies..." -ForegroundColor Yellow
ssh $SERVER_USER@$SERVER_IP "cd $PROJECT_PATH && npm install"

# 5. Build project
Write-Host "🏗️ Build project..." -ForegroundColor Yellow
ssh $SERVER_USER@$SERVER_IP "cd $PROJECT_PATH && npm run build"

# 6. Cấu hình nginx
Write-Host "🌐 Cấu hình nginx..." -ForegroundColor Yellow
$nginxConfig = @"
server {
    listen 80;
    server_name 64.7.199.156;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade `$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host `$host;
        proxy_set_header X-Real-IP `$remote_addr;
        proxy_set_header X-Forwarded-For `$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto `$scheme;
        proxy_cache_bypass `$http_upgrade;
    }
}
"@

ssh $SERVER_USER@$SERVER_IP "echo '$nginxConfig' > /etc/nginx/sites-available/jobportal"

# 7. Enable nginx site
Write-Host "🔄 Enable nginx site..." -ForegroundColor Yellow
ssh $SERVER_USER@$SERVER_IP "ln -sf /etc/nginx/sites-available/jobportal /etc/nginx/sites-enabled/ && nginx -t && systemctl restart nginx"

# 8. Khởi động ứng dụng với PM2
Write-Host "🚀 Khởi động ứng dụng..." -ForegroundColor Yellow
ssh $SERVER_USER@$SERVER_IP "cd $PROJECT_PATH && pm2 start npm --name 'jobportal' -- start"

# 9. Hiển thị trạng thái
Write-Host "📊 Trạng thái deployment:" -ForegroundColor Yellow
ssh $SERVER_USER@$SERVER_IP "pm2 status"
ssh $SERVER_USER@$SERVER_IP "systemctl status nginx --no-pager -l"

Write-Host "✅ Deploy hoàn tất!" -ForegroundColor Green
Write-Host "🌐 Ứng dụng có thể truy cập tại: http://64.7.199.156" -ForegroundColor Cyan 