const express = require("express");
const router = express.Router();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://Aso:nXerongt3a8FWoTG@cluster0.1lefncm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas", error);
  }
}

connectToMongoDB();

router.use(cors());

router.post("/register", async (req, res, next) => {
  const { name, email, password, phoneNumber,
    address, } = req.body;

  try {
    const collection = client.db("customerdb").collection("customers");
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    await collection.insertOne({ name, email, password, phoneNumber, address });

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error while registering", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
