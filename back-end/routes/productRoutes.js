// routes/productRoutes.js
const express = require("express");
const Product = require("../models/Product");
const db = require("../db");

const client = db.getClient(); // Get the centralized MongoDB client

const collection = client.db("customerdb").collection("customers");

const router = express.Router();

// Skapa en ny produkt
router.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Hämta alla produkter
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Uppdatera en produkt
router.put("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ta bort en produkt
router.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndRemove(req.params.id);
    res.json({ message: "Produkten har tagits bort" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
