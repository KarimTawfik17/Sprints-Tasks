const { deleteProduct } = require("../model/model.js");

function deleteProductHandler(req, res) {
  const id = req.params.id;
  const result = deleteProduct(id);
  if (result) {
    res.status(201).send(`Product ${id} deleted succsessfully`);
  } else {
    res.status(400).send("Invalid Id");
  }
}
module.exports = deleteProductHandler;
