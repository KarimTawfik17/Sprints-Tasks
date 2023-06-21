const { getProduct } = require("../model/model.js");

function getProductHandler(req, res) {
  const id = req.params.id;
  const product = getProduct(id);
  if (!product) {
    res.status(400).send("invalid id");
  } else {
    res.json(product);
  }
}
module.exports = getProductHandler;
