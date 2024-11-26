const express = require("express");
const {
  createAccount,
  loginAccount,
  logout,
  updateAccount,
} = require("../controllers/userController");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

router.route("/createAccount").post(createAccount);
router.route("/loginAccount").post(loginAccount);
router.route("/logoutAccount").get(isAuthenticated, logout);
router.route("/updateAccount").patch(isAuthenticated, updateAccount);

module.exports = router;
