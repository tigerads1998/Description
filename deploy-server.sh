#!/bin/bash

# Server configuration
SERVER_IP="64.7.199.156"
SERVER_USER="root"
SERVER_PASSWORD="Lovetime01aa"
PROJECT_PATH="/var/www/jobportal"

echo "🚀 Starting deployment to server..."

# Create project directory on server
echo "📁 Creating project directory..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "mkdir -p $PROJECT_PATH"

# Copy project files to server
echo "📤 Copying project files..."
sshpass -p "$SERVER_PASSWORD" scp -r -o StrictHostKeyChecking=no . $SERVER_USER@$SERVER_IP:$PROJECT_PATH

# Install dependencies and build on server
echo "🔧 Installing dependencies and building project..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "cd $PROJECT_PATH && npm install && npm run build"

# Install PM2 globally if not installed
echo "📦 Installing PM2..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "npm install -g pm2"

# Start application with PM2
echo "🚀 Starting application with PM2..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "cd $PROJECT_PATH && pm2 start npm --name 'jobportal' -- start"

# Configure nginx
echo "🌐 Configuring nginx..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "cat > /etc/nginx/sites-available/jobportal << 'EOF'
server {
    listen 80;
    server_name 64.7.199.156;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF"

# Enable site and restart nginx
echo "🔄 Enabling nginx site and restarting..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "ln -sf /etc/nginx/sites-available/jobportal /etc/nginx/sites-enabled/ && nginx -t && systemctl restart nginx"

# Show status
echo "📊 Deployment status:"
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "pm2 status && systemctl status nginx --no-pager -l"

echo "✅ Deployment completed!"
echo "🌐 Your application should be available at: http://64.7.199.156" 