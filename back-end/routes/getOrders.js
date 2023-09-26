const express = require('express');
const router = express.Router();
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

router.use(cors());

const url = 'mongodb+srv://Aso:nXerongt3a8FWoTG@cluster0.1lefncm.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'ordersDB';
const collectionName = 'orders';

router.get('/', async (req, res) => {
    try {
      const client = new MongoClient(url);
  
      await client.connect();
  
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
  
      // Load orders without updating their status
      const orders = await collection.find({}).toArray();
  
      client.close();
  
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error loading orders:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Route to update order status by order ID
router.put('/:orderId/updateStatus', async (req, res) => {
    const orderId = req.params.orderId;
    const newStatus = req.body.newStatus;
  
    try {
      const client = new MongoClient(url);
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
  
      // Update the order's status by order ID
      const updatedOrder = await collection.findOneAndUpdate(
        { _id: new ObjectId(orderId) },
        { $set: { status: newStatus } },
        { returnOriginal: false }
      );
      
  
      client.close();
  
      if (!updatedOrder.value) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(200).json(updatedOrder.value);
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  module.exports = router;