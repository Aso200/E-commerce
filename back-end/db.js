const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://Aso:nXerongt3a8FWoTG@cluster0.1lefncm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas", error);
  }
}

module.exports = {
  connectToMongoDB,
  getClient: () => client,
};
