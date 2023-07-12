const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  name: { type: String, required: [true, "Name is required"] },
  price: { type: Number, required: [true, "Price is required"] },
});
const Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;
