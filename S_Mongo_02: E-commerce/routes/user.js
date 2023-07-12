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

router.post("/:id/product/:productId", async (req, res) => {
  const userId = req.params.id;
  const productId = req.params.productId;
  User.findByIdAndUpdate(userId, { $addToSet: { cart: productId } })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.send("Error adding product to cart");
    });
});

//   try {
//     user = await User.findById(userId);
//   } catch (error) {
//     console.log(error);
//     return res.send("Error finding user");
//   }
//   try {
//     user.update({ $addToSet: { cart: productId } });
//     res.send(result);
//   } catch (error) {
//     console.log(error);
//     res.send("Error adding product to cart");
//   }
// });
module.exports = router;
