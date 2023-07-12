const express = require("express");
const router = express.Router();
// const Product = require("../models/product");
router.get("/", (req, res) => {
  // GET /product
  res.send("Get all product");
});
router.get("/:id", (req, res) => {
  // GET /product/:id
  res.send("Get product by id");
});
router.post("/", (req, res) => {
  // POST /product
  res.send("Create new product");
});
router.delete("/:id", (req, res) => {
  // DELETE /product/:id
  res.send("Delete product by id");
});
module.exports = router;
