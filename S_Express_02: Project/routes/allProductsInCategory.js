const { getAllProducts, getCategory } = require("../model/model.js");

function allProductsInCategoryHandler(req, res) {
  const categoryId = req.params.id;
  const category = getCategory(categoryId);
  if (!category) {
    res.status(400).send("invalid id");
  } else {
    const products = getAllProducts().filter(
      (product) => product.categoryId == categoryId
    );
    res.json(products);
  }
}
module.exports = allProductsInCategoryHandler;
