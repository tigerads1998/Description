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

async function exportApplicationsToSheets() {
  try {
    console.log('📊 Bắt đầu export applications lên Google Sheets...');
    
    // Lấy tất cả applications từ Firestore
    const applicationsSnapshot = await getDocs(collection(db, 'applications'));
    const applications = applicationsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`📁 Tìm thấy ${applications.length} applications`);
    
    let successCount = 0;
    let errorCount = 0;
    
    // Export từng application
    for (let i = 0; i < applications.length; i++) {
      const app = applications[i];
      
      try {
        console.log(`📄 Đang export application ${i + 1}/${applications.length}: ${app.name} - ${app.jobTitle}`);
        
        const dataToSend = {
          type: 'applications',
          name: app.name || '',
          email: app.email || '',
          linkedin: app.linkedin || '',
          jobTitle: app.jobTitle || '',
          company: app.company || '',
          date: app.date || app.createdAt || new Date().toISOString(),
          fileName: app.fileName || app.cvUrl || '',
          status: 'New'
        };
        
        // Gửi dữ liệu lên Google Sheets
        const response = await axios.post(GOOGLE_SHEETS_WEBAPP_URL, dataToSend, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data.success) {
          console.log(`✅ Thành công: ${app.name}`);
          successCount++;
        } else {
          console.error(`❌ Lỗi: ${response.data.error}`);
          errorCount++;
        }
        
        // Delay để tránh rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.error(`❌ Lỗi khi export ${app.name}:`, error.message);
        errorCount++;
      }
    }
    
    console.log('\n🎉 Export applications hoàn thành!');
    console.log(`✅ Thành công: ${successCount} applications`);
    console.log(`❌ Lỗi: ${errorCount} applications`);
    
  } catch (error) {
    console.error('❌ Lỗi khi export applications:', error);
  }
}

async function exportJobsToSheets() {
  try {
    console.log('📊 Bắt đầu export jobs lên Google Sheets...');
    
    // Lấy tất cả jobs từ Firestore
    const jobsSnapshot = await getDocs(collection(db, 'jobs'));
    const jobs = jobsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`📁 Tìm thấy ${jobs.length} jobs`);
    
    let successCount = 0;
    let errorCount = 0;
    
    // Export từng job
    for (let i = 0; i < jobs.length; i++) {
      const job = jobs[i];
      
      try {
        console.log(`📄 Đang export job ${i + 1}/${jobs.length}: ${job.title} tại ${job.company}`);
        
        const dataToSend = {
          type: 'jobs',
          title: job.title || '',
          company: job.company || '',
          location: job.location || '',
          jobType: job.type || '',
          salary: job.salary || '',
          posted: job.posted || job.createdAt || new Date().toISOString(),
          description: job.description || '',
          verified: job.verified || false,
          status: 'Active'
        };
        
        // Gửi dữ liệu lên Google Sheets
        const response = await axios.post(GOOGLE_SHEETS_WEBAPP_URL, dataToSend, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data.success) {
          console.log(`✅ Thành công: ${job.title}`);
          successCount++;
        } else {
          console.error(`❌ Lỗi: ${response.data.error}`);
          errorCount++;
        }
        
        // Delay để tránh rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.error(`❌ Lỗi khi export ${job.title}:`, error.message);
        errorCount++;
      }
    }
    
    console.log('\n🎉 Export jobs hoàn thành!');
    console.log(`✅ Thành công: ${successCount} jobs`);
    console.log(`❌ Lỗi: ${errorCount} jobs`);
    
  } catch (error) {
    console.error('❌ Lỗi khi export jobs:', error);
  }
}

// Function chính để export tất cả
async function exportAllToSheets() {
  console.log('🚀 Bắt đầu export tất cả dữ liệu lên Google Sheets...\n');
  
  if (GOOGLE_SHEETS_WEBAPP_URL === 'YOUR_GOOGLE_SHEETS_WEBAPP_URL_HERE') {
    console.log('❌ Vui lòng cập nhật GOOGLE_SHEETS_WEBAPP_URL trong file này!');
    console.log('📝 Hãy làm theo hướng dẫn trong file google-sheets-setup.md');
    return;
  }
  
  await exportJobsToSheets();
  console.log('\n' + '='.repeat(50) + '\n');
  await exportApplicationsToSheets();
  
  console.log('\n🎉 Export hoàn thành! Kiểm tra Google Sheets của bạn.');
}

// Chạy export
exportAllToSheets().catch(console.error); 