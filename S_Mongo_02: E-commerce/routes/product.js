const express = require("express");
const router = express.Router();
const Product = require("../models/product");
router.get("/", async (req, res) => {
  // GET /product
  try {
    const products = await Product.find({}, { name: 1, price: 1, _id: 0 });
    res.send(products);
  } catch (error) {
    console.log(error);
    res.send("Error getting products");
  }
});
router.get("/:id", async (req, res) => {
  // GET /product/:id
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.send("Product not found");
    }
    res.send(product);
  } catch (error) {
    console.error(error);
    res.send("Error getting product by id");
  }

  // res.send("Get product by id");
});

router.post("/", (req, res) => {
  // POST /product
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.send("Error creating product");
    });
});
router.delete("/:id", (req, res) => {
  // DELETE /product/:id
  const id = req.params.id;
  Product.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.send("Product not found");
      }
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.send("Error deleting product");
    });
});
module.exports = router;
