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

router.get("/showMe",authenticateUser, showCurrentUser);
router.patch("/updateUser",authenticateUser, updateUser);
router.patch("/updateUserPassword",authenticateUser, updateUserPassword);

router.get("/:id",authenticateUser, getSingleUser);

module.exports = router;
