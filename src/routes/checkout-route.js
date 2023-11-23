const express = require("express");
const checkoutController = require("../controllers/checkout-controller");
const uploadMiddleware = require("../middlewares/upload");

const router = express.Router();

router.get("/payment", checkoutController.getPaymentMethod);
router.get("/bank", checkoutController.getBankDetails);
router.post("/add-order", checkoutController.createOrder);
router.post(
  "/add-payment",
  uploadMiddleware.single("slip_img_url"),
  checkoutController.addConfirmPayment
);

module.exports = router;
