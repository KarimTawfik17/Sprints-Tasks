const { updateProduct } = require("../model/model.js");

function updateProductHandler(req, res) {
  const product = req.body;
  const id = req.params.id;
  const updatedProduct = updateProduct(id, product);
  if (!updatedProduct) {
    res.status(400).send("invalid id");
  } else {
    res.json(updatedProduct);
  }
}
module.exports = updateProductHandler;
