const express = require("express");
const userController = require("../controllers/user-controller");
const authenticateMiddleware = require("../middlewares/authenticate");
const adminAuth = require("../middlewares/adminAuth");

const router = express.Router();

router.get("/:userId", authenticateMiddleware, userController.getUser);

router.get(
  "/all-users",
  authenticateMiddleware,
  adminAuth,
  userController.getUser
);
router.delete(
  "/:id",
  authenticateMiddleware,
  adminAuth,
  userController.deleteUser
);

module.exports = router;
