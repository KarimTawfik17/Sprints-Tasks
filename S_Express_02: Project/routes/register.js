const { createUser } = require("../model/model.js");

function registerHandler(req, res) {
  const user = req.body;
  createUser(user);
  res.json({ success: true });
}
module.exports = registerHandler;
