const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: 50,
  },
  listing_Date: {
    type: Date,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  stores_available: {
    type: [String],
  },
});

module.exports = mongoose.model("Product", ProductsSchema);
