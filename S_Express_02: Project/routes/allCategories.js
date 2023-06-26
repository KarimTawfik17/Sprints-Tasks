const { getAllCategories } = require("../model/model.js");

function allCategoriesHandler(req, res) {
  const categories = getAllCategories();
  res.json(categories);
}
module.exports = allCategoriesHandler;
