const express = require('express');
const router = express.Router();
const { ObjectId } = require("mongodb");
const db = require('../db');

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const client = db.getClient();

    const collection = client.db("customerdb").collection("customers");
    const user = await collection.findOne({ email });

    if (!user) { 
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.password === password) {
      let userInfo = {
        email: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber,
        address: user.address,
        _id: user._id,
        isAdmin: user.isAdmin,
      };
      return res.status(200).json(userInfo);
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
  }
});

module.exports = router;
