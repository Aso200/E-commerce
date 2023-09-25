const express = require('express');
const router = express.Router();
const cors = require('cors');
const { MongoClient, ObjectID } = require('mongodb');

const url = process.env.MONGO_URL || '';
const dbName = 'ordersDB';
const collectionName = 'orders';

let dbClient;

MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {
    console.log('Connected to MongoDB');
    dbClient = client;
}).catch(error => {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
});

router.get('/orders/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        const db = dbClient.db(dbName);
        const collection = db.collection(collectionName);
        const order = await collection.findOne({ _id: new ObjectID(orderId) });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        console.error('Error fetching order data', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const orderData = req.body;
        const db = dbClient.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(orderData);
        res.status(201).json({ message: 'Order received successfully', orderId: result.insertedIds });
    } catch (error) {
        console.error('Error saving order', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
