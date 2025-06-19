const sdk = require('node-appwrite');

// Khởi tạo client
const client = new sdk.Client()
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject('685477f400059af048a1')
    .setKey('your-api-key'); // Bạn cần tạo API key trong Appwrite Console

const databases = new sdk.Databases(client);
const DATABASE_ID = '685478e9003b690aeddf';

async function createCollection(collectionId, name) {
    try {
        const collection = await databases.createCollection(
            DATABASE_ID,
            collectionId,
            name,
            ['role:all'],
            ['role:all']
        );
        console.log(`Created collection: ${name}`);
        return collection;
    } catch (error) {
        if (error.code === 409) {
            console.log(`Collection ${name} already exists`);
            return null;
        }
        throw error;
    }
}

async function createAttribute(collectionId, key, type, required, array = false) {
    try {
        const attribute = array 
            ? await databases.createStringAttribute(
                DATABASE_ID,
                collectionId,
                key,
                required,
                [],
                true
            )
            : await databases.createStringAttribute(
                DATABASE_ID,
                collectionId,
                key,
                required
            );
        console.log(`Created attribute: ${key} in ${collectionId}`);
        return attribute;
    } catch (error) {
        if (error.code === 409) {
            console.log(`Attribute ${key} already exists in ${collectionId}`);
            return null;
        }
        throw error;
    }
}

async function setup() {
    try {
        // Create Jobs Collection
        await createCollection('jobs', 'Jobs');
        await createAttribute('jobs', 'title', 'string', true);
        await createAttribute('jobs', 'company', 'string', true);
        await createAttribute('jobs', 'location', 'string', true);
        await createAttribute('jobs', 'type', 'string', true);
        await createAttribute('jobs', 'salary', 'string', false);
        await createAttribute('jobs', 'description', 'string', false);
        await createAttribute('jobs', 'requirements', 'string', false, true);
        await createAttribute('jobs', 'posted', 'string', false);
        await createAttribute('jobs', 'verified', 'boolean', false);
        await createAttribute('jobs', 'level', 'string', false);

        // Create Applications Collection
        await createCollection('applications', 'Applications');
        await createAttribute('applications', 'jobId', 'string', true);
        await createAttribute('applications', 'jobTitle', 'string', true);
        await createAttribute('applications', 'company', 'string', true);
        await createAttribute('applications', 'name', 'string', true);
        await createAttribute('applications', 'email', 'string', true);
        await createAttribute('applications', 'linkedin', 'string', false);
        await createAttribute('applications', 'resumeUrl', 'string', false);
        await createAttribute('applications', 'date', 'string', true);

        // Create Users Collection
        await createCollection('users', 'Users');
        await createAttribute('users', 'name', 'string', true);
        await createAttribute('users', 'email', 'string', true);
        await createAttribute('users', 'role', 'string', true);

        console.log('Setup completed successfully!');
    } catch (error) {
        console.error('Setup failed:', error);
    }
}

setup(); 