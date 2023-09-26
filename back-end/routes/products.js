// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
});

module.exports = mongoose.model("Product", productSchema);

// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: String,
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  shipped: Boolean,
});

module.exports = mongoose.model("Order", orderSchema);
