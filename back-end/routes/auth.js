const express = require('express');
const router = express.Router();
const { ObjectId } = require("mongodb");
const db = require('../db'); // Import the centralized db.js module

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const client = db.getClient(); // Get the centralized MongoDB client

    const collection = client.db("customerdb").collection("customers");
    const user = await collection.findOne({ email });

    if (!user) { 
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.password === password) {
      let userInfo = [user.email, user.name, user.phoneNumber, user.address, user._id]
      return res.status(200).json({ userInfo });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    // Do not close the MongoDB connection here, as it's managed centrally in db.js
  }
});

module.exports = router;
