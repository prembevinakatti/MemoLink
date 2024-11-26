const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const {
  createMemory,
  deleteMemory,
} = require("../controllers/memoriesController");

const router = express.Router();

router.route("/createMemory").post(isAuthenticated, createMemory);
router.route("/deleteMemory/:memoryId").delete(isAuthenticated, deleteMemory);

module.exports = router;
