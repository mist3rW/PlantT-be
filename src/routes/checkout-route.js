const express = require("express");
const checkoutController = require("../controllers/checkout-controller");

const router = express.Router();

router.get("/payment", checkoutController.getPaymentMethod);
router.post("/add-order", checkoutController.createOrder);

module.exports = router;
