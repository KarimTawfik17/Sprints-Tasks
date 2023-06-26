const { addCategory } = require("../model/model.js");

function addCategoryHandler(req, res) {
  const category = req.body;
  addCategory(category);
  res.json(category);
}
module.exports = addCategoryHandler;
