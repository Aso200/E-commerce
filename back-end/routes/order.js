const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const cors = require('cors');
router.use(cors());

const ordersFilePath = path.join(__dirname, '../data/order.json');

function generateOrderId(existingOrders) {
  const lastOrder = existingOrders[existingOrders.length - 1];
  if (lastOrder && lastOrder.id) {
    return lastOrder.id + 1;
  }
  return 1;
}

router.post('/', (req, res) => {
    console.log("helvete")
  try {
    const orderData = req.body;
    let existingOrders = [];
    if (fs.existsSync(ordersFilePath)) {
      existingOrders = JSON.parse(fs.readFileSync(ordersFilePath, 'utf-8'));
    }

    const orderId = generateOrderId(existingOrders);
    orderData.forEach((item) => {
      const itemId = generateOrderId(existingOrders);
      item.orderId = itemId;
    });

    existingOrders.push(...orderData);

    fs.writeFileSync(ordersFilePath, JSON.stringify(existingOrders, null, 2));
    res.status(201).json({ message: 'Order received successfully', orderId });
  } catch (error) {
    console.error('Error handling order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
