require("dotenv").config();
const http = require("http");
const PORT_NUM = process.env.PORT_NUM || 3000;
const server = http.createServer((req, res) => {
  console.log("recieved a new request :", req.method, req.url);
  res.statusCode = 501;
  res.write("Only two routes available now : \n");
  res.write("GET /products?CUR=<currency_code> !\n");
  res.write("POST /products !\n");
  res.end();
});
server.listen(PORT_NUM, () => {
  console.log("server is running on : ", `http://localhost:${PORT_NUM}`);
});
