const express = require("express");
const router = express.Router();
const User = require("../models/user");
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, { name: 1, email: 1, _id: 0 });
    res.send(users);
  } catch (error) {
    console.log(error);
    res.send("Error getting users");
  }
});

router.post("/", (req, res) => {
  const user = new User({
    name: req.body.name,
  });
  user
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.send("Error creating user");
    });
});

module.exports = router;
