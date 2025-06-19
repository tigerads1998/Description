import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client()
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject('685477f400059af048a1');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Database và Collection IDs
export const DATABASE_ID = '685478e9003b690aeddf';
export const JOBS_COLLECTION_ID = 'jobs';
export const APPLICATIONS_COLLECTION_ID = 'applications';
export const USERS_COLLECTION_ID = 'users';

// Storage Bucket ID
export const RESUMES_BUCKET_ID = 'resumes';

export default client; 