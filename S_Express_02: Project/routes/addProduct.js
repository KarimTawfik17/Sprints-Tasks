const { addProduct } = require("../model/model.js");

function addProductHandler(req, res) {
  const product = req.body;
  addProduct(product);
  res.json(product);
}
module.exports = addProductHandler;
