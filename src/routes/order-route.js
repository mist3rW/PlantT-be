const express = require("express");
const orderController = require("../controllers/order-controller");
const adminAuth = require("../middlewares/adminAuth");
const authenticateMiddleware = require("../middlewares/authenticate");

const router = express.Router();

router.get(
  "/all-orders",
  authenticateMiddleware,
  adminAuth,
  orderController.getAllOrders
);
router.get(
  "/:orderId",
  authenticateMiddleware,
  adminAuth,
  orderController.getSingleOrder
);
router.put(
  "/update-order-status",
  authenticateMiddleware,
  adminAuth,
  orderController.updateOrderStatus
);

module.exports = router;
