const {
  getProducts,
  categorize,
  addProduct,
  getRate,
  transformProductsPrice,
} = require("./index.js");
require("dotenv").config();
const http = require("http");
const PORT_NUM = process.env.PORT_NUM || 3000;
const server = http.createServer((req, res) => {
  console.log("recieved a new request :", req.method, req.url);
  const reqPath = req.url.split("/");
  if (req.method == "GET" && reqPath[1] == "products") {
    console.log("First Case");
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    getProducts()
      .then(categorize)
      .then((products) => {
        res.write(JSON.stringify(products));
        res.end();
      });

    // show product with price here
  } else if (req.method == "POST" && reqPath[1] == "products") {
    let body = "";
    let product = {};
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      product = JSON.parse(body);
      addProduct(product).then((data) => {
        res.write(JSON.stringify(data));
        res.end();
      });
    });
  } else {
    res.statusCode = 501;
    res.write("Only two routes available now : \n");
    res.write("GET /products?CUR=<currency_code> !\n");
    res.write("POST /products !\n");
    res.end();
  }
});
server.listen(PORT_NUM, () => {
  console.log("server is running on : ", `http://localhost:${PORT_NUM}`);
});
