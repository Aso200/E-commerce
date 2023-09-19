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

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const collection = client.db("customerdb").collection("customers");
    const user = await collection.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }


    if (user.password === password) {
      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;