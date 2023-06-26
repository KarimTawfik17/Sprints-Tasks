const { addCategory } = require("../model/model.js");

function addCategoryHandler(req, res) {
  const category = req.body;
  const createdCategory = addCategory(category);
  res.json(createdCategory);
}
module.exports = addCategoryHandler;
