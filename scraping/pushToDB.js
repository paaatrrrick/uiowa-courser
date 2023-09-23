const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs').promises;

// Connection URL
const url = 'mongodb+srv://user:2Sz4X5YoPNTsy75r@cluster0.jb62ody.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

// Read the JSON file
async function run() {
  try {
    // Read the JSON file
    const data = await fs.readFile('test.json', 'utf8');
    const jsonData = JSON.parse(data);

    // Connect to the server
    await client.connect();
    console.log("Connected to MongoDB!");

    // Insert data into a specific database and collection
    const db = client.db('data');
    const collection = db.collection('classes');
    const result = await collection.insertMany(jsonData);

    console.log('Inserted documents:', result.insertedCount);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Ensure the client will close
    await client.close();
  }
}
run()