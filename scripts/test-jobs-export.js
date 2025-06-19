const axios = require('axios');

const GOOGLE_SHEETS_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbx_cpMGXgCpv3_OiBvoSbjUB1m0gjg4NruWpSDSpPwMogTuycOW6MPLF9h6YPqL99Fr/exec';

async function testJobsExport() {
  try {
    console.log('🧪 Test export jobs...');
    
    // Test data mẫu
    const testJobData = {
      type: 'jobs',
      title: 'Test Job Title',
      company: 'Test Company',
      location: 'Test Location',
      jobType: 'Full-time', // Sử dụng jobType thay vì type
      salary: '$50,000 - $70,000',
      posted: new Date().toISOString(),
      description: 'This is a test job description',
      verified: true,
      status: 'Active'
    };
    
    console.log('📤 Dữ liệu gửi:', JSON.stringify(testJobData, null, 2));
    console.log('');
    
    const response = await axios.post(GOOGLE_SHEETS_WEBAPP_URL, testJobData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Response:', response.data);
    
    if (response.data.success) {
      console.log('🎉 Test jobs export thành công!');
      console.log('📋 Bây giờ bạn có thể chạy: node scripts/export-to-sheets.js');
    } else {
      console.log('❌ Test jobs export thất bại:', response.data.error);
    }
    
  } catch (error) {
    console.error('❌ Lỗi test jobs export:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

testJobsExport(); 