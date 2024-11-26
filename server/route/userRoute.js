const express = require("express");
const { createAccount, loginAccount } = require("../controllers/userController");

const router = express.Router();

router.route("/createAccount").post(createAccount);
router.route("/loginAccount").post(loginAccount);

module.exports = router;
