require("dotenv").config();
const http = require("http");
const PORT_NUM = process.env.PORT_NUM || 3000;
const server = http.createServer((req, res) => {
  console.log(req.method, req.url);
  res.statusCode = 501;
  res.write("Not Implemented Yet !");
  res.end();
});
server.listen(PORT_NUM, () => {
  console.log("server is running on : ", `http://localhost:${PORT_NUM}`);
});
