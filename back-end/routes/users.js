const express = require("express");
const router = express.Router();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://Aso:nXerongt3a8FWoTG@cluster0.1lefncm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
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

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

// Define a sample user database (in-memory for this example)
const users = [
  { id: 1, username: "admin", password: "adminpassword", role: "admin" },
  { id: 2, username: "user", password: "userpassword", role: "user" },
];

// Middleware for authentication
const authenticateUser = (req, res, next) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  req.user = user;
  next();
};

// Middleware for authorization (admin-only routes)
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access denied. Admin privilege required." });
  }
  next();
};

// Example route for making a user an admin
app.post(
  "/users/:id/make-admin",
  authenticateUser,
  authorizeAdmin,
  (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.role = "admin";
    res.status(200).json({ message: "User is now an admin" });
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port ${PORT}");
});
