const express = require("express");
const productController = require("../controllers/product-controller");
const uploadMiddleware = require("../middlewares/upload");

const router = express.Router();

router.post(
  "/",
  uploadMiddleware.single("image_url"),
  productController.addProduct
);
router.get("/", productController.getProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
