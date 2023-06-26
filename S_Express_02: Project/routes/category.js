const { getCategory } = require("../model/model.js");

function getCategoryHandler(req, res) {
  const id = req.params.id;
  const category = getCategory(id);
  if (!category) {
    res.status(400).send("invalid id");
  } else {
    res.json(category);
  }
}
module.exports = getCategoryHandler;
