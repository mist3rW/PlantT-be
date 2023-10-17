const express = require("express");
const cartController = require("../controllers/cart-controller");

const router = express.Router();

router.post("/", cartController.createCart);
router.post("/:cartId/add-product", cartController.addToCart);

router.put("/:cartId/update-qty/:cartItemId", cartController.updateQty);
router.delete(
  "/:cartId/remove-product/:cartItemId",
  cartController.deleteFromCart
);

router.get("/:cartId/items", cartController.getCartItems);
router.put("/:cartId/finish", cartController.finishCart);

module.exports = router;
