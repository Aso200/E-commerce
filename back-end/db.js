const authenticateUser = async (req, res, next) => {
  const { username, password } = req.body;

  const client = new MongoClient(uri, { useNewUrlParser: true });

  try {
    await client.connect();
    const db = client.db();
    const user = await db.collection("users").findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    client.close();
  }
};
