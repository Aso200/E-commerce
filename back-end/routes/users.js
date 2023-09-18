var express = require("express");
var router = express.Router();

/* GET users listing. */
router.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;

  console.log('ssss');
  try {
    const collection = client.db("customerdb").collection("customers");
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    await collection.insertOne({ name, email, password });

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error while registering", error);
    res.status(500).json({ message: "Registration failed" });
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
});

module.exports = router;
