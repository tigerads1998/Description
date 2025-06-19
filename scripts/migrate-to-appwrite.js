const { Client, Databases, Storage } = require('node-appwrite');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCRxeReb5xOZsO6kefljXW9KKcLOI9ctEs",
  authDomain: "fontend-e0a61.firebaseapp.com",
  projectId: "fontend-e0a61",
  storageBucket: "fontend-e0a61.appspot.com",
  messagingSenderId: "10347067083",
  appId: "1:10347067083:web:cf8723f71dee7c55220d4e",
  measurementId: "G-BC0JEB1ZT8"
};

// Appwrite config
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('YOUR_PROJECT_ID') // Thay bằng Project ID của bạn
    .setKey('YOUR_API_KEY'); // Thay bằng API Key của bạn

const databases = new Databases(client);
const storage = new Storage(client);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const DATABASE_ID = 'job_portal';
const JOBS_COLLECTION_ID = 'jobs';
const APPLICATIONS_COLLECTION_ID = 'applications';

async function migrateJobs() {
  try {
    console.log('Starting migration...');
    
    // Get jobs from Firebase
    const jobsSnapshot = await getDocs(collection(db, 'jobs'));
    const jobs = jobsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log(`Found ${jobs.length} jobs to migrate`);

    // Create database if not exists
    try {
      await databases.create(DATABASE_ID, 'Job Portal Database');
      console.log('Database created');
    } catch (error) {
      console.log('Database already exists');
    }

    // Create jobs collection if not exists
    try {
      await databases.createCollection(DATABASE_ID, JOBS_COLLECTION_ID, 'Jobs');
      console.log('Jobs collection created');
    } catch (error) {
      console.log('Jobs collection already exists');
    }

    // Migrate each job
    for (const job of jobs) {
      try {
        await databases.createDocument(
          DATABASE_ID,
          JOBS_COLLECTION_ID,
          job.id,
          {
            title: job.title,
            company: job.company,
            location: job.location,
            type: job.type,
            salary: job.salary,
            description: job.description,
            requirements: job.requirements || [],
            posted: job.posted,
            verified: job.verified || false,
            level: job.level
          }
        );
        console.log(`Migrated job: ${job.title}`);
      } catch (error) {
        console.error(`Failed to migrate job ${job.title}:`, error);
      }
    }

    console.log('Migration completed!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

migrateJobs(); 