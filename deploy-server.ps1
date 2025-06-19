# Server configuration
$SERVER_IP = "64.7.199.156"
$SERVER_USER = "root"
$SERVER_PASSWORD = "Lovetime01aa"
$PROJECT_PATH = "/var/www/jobportal"

Write-Host "🚀 Starting deployment to server..." -ForegroundColor Green

# Function to run SSH command with password
function Invoke-SSHCommand {
    param($Command)
    $sshProcess = Start-Process -FilePath "ssh" -ArgumentList "-o", "StrictHostKeyChecking=no", "${SERVER_USER}@${SERVER_IP}", $Command -PassThru -NoNewWindow -RedirectStandardOutput "temp_output.txt" -RedirectStandardError "temp_error.txt"
    Start-Sleep -Seconds 2
    $sshProcess.Kill()
    if (Test-Path "temp_output.txt") {
        Get-Content "temp_output.txt"
        Remove-Item "temp_output.txt" -ErrorAction SilentlyContinue
    }
    if (Test-Path "temp_error.txt") {
        Get-Content "temp_error.txt"
        Remove-Item "temp_error.txt" -ErrorAction SilentlyContinue
    }
}

# Function to run SCP with password
function Invoke-SCPCommand {
    param($Source, $Destination)
    $scpProcess = Start-Process -FilePath "scp" -ArgumentList "-o", "StrictHostKeyChecking=no", "-r", $Source, "${SERVER_USER}@${SERVER_IP}:${Destination}" -PassThru -NoNewWindow
    Start-Sleep -Seconds 5
    $scpProcess.Kill()
}

# Create project directory on server
Write-Host "📁 Creating project directory..." -ForegroundColor Yellow
Invoke-SSHCommand "mkdir -p $PROJECT_PATH"

# Copy project files to server
Write-Host "📤 Copying project files..." -ForegroundColor Yellow
Invoke-SCPCommand ".", $PROJECT_PATH

# Install PM2 globally
Write-Host "📦 Installing PM2..." -ForegroundColor Yellow
Invoke-SSHCommand "npm install -g pm2"

# Install dependencies and build on server
Write-Host "🔧 Installing dependencies and building project..." -ForegroundColor Yellow
Invoke-SSHCommand "cd $PROJECT_PATH && npm install && npm run build"

# Start application with PM2
Write-Host "🚀 Starting application with PM2..." -ForegroundColor Yellow
Invoke-SSHCommand "cd $PROJECT_PATH && pm2 start npm --name 'jobportal' -- start"

# Configure nginx
Write-Host "🌐 Configuring nginx..." -ForegroundColor Yellow
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

Invoke-SSHCommand "echo '$nginxConfig' > /etc/nginx/sites-available/jobportal"

# Enable site and restart nginx
Write-Host "🔄 Enabling nginx site and restarting..." -ForegroundColor Yellow
Invoke-SSHCommand "ln -sf /etc/nginx/sites-available/jobportal /etc/nginx/sites-enabled/ && nginx -t && systemctl restart nginx"

# Show status
Write-Host "📊 Deployment status:" -ForegroundColor Yellow
Invoke-SSHCommand "pm2 status"
Invoke-SSHCommand "systemctl status nginx --no-pager -l"

Write-Host "✅ Deployment completed!" -ForegroundColor Green
Write-Host "🌐 Your application should be available at: http://64.7.199.156" -ForegroundColor Cyan 