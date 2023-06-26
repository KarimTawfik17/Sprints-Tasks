const { updateCategory } = require("../model/model.js");

function updateCategoryHandler(req, res) {
  const category = req.body;
  const id = req.params.id;
  const updatedCategory = updateCategory(id, category);
  if (!updatedCategory) {
    res.status(400).send("invalid id");
  } else {
    res.json(updatedCategory);
  }
}
module.exports = updateCategoryHandler;
