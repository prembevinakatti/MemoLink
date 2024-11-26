const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const {
  createMemory,
  deleteMemory,
  likeMemory,
  getMemoriesByUser,
} = require("../controllers/memoriesController");

const router = express.Router();

router.route("/createMemory").post(isAuthenticated, createMemory);
router.route("/deleteMemory/:memoryId").delete(isAuthenticated, deleteMemory);
router.route("/likeMemory/:memoryId").put(isAuthenticated, likeMemory);
router.route("/getMemoriesByUser").get(isAuthenticated, getMemoriesByUser);

module.exports = router;
