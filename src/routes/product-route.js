const express = require("express");
const productController = require("../controllers/product-controller");
const uploadMiddleware = require("../middlewares/upload");
const adminAuth = require("../middlewares/adminAuth");
const authenticateMiddleware = require("../middlewares/authenticate");

const router = express.Router();

router.get("/", productController.getProduct);
router.get("/:productId", productController.getSingleProduct);

router.post(
  "/",
  authenticateMiddleware,
  adminAuth,
  uploadMiddleware.single("image_url"),
  productController.addProduct
);
router.delete(
  "/:id",
  authenticateMiddleware,
  adminAuth,
  productController.deleteProduct
);

module.exports = router;
