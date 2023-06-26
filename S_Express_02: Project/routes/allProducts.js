const { getAllProducts } = require("../model/model.js");

function allProductsHandler(req, res) {
  const products = getAllProducts();
  res.json(products);
}
module.exports = allProductsHandler;
