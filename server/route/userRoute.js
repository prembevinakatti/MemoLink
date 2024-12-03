const express = require("express");
const {
  createAccount,
  loginAccount,
  logout,
  updateAccount,
  checkUsername,
  getAllUser,
  toggleFollow,
  isFollowing,
} = require("../controllers/userController");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

router.route("/createAccount").post(createAccount);
router.route("/checkUsername").post(checkUsername);
router.route("/loginAccount").post(loginAccount);
router.route("/logoutAccount").get(isAuthenticated, logout);
router.route("/updateAccount").patch(isAuthenticated, updateAccount);
router.route("/getAllUsers").get(isAuthenticated, getAllUser);
router.route("/toggleFollow/:id").post(isAuthenticated, toggleFollow);
router.route("/isFollowing/:id").get(isAuthenticated, isFollowing);

module.exports = router;
