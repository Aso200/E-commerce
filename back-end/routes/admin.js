const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt"); // You'll need to install the bcrypt library

const uri =
  "mongodb+srv://Aso:nXerongt3a8FWoTG@cluster0.1lefncm.mongodb.net/?retryWrites=true&w=majority";

const user = {
  username: "admin",
  password: "password", // You should hash this password
};

const addUser = async () => {
  const client = new MongoClient(uri, { useNewUrlParser: true });

  try {
    await client.connect();

    const db = client.db();

    // Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Store user data in the "users" collection
    const result = await db.collection("users").insertOne({
      username: user.username,
      password: hashedPassword,
    });

    console.log(`User has been added with ID: ${result.insertedId}`);
  } catch (error) {
    console.error("Error adding user:", error);
  } finally {
    client.close();
  }
};

addUser();
