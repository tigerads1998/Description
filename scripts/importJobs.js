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

async function importJobs(directoryPath) {
  try {
    // Read all files in the directory
    const files = fs.readdirSync(directoryPath);
    
    // Filter for JSON files
    const jsonFiles = files.filter(file => path.extname(file).toLowerCase() === '.json');
    
    console.log(`Found ${jsonFiles.length} JSON files`);
    
    // Process each JSON file
    for (const file of jsonFiles) {
      const filePath = path.join(directoryPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const jobData = JSON.parse(fileContent);
      
      try {
        // Add timestamp and format data
        const formattedJob = {
          ...jobData,
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'active'
        };
        
        // Add to Firestore
        const docRef = await addDoc(collection(db, 'jobs'), formattedJob);
        console.log(`Successfully imported job from ${file} with ID: ${docRef.id}`);
      } catch (error) {
        console.error(`Error importing ${file}:`, error);
      }
    }
    
    console.log('Import completed!');
  } catch (error) {
    console.error('Error reading directory:', error);
  }
}

// Get directory path from command line argument
const directoryPath = process.argv[2];

if (!directoryPath) {
  console.error('Please provide the directory path as an argument');
  process.exit(1);
}

importJobs(directoryPath); 