const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const {
  createMemory,
  deleteMemory,
  likeMemory,
  getMemoriesByUser,
  sendMemory,
  getMemories,
  getAllMemories,
  getUsersByTags,
  savePost,
  getSavedMemory,
  isSaved,
} = require("../controllers/memoriesController");

const router = express.Router();

router.route("/createMemory").post(isAuthenticated, createMemory);
router.route("/deleteMemory/:memoryId").delete(isAuthenticated, deleteMemory);
router.route("/likeMemory/:memoryId").put(isAuthenticated, likeMemory);
router.route("/getMemoriesByUser").get(isAuthenticated, getMemoriesByUser);
router.route("/sendMemory").post(isAuthenticated, sendMemory);
router.route("/getMemories/:senderId").get(isAuthenticated, getMemories);
router.route("/getAllMemories").get(isAuthenticated, getAllMemories);
router.route("/getUserByTag").post(isAuthenticated, getUsersByTags);
router.route("/savePost/:memoryId").post(isAuthenticated, savePost);
router.route("/getSavedMemories").get(isAuthenticated, getSavedMemory);
router.route("/isSaved/:memoryId").get(isAuthenticated, isSaved);

module.exports = router;
