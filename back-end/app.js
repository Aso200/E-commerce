const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Anslut till MongoDB-databasen

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Skapa routes för CRUD-åtgärder för produkter och ordrar
// Exempel: require('./routes/productRoutes')(app);
// Exempel: require('./routes/orderRoutes')(app);

// Starta servern
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
