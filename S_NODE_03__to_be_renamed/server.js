const {
  getProducts,
  categorize,
  addProduct,
  transformProductsPrice,
} = require("./index.js");
function handleGetwithCurrency(res, currency) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  getProducts()
    .then(categorize)
    .then((data) => transformProductsPrice(data, currency))
    .then((products) => {
      res.write(JSON.stringify(products));
      res.end();
    });
}
function handlePost(res, product) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  product = JSON.parse(body);
  addProduct(product).then((data) => {
    res.write(JSON.stringify(data));
    res.end();
  });
}
function handleOther(res) {
  res.statusCode = 501;
  res.write("Only two routes available now : \n");
  res.write("GET /products?CUR=<currency_code> !\n");
  res.write("POST /products !\n");
  res.end();
}
require("dotenv").config();
const http = require("http");
const PORT_NUM = process.env.PORT_NUM || 3000;
const server = http.createServer((req, res) => {
  console.log("recieved a new request :", req.method, req.url);
  const reqPath = req.url.split("/");
  if (req.method == "GET") {
    const query = reqPath[1].split("=");
    const currency = query[1];
    if (query[0] != "products?CUR" || !currency) {
      handleOther(res);
    } else {
      handleGetwithCurrency(res, currency);
    }
  } else if (req.method == "POST" && reqPath[1] == "products") {
    let body = "";
    let product = {};
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      handlePost(res, product);
    });
  } else {
    handleOther(res);
  }
});
server.listen(PORT_NUM, () => {
  console.log("server is running on : ", `http://localhost:${PORT_NUM}`);
});
