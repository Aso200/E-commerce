const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

// Connection URL and database name
const url = 'mongodb+srv://Aso:nXerongt3a8FWoTG@cluster0.1lefncm.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'Products';
const collectionName = 'Products';

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

router.get('/', async (req, res) => {
  try {
    // Connect to MongoDB Atlas
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Fetch all products from the "Products" collection
    const products = await collection.find({}).toArray();

    if (products.length === 0) {
      res.status(404).json({ message: 'No products found in the collection.' });
    } else {
      res.json(products);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    // Close the MongoDB connection when done
    client.close();
  }
});

module.exports = router;
