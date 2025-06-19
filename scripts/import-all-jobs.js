const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

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

async function importAllJobs(directoryPath) {
  try {
    console.log('🚀 Bắt đầu import tất cả job postings...');
    
    // Read all files in the directory
    const files = fs.readdirSync(directoryPath);
    
    // Filter for JSON files
    const jsonFiles = files.filter(file => path.extname(file).toLowerCase() === '.json');
    
    console.log(`📁 Tìm thấy ${jsonFiles.length} file JSON`);
    
    let successCount = 0;
    let errorCount = 0;
    
    // Process each JSON file
    for (let i = 0; i < jsonFiles.length; i++) {
      const file = jsonFiles[i];
      const filePath = path.join(directoryPath, file);
      
      try {
        console.log(`\n📄 Đang xử lý file ${i + 1}/${jsonFiles.length}: ${file}`);
        
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const jobData = JSON.parse(fileContent);
        
        // Format the job data for Firestore
        const formattedJob = {
          title: jobData.title,
          company: jobData.company,
          location: jobData.location,
          type: jobData.type,
          level: jobData.level || '',
          salary: jobData.salary || '',
          posted: jobData.posted,
          description: jobData.description,
          requirements: jobData.requirements || [],
          verified: jobData.verified || false,
          createdAt: new Date().toISOString(),
          status: 'active'
        };
        
        // Add to Firestore
        const docRef = await addDoc(collection(db, 'jobs'), formattedJob);
        console.log(`✅ Thành công: ${jobData.title} tại ${jobData.company} (ID: ${docRef.id})`);
        successCount++;
        
        // Add a small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`❌ Lỗi khi xử lý ${file}:`, error.message);
        errorCount++;
      }
    }
    
    console.log('\n🎉 Import hoàn thành!');
    console.log(`✅ Thành công: ${successCount} jobs`);
    console.log(`❌ Lỗi: ${errorCount} jobs`);
    console.log(`📊 Tổng cộng: ${jsonFiles.length} files được xử lý`);
    
  } catch (error) {
    console.error('❌ Lỗi khi đọc thư mục:', error);
  }
}

// Run the import
const newFolderPath = path.join(__dirname, '..', 'New folder');
importAllJobs(newFolderPath).catch(console.error); 