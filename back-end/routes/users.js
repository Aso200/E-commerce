const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { connectToMongoDB, getClient } = require("../db"); // Import the centralized db.js module

// Ensure that you call connectToMongoDB() to establish the MongoDB connection when the module is loaded
connectToMongoDB();

router.post("/register", async (req, res, next) => {
  const { name, email, password, phoneNumber, address } = req.body;

  try {
    const client = getClient(); // Get the centralized MongoDB client

    const collection = client.db("customerdb").collection("customers");
    const userId = new ObjectId();

    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    await collection.insertOne({
      _id: userId,
      name,
      email,
      password,
      phoneNumber,
      address,
    });

    res.status(201).json({ message: "Registration successful", userId });
  } catch (error) {
    console.error("Error while registering", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
