require("dotenv").config();
const express = require("express");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/user", userRouter);
app.use("/products", productRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
