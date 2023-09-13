const express = require('express');
const router = express.Router();
const fs = require('fs');
const cors = require('cors');

const dataFilePath = './data/products.json';

router.use(cors());

router.get('/products', function (req, res, next) {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    
    const products = JSON.parse(data);
    console.log("hej")
    res.json(products);
  });
});

module.exports = router;
