const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Khởi tạo Firebase Admin
const serviceAccount = require('./service-account-key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function backupFirestore() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(__dirname, 'backups', timestamp);

  // Tạo thư mục backup
  if (!fs.existsSync(backupDir)){
    fs.mkdirSync(backupDir, { recursive: true });
  }

  // Backup từng collection
  const collections = ['jobs', 'applications', 'users']; // Thêm các collection cần backup
  
  for (const collectionName of collections) {
    console.log(`Backing up collection: ${collectionName}`);
    const snapshot = await db.collection(collectionName).get();
    const data = [];
    
    snapshot.forEach(doc => {
      data.push({
        id: doc.id,
        ...doc.data()
      });
    });

    // Lưu vào file JSON
    const filePath = path.join(backupDir, `${collectionName}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Backed up ${data.length} documents from ${collectionName}`);
  }

  console.log('Backup completed!');
  console.log('Backup location:', backupDir);
}

backupFirestore().catch(console.error); 