const { loginUser } = require("../model/model.js");
require("dotenv").config();
const jwt = require("jsonwebtoken");

function loginHandler(req, res) {
  const { email, password } = req.body;
  const logged = loginUser(email, password);
  if (logged) {
    var token = jwt.sign({ email, password }, process.env.JWT_SECRET);

    res.json({ email, password, token });
  } else {
    res.status(401).send("Invalid Credentials");
  }
}
module.exports = loginHandler;
