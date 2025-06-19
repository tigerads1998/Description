const { initializeApp } = require('firebase/app');
const { getFirestore, collection, onSnapshot, query, orderBy } = require('firebase/firestore');
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

// Lưu trữ timestamp của lần sync cuối
let lastSyncTime = new Date();

async function sendToGoogleSheets(data) {
  try {
    const response = await axios.post(GOOGLE_SHEETS_WEBAPP_URL, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.data.success) {
      console.log(`✅ Đã sync lên Google Sheets: ${data.type}`);
      return true;
    } else {
      console.error(`❌ Lỗi sync: ${response.data.error}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Lỗi kết nối Google Sheets:`, error.message);
    return false;
  }
}

// Theo dõi applications mới
function watchApplications() {
  console.log('👀 Bắt đầu theo dõi applications mới...');
  
  const applicationsQuery = query(
    collection(db, 'applications'),
    orderBy('createdAt', 'desc')
  );
  
  onSnapshot(applicationsQuery, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const app = change.doc.data();
        const createdAt = app.createdAt ? new Date(app.createdAt) : new Date();
        
        // Chỉ sync những application mới hơn lần sync cuối
        if (createdAt > lastSyncTime) {
          console.log(`🆕 Phát hiện application mới: ${app.name} - ${app.jobTitle}`);
          
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
          
          sendToGoogleSheets(dataToSend);
        }
      }
    });
  });
}

// Theo dõi jobs mới
function watchJobs() {
  console.log('👀 Bắt đầu theo dõi jobs mới...');
  
  const jobsQuery = query(
    collection(db, 'jobs'),
    orderBy('createdAt', 'desc')
  );
  
  onSnapshot(jobsQuery, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const job = change.doc.data();
        const createdAt = job.createdAt ? new Date(job.createdAt) : new Date();
        
        // Chỉ sync những job mới hơn lần sync cuối
        if (createdAt > lastSyncTime) {
          console.log(`🆕 Phát hiện job mới: ${job.title} tại ${job.company}`);
          
          const dataToSend = {
            type: 'jobs',
            title: job.title || '',
            company: job.company || '',
            location: job.location || '',
            type: job.type || '',
            salary: job.salary || '',
            posted: job.posted || job.createdAt || new Date().toISOString(),
            description: job.description || '',
            verified: job.verified || false,
            status: 'Active'
          };
          
          sendToGoogleSheets(dataToSend);
        }
      }
    });
  });
}

// Function chính
function startAutoSync() {
  console.log('🚀 Bắt đầu Auto Sync với Google Sheets...');
  
  if (GOOGLE_SHEETS_WEBAPP_URL === 'YOUR_GOOGLE_SHEETS_WEBAPP_URL_HERE') {
    console.log('❌ Vui lòng cập nhật GOOGLE_SHEETS_WEBAPP_URL!');
    console.log('📝 Hãy làm theo hướng dẫn trong file google-sheets-setup.md');
    return;
  }
  
  // Bắt đầu theo dõi
  watchApplications();
  watchJobs();
  
  console.log('✅ Auto Sync đang chạy...');
  console.log('📊 Mọi dữ liệu mới sẽ tự động được sync lên Google Sheets');
  console.log('⏹️  Nhấn Ctrl+C để dừng');
  
  // Cập nhật timestamp mỗi phút
  setInterval(() => {
    lastSyncTime = new Date();
  }, 60000);
}

// Chạy auto sync
startAutoSync(); 