const normalizer = require("../helpers/normalizer");
const { products, categories } = require("./db");
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
  return product;
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

function getAllCategories() {
  return categories;
}
function getCategory(id) {
  const category = categories.find((category) => category.id == id);
  if (!category) return false;
  return category;
}

function addCategory(category) {
  normalizer(category);
  categories.push(category);
  return category;
}
function deleteCategory(id) {
  const category = categories.find((category) => category.id == id);
  if (!category) return false;
  categories.splice(categories.indexOf(category), 1);
  return true;
}
function updateCategory(id, modifiedData) {
  const category = categories.find((category) => category.id == id);
  if (!category) return false;
  normalizer(category);
  Object.keys(modifiedData).forEach(
    (key) => (category[key] = modifiedData[key])
  );
  return category;
}
module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
  getAllCategories,
  getCategory,
  addCategory,
  deleteCategory,
  updateCategory,
};

// console.log(addCategory({ name: "karim", image: "http" }));
// console.log(getCategory(2));
