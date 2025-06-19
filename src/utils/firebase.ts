import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Job, Application } from '../types';

const firebaseConfig = {
  apiKey: "AIzaSyCRxeReb5xOZsO6kefljXW9KKcLOI9ctEs",
  authDomain: "fontend-e0a61.firebaseapp.com",
  projectId: "fontend-e0a61",
  storageBucket: "fontend-e0a61.appspot.com",
  messagingSenderId: "10347067083",
  appId: "1:10347067083:web:cf8723f71dee7c55220d4e",
  measurementId: "G-BC0JEB1ZT8"
};

// Lazy initialize Firebase
let app: any = null;
let dbInstance: any = null;
let storageInstance: any = null;

export const initializeFirebase = () => {
  if (!app) {
    app = initializeApp(firebaseConfig);
    dbInstance = getFirestore(app);
    storageInstance = getStorage(app);
  }
  return { app, db: dbInstance, storage: storageInstance };
};

// Lazy load collection data
export const getJobsCollection = async () => {
  const { db } = initializeFirebase();
  const jobsCollection = collection(db, 'jobs');
  const jobSnapshot = await getDocs(jobsCollection);
  return jobSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Lazy load single document
export const getJobDocument = async (jobId: string) => {
  const { db } = initializeFirebase();
  const jobDoc = doc(db, 'jobs', jobId);
  const jobSnapshot = await getDoc(jobDoc);
  if (jobSnapshot.exists()) {
    return {
      id: jobSnapshot.id,
      ...jobSnapshot.data()
    };
  }
  return null;
};

// Test Firebase connection
export async function testConnection() {
  try {
    const { db } = initializeFirebase();
    const testCollection = collection(db, 'test');
    const q = query(testCollection, where('test', '==', true));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty;
  } catch (error) {
    console.error('Firebase connection test failed:', error);
    return false;
  }
}

// Get all jobs
export async function getAllJobs(): Promise<Job[]> {
  try {
    const { db } = initializeFirebase();
    const jobsCollection = collection(db, 'jobs');
    const q = query(jobsCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Job));
  } catch (error) {
    console.error('Error getting jobs:', error);
    return [];
  }
}

// Get job by ID
export async function getJobById(id: string): Promise<Job | null> {
  try {
    const { db } = initializeFirebase();
    const jobDoc = doc(db, 'jobs', id);
    const jobSnapshot = await getDoc(jobDoc);
    if (jobSnapshot.exists()) {
      return {
        id: jobSnapshot.id,
        ...jobSnapshot.data()
      } as Job;
    }
    return null;
  } catch (error) {
    console.error('Error getting job:', error);
    return null;
  }
}

// Add new job
export async function addJob(job: Omit<Job, 'id'>): Promise<string | null> {
  try {
    const { db } = initializeFirebase();
    const jobsCollection = collection(db, 'jobs');
    const docRef = await addDoc(jobsCollection, {
      ...job,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding job:', error);
    return null;
  }
}

// Update job
export async function updateJob(id: string, job: Partial<Job>): Promise<boolean> {
  try {
    const { db } = initializeFirebase();
    const jobDoc = doc(db, 'jobs', id);
    await updateDoc(jobDoc, {
      ...job,
      updatedAt: new Date()
    });
    return true;
  } catch (error) {
    console.error('Error updating job:', error);
    return false;
  }
}

// Delete job
export async function deleteJob(id: string): Promise<boolean> {
  try {
    const { db } = initializeFirebase();
    const jobDoc = doc(db, 'jobs', id);
    await deleteDoc(jobDoc);
    return true;
  } catch (error) {
    console.error('Error deleting job:', error);
    return false;
  }
}

// Upload file to storage
export async function uploadFile(file: File, path: string): Promise<string | null> {
  try {
    const { storage } = initializeFirebase();
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
}

// Submit job application
export async function submitApplication(application: Omit<Application, 'id'>): Promise<string | null> {
  try {
    const { db } = initializeFirebase();
    const applicationsCollection = collection(db, 'applications');
    const docRef = await addDoc(applicationsCollection, {
      ...application,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error submitting application:', error);
    return null;
  }
} 