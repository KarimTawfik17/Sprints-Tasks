const express = require("express");
const app = express();
console.log("hello");
app.listen(8080, () =>
  console.log("Server is running on : http://localhost:8080")
);
