const {
  getAllUser,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controller/userController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const express = require("express");
const router = express.Router();

router.get("/", authenticateUser, authorizePermissions('admin'), getAllUser);

router.get("/showCurrentUser", showCurrentUser);
router.patch("/updateUser", updateUser);
router.patch("/updateUserPassword", updateUserPassword);

router.get("/:id", getSingleUser);

module.exports = router;
