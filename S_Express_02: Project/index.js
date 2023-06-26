const express = require("express");
//products
const allProductsHandler = require("./routes/allProducts");
const addProductHandler = require("./routes/addProduct");
const getProductHandler = require("./routes/product");
const updateProductHandler = require("./routes/updateProduct");
const deleteProductHandler = require("./routes/deleteProduct");
//categories
const allCategoriesHandler = require("./routes/allCategories");
const addCategoryHandler = require("./routes/addCategory");
const getCategoryHandler = require("./routes/category");
const updateCategoryHandler = require("./routes/updateCategory");
const deleteCategoryHandler = require("./routes/deleteCategory");
const {
  newProductValidator,
  updateProductValidator,
  newCategoryValidator,
  updateCategoryValidator,
  categoryExistValidator,
  userSignupValidator,
  userLoginValidator,
} = require("./helpers/validator");
const allProductsInCategoryHandler = require("./routes/allProductsInCategory");
const registerHandler = require("./routes/register");
const loginHandler = require("./routes/login");

const app = express();
app.use(express.json());

app.listen(8080, () =>
  console.log("Server is running on : http://localhost:8080")
);

//products routes
app.get("/products", allProductsHandler); // get all products

app.get("/product/:id", getProductHandler); // get one product

app.post(
  "/products",
  newProductValidator,
  categoryExistValidator,
  addProductHandler
); // add product

app.put(
  "/product/:id",
  updateProductValidator,
  categoryExistValidator,
  updateProductHandler
); // update product

app.delete("/product/:id", deleteProductHandler); // delete product

//categories routes
app.get("/categories", allCategoriesHandler); // get all categories

app.get("/category/:id", getCategoryHandler); // get one category

app.post("/categories", newCategoryValidator, addCategoryHandler); // add category

app.put("/category/:id", updateCategoryValidator, updateCategoryHandler); // update category

app.delete("/category/:id", deleteCategoryHandler); // delete category

app.get("/categories/:id/products", allProductsInCategoryHandler); // get all products in the category

// users

app.post("/register", userSignupValidator, registerHandler);
app.post("/login", userLoginValidator, loginHandler);
