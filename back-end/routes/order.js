const express = require('express');
const router = express.Router();
const cors = require('cors');
const { MongoClient } = require('mongodb');

router.use(cors());

const url = 'mongodb+srv://Aso:nXerongt3a8FWoTG@cluster0.1lefncm.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'ordersDB';
const collectionName = 'orders';

router.post('/', async (req, res) => {
  try {
    const orderData = req.body;

    const client = new MongoClient(url);

    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.insertOne(orderData);
    
    client.close();

    res.status(201).json({ message: 'Order received successfully', orderId: result.insertedIds });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get("/orders/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const client = new MongoClient(url);

    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const orders = await collection.find({ userID: userId }).toArray();

    client.close();
    console.log(orders);

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
