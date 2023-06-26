const { addProduct } = require("../model/model.js");

function addProductHandler(req, res) {
  const product = req.body;
  const createdProduct = addProduct(product);
  res.json(createdProduct);
}
module.exports = addProductHandler;
