const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const url =
  "mongodb+srv://Aso:nXerongt3a8FWoTG@cluster0.1lefncm.mongodb.net/?retryWrites=true&w=majority";
const dbName = "Products";
const collectionName = "Products";

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

// Create a new product
router.post("/", async (req, res) => {
  const newProduct = req.body;

  try {
    const collection = client.db(dbName).collection(collectionName);
    const result = await collection.insertOne(newProduct);

    if (result.insertedCount === 1) {
      res.status(201).json(result.ops[0]);
    } else {
      res.status(400).json({ message: "Product creation failed." });
    }
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Read (Get) all products
router.get("/", async (req, res) => {
  try {
    const collection = client.db(dbName).collection(collectionName);
    const products = await collection.find({}).toArray();

    if (products.length === 0) {
      res.status(404).json({ message: "No products found in the collection." });
    } else {
      res.json(products);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Read (Get) a specific product by ID
router.get("/:productId", async (req, res) => {
  const productId = parseInt(req.params.productId);

  try {
    const collection = client.db(dbName).collection(collectionName);
    const product = await collection.findOne({ id: productId });

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found." });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update a product by ID
router.put("/:productId", async (req, res) => {
  const productId = parseInt(req.params.productId);
  const updatedProduct = req.body;

  try {
    const collection = client.db(dbName).collection(collectionName);
    const result = await collection.updateOne(
      { id: productId },
      { $set: updatedProduct }
    );

    if (result.modifiedCount === 1) {
      res.json({ message: "Product updated successfully." });
    } else {
      res.status(404).json({ message: "Product not found." });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete a product by ID
router.delete("/:productId", async (req, res) => {
  const productId = parseInt(req.params.productId);

  try {
    const collection = client.db(dbName).collection(collectionName);
    const result = await collection.deleteOne({ id: productId });

    if (result.deletedCount === 1) {
      res.json({ message: "Product deleted successfully." });
    } else {
      res.status(404).json({ message: "Product not found." });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
