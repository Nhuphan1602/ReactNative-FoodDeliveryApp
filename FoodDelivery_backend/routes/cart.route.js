var express = require("express");
const {
  addToCart,
  removeFromCart,
  getCartItems,
  removeAllFromCart,
  paymentHandle,
} = require("../services/cart.service");

var router = express.Router();

router.get("/", async (req, res) => {
  let username = req?.username;
  let response = await getCartItems({ username });
  res.json(response);
});

router.delete("/clear", async (req, res) => {
  let username = req?.username;
  let response = await removeAllFromCart({ username });
  res.json(response);
});

router.post("/payment-sheet", async (req, res) => {
  const { amount, currency } = req.body;
  let response = await paymentHandle({ amount, currency });
  res.json(response);
});

router.post("/:foodId", async (req, res) => {
  let { foodId } = req?.params;
  let username = req?.username;
  let response = await addToCart({ foodId, username });
  res.json(response);
});

router.delete("/:foodId", async (req, res) => {
  let { foodId } = req?.params;
  let username = req?.username;
  let response = await removeFromCart({ foodId, username });
  res.json(response);
});

module.exports = router;
