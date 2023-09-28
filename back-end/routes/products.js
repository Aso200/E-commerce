const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

// Connection URL and database name
const url = "mongodb+srv://Aso:nXerongt3a8FWoTG@cluster0.1lefncm.mongodb.net/?retryWrites=true&w=majority";
const dbName = "Products";
const collectionName = "Products";

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to the database once and reuse the connection
client.connect().then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
});

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

router.get("/:docId/product/:productId", async (req, res) => {
  const docId = req.params.docId;
  const productId = parseInt(req.params.productId); // Assuming ids are integers

  try {
      const collection = client.db(dbName).collection(collectionName);
      
      // Fetch the document by its _id
      const document = await collection.findOne({ _id: new ObjectId(docId) });

      if (!document || !document.categories) {
          return res.status(404).json({ message: "Document or categories not found." });
      }

      // Iterate over categories to find the product with the specified id
      for (let category of document.categories) {
          if (category.products) {
              const product = category.products.find(p => p.id === productId);
              if (product) {
                  return res.json(product);
              }
          }
      }

      // If no product is found with the given id
      res.status(404).json({ message: "Product not found." });

  } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});



// This part was missing, but I assume you were trying to make a POST route to create a new product.
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

module.exports = router;
