const express = require("express");
const categoryController = require("../controllers/category-controller");

const router = express.Router();

router.get("/", categoryController.getCategories);
router.post("/", categoryController.addCategories);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
