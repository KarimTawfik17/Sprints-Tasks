const { deleteCategory } = require("../model/model.js");

function deleteCategoryHandler(req, res) {
  const id = req.params.id;
  const result = deleteCategory(id);
  if (result) {
    res.status(201).send(`Product ${id} deleted succsessfully`);
  } else {
    res.status(400).send("Invalid Id");
  }
}
module.exports = deleteCategoryHandler;
