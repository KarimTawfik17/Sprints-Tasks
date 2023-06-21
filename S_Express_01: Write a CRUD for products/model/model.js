const normalizer = require("../helpers/normalizer");
const products = require("./db");
function getAllProducts() {
  return products;
}
function getProduct(id) {
  const product = products.find((product) => product.id == id);
  if (!product) return false;
  return product;
}

function addProduct(product) {
  normalizer(product);
  products.push(product);
}
function deleteProduct(id) {
  const product = products.find((product) => product.id == id);
  if (!product) return false;
  products.splice(products.indexOf(product), 1);
  return true;
}
function updateProduct(id, modifiedData) {
  const product = products.find((product) => product.id == id);
  if (!product) return false;
  normalizer(product);
  Object.keys(modifiedData).forEach(
    (key) => (product[key] = modifiedData[key])
  );
  return product;
}
module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
};
