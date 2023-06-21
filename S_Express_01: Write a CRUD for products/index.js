const express = require("express");
const allProductsHandler = require("./routes/allProducts");
const addProductHandler = require("./routes/addProduct");
const getProductHandler = require("./routes/product");
const updateProductHandler = require("./routes/updateProduct");
const deleteProductHandler = require("./routes/deleteProduct");
const {
  newProductValidator,
  updateProductValidator,
} = require("./helpers/validator");

const app = express();
app.use(express.json());

app.listen(8080, () =>
  console.log("Server is running on : http://localhost:8080")
);

app.get("/products", allProductsHandler); // get all products

app.get("/product/:id", getProductHandler); // get one product

app.post("/products", newProductValidator, addProductHandler); // add product

app.put("/product/:id", updateProductValidator, updateProductHandler); // update product

app.delete("/product/:id", deleteProductHandler); // delete product
