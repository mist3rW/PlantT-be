const express = require("express");
const cartController = require("../controllers/cart-controller");

const router = express.Router();

router.post("/add", cartController.addToCart);

router.put("/update/:cartItemId/:newQty", cartController.updateQty);
router.delete("/remove/:cartItemId", cartController.deleteFromCart);

router.get("/:userId", cartController.getCartItems);
router.put("/:cartId/finish", cartController.finishCart);

module.exports = router;
