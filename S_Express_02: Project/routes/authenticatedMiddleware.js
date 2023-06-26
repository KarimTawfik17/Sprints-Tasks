const jwt = require("jsonwebtoken");
const { loginUser } = require("../model/model");
require("dotenv").config();
function authenticated(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    var data = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    var data = null;
  }
  if (!data) return res.status(401).send("UnAuthorized !");
  next();
}

module.exports = authenticated;
