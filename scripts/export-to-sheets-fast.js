const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const axios = require('axios');

const firebaseConfig = {
  apiKey: "AIzaSyCRxeReb5xOZsO6kefljXW9KKcLOI9ctEs",
  authDomain: "fontend-e0a61.firebaseapp.com",
  projectId: "fontend-e0a61",
  storageBucket: "fontend-e0a61.appspot.com",
  messagingSenderId: "10347067083",
  appId: "1:10347067083:web:cf8723f71dee7c55220d4e",
  measurementId: "G-BC0JEB1ZT8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Google Sheets WebApp URL
const GOOGLE_SHEETS_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbx_cpMGXgCpv3_OiBvoSbjUB1m0gjg4NruWpSDSpPwMogTuycOW6MPLF9h6YPqL99Fr/exec';

// Tối ưu: Batch processing và giảm delay
const BATCH_SIZE = 10; // Xử lý 10 records cùng lúc
const DELAY_BETWEEN_BATCHES = 100; // Giảm delay xuống 100ms

async function sendBatchToSheets(batch, type) {
  const promises = batch.map(item => {
    const dataToSend = type === 'jobs' ? {
      type: 'jobs',
      title: item.title || '',
      company: item.company || '',
      location: item.location || '',
      jobType: item.type || '',
      salary: item.salary || '',
      posted: item.posted || item.createdAt || new Date().toISOString(),
      description: item.description || '',
      verified: item.verified || false,
      status: 'Active'
    } : {
      type: 'applications',
      name: item.name || '',
      email: item.email || '',
      linkedin: item.linkedin || '',
      jobTitle: item.jobTitle || '',
      company: item.company || '',
      date: item.date || item.createdAt || new Date().toISOString(),
      fileName: item.fileName || item.cvUrl || '',
      status: 'New'
    };

    return axios.post(GOOGLE_SHEETS_WEBAPP_URL, dataToSend, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000 // Timeout 5 giây
    }).catch(error => {
      console.error(`❌ Lỗi gửi ${type}:`, error.message);
      return { data: { success: false, error: error.message } };
    });
  });

  return Promise.all(promises);
}

async function exportJobsToSheetsFast() {
  try {
    console.log('📊 Bắt đầu export jobs (tối ưu tốc độ)...');
    
    const jobsSnapshot = await getDocs(collection(db, 'jobs'));
    const jobs = jobsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`📁 Tìm thấy ${jobs.length} jobs`);
    
    let successCount = 0;
    let errorCount = 0;
    
    // Xử lý theo batch
    for (let i = 0; i < jobs.length; i += BATCH_SIZE) {
      const batch = jobs.slice(i, i + BATCH_SIZE);
      console.log(`📄 Đang xử lý batch ${Math.floor(i/BATCH_SIZE) + 1}/${Math.ceil(jobs.length/BATCH_SIZE)} (${i+1}-${Math.min(i+BATCH_SIZE, jobs.length)})`);
      
      const results = await sendBatchToSheets(batch, 'jobs');
      
      results.forEach((result, index) => {
        if (result.data && result.data.success) {
          successCount++;
        } else {
          errorCount++;
        }
      });
      
      // Delay ngắn giữa các batch
      if (i + BATCH_SIZE < jobs.length) {
        await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES));
      }
    }
    
    console.log('\n🎉 Export jobs hoàn thành!');
    console.log(`✅ Thành công: ${successCount} jobs`);
    console.log(`❌ Lỗi: ${errorCount} jobs`);
    
  } catch (error) {
    console.error('❌ Lỗi khi export jobs:', error);
  }
}

async function exportApplicationsToSheetsFast() {
  try {
    console.log('📊 Bắt đầu export applications (tối ưu tốc độ)...');
    
    const applicationsSnapshot = await getDocs(collection(db, 'applications'));
    const applications = applicationsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`📁 Tìm thấy ${applications.length} applications`);
    
    let successCount = 0;
    let errorCount = 0;
    
    // Xử lý theo batch
    for (let i = 0; i < applications.length; i += BATCH_SIZE) {
      const batch = applications.slice(i, i + BATCH_SIZE);
      console.log(`📄 Đang xử lý batch ${Math.floor(i/BATCH_SIZE) + 1}/${Math.ceil(applications.length/BATCH_SIZE)} (${i+1}-${Math.min(i+BATCH_SIZE, applications.length)})`);
      
      const results = await sendBatchToSheets(batch, 'applications');
      
      results.forEach((result, index) => {
        if (result.data && result.data.success) {
          successCount++;
        } else {
          errorCount++;
        }
      });
      
      // Delay ngắn giữa các batch
      if (i + BATCH_SIZE < applications.length) {
        await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES));
      }
    }
    
    console.log('\n🎉 Export applications hoàn thành!');
    console.log(`✅ Thành công: ${successCount} applications`);
    console.log(`❌ Lỗi: ${errorCount} applications`);
    
  } catch (error) {
    console.error('❌ Lỗi khi export applications:', error);
  }
}

async function exportAllToSheetsFast() {
  console.log('🚀 Bắt đầu export tất cả dữ liệu (TỐI ƯU TỐC ĐỘ)...\n');
  
  const startTime = Date.now();
  
  await exportJobsToSheetsFast();
  console.log('\n' + '='.repeat(50) + '\n');
  await exportApplicationsToSheetsFast();
  
  const endTime = Date.now();
  const duration = (endTime - startTime) / 1000;
  
  console.log(`\n🎉 Export hoàn thành trong ${duration.toFixed(2)} giây!`);
  console.log('📊 Kiểm tra Google Sheets của bạn.');
}

// Chạy export
exportAllToSheetsFast().catch(console.error); 