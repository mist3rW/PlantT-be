const express = require("express");
const productController = require("../controllers/product-controller");
const uploadMiddleware = require("../middlewares/upload");

const router = express.Router();

router.post("/", productController.addProduct);
router.get("/", productController.getProduct);
router.post(
  "/upload-product-image",
  uploadMiddleware.fields([
    {
      name: "image_url",
      maxCount: 1,
    },
  ]),
  productController.uploadProductImage
);

module.exports = router;
