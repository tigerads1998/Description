const axios = require('axios');

// CẬP NHẬT URL NÀY SAU KHI DEPLOY LẠI GOOGLE APPS SCRIPT
// Với quyền truy cập "Anyone"
const GOOGLE_SHEETS_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbx_cpMGXgCpv3_OiBvoSbjUB1m0gjg4NruWpSDSpPwMogTuycOW6MPLF9h6YPqL99Fr/exec';

async function testConnection() {
  try {
    console.log('🔍 Đang test kết nối với Google Apps Script...');
    console.log('📝 URL hiện tại:', GOOGLE_SHEETS_WEBAPP_URL);
    console.log('');
    
    // Test GET request
    console.log('1️⃣ Đang test GET request...');
    const getResponse = await axios.get(GOOGLE_SHEETS_WEBAPP_URL);
    console.log('✅ GET request thành công:', getResponse.data);
    console.log('');
    
    // Test POST request với dữ liệu mẫu
    const testData = {
      type: 'applications',
      name: 'Test User',
      email: 'test@example.com',
      linkedin: 'https://linkedin.com/in/test',
      jobTitle: 'Test Job',
      company: 'Test Company',
      date: new Date().toISOString(),
      fileName: 'test-cv.pdf',
      status: 'New'
    };
    
    console.log('2️⃣ Đang test POST request...');
    console.log('📤 Dữ liệu gửi:', JSON.stringify(testData, null, 2));
    console.log('');
    
    const postResponse = await axios.post(GOOGLE_SHEETS_WEBAPP_URL, testData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ POST request thành công:', postResponse.data);
    console.log('🎉 Kết nối Google Apps Script hoạt động tốt!');
    console.log('');
    console.log('📋 Bây giờ bạn có thể:');
    console.log('   - Chạy: node scripts/export-to-sheets.js');
    console.log('   - Chạy: node scripts/auto-sync-to-sheets.js');
    
  } catch (error) {
    console.error('❌ Lỗi kết nối:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    console.log('');
    console.log('🔧 HƯỚNG DẪN KHẮC PHỤC:');
    console.log('1. Truy cập https://script.google.com/');
    console.log('2. Mở project Google Apps Script của bạn');
    console.log('3. Click "Deploy" > "New deployment"');
    console.log('4. Chọn "Web app"');
    console.log('5. Cấu hình:');
    console.log('   - Execute as: "Me"');
    console.log('   - Who has access: "Anyone"');
    console.log('6. Deploy và copy URL mới');
    console.log('7. Cập nhật URL trong file này');
  }
}

testConnection(); 