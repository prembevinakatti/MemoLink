const express = require("express");
const { createAccount } = require("../controllers/userController");

const router = express.Router();

router.route("/createAccount").post(createAccount);

module.exports = router;
