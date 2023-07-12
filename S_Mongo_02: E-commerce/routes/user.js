const express = require("express");
const router = express.Router();
// const User = require("../models/user");
router.get("/", (req, res) => {
  res.send("Get all user");
});

router.post("/", (req, res) => {
  console.log("body : ", req.body);
  res.send("Register");
});
module.exports = router;
