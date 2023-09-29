const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId  } = require('mongodb');

const url = 'mongodb+srv://Aso:nXerongt3a8FWoTG@cluster0.1lefncm.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'Products';
const collectionName = 'Products';

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

router.get('/', async (req, res) => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

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
    client.close();
  }
});
router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;

  if (!name || !price || !description) {
    return res.status(400).json({ message: 'All product fields are required.' });
  }

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const existingProduct = await collection.findOne({ _id: new ObjectId(id) });

    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, price, description } }
    );

    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    client.close();
  }
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const existingProduct = await collection.findOne({ _id: new ObjectId(id) });

    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    await collection.deleteOne({ _id: new ObjectId(id) });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    client.close();
  }
});
router.post('/add', async (req, res) => {
  const { name, description, price, category, sizes, image } = req.body;

  if (!name || !description || !price || !category || !sizes || !Array.isArray(sizes)) {
    return res.status(400).json({ message: 'All product fields are required, and sizes must be an array.' });
  }

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    console.log(image)
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const newProduct = {
      category,
      name,
      description,
      price,
      sizes,
      image
    };

    const result = await collection.insertOne(newProduct);

    res.json({
      message: 'Product inserted successfully',
      productId: result.insertedId,
    });
  } catch (error) {
    console.error('Error inserting product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    client.close();
  }
});


module.exports = router;

