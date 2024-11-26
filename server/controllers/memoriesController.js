const memoriesModel = require("../models/memoriesModel");
const { findById } = require("../models/userModel");

module.exports.createMemory = async (req, res) => {
  try {
    const { user, profilePhoto, location, content } = req.body;

    if (!user || !profilePhoto || !location || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const memory = await memoriesModel.create({
      user: user,
      profilePhoto: profilePhoto,
      location: location,
      content: content,
    });

    return res
      .status(201)
      .json({ message: "Memory Created Successfully ", success: true, memory });
  } catch (error) {
    console.log("Error creating memory in server : ", error.message);
  }
};

module.exports.deleteMemory = async (req, res) => {
  try {
    const memory = req.params.memoryId;

    if (!memory) {
      return res.status(400).json({ message: "Memory ID is required" });
    }

    const deletedMemory = await memoriesModel.findByIdAndDelete(memory);

    if (!deletedMemory) {
      return res.status(404).json({ message: "Memory not found" });
    }

    return res
      .status(200)
      .json({ message: "Memory deleted successfully ", success: true });
  } catch (error) {
    console.log("Error deleting memory in server : ", error.message);
  }
};

module.exports.likeMemory = async (req, res) => {
  try {
    const user = req.user;
    const memoryId = req.params.memoryId;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    if (!memoryId) {
      return res.status(400).json({ message: "Memory ID is required" });
    }

    const memory = await memoriesModel.findById(memoryId);

    if (!memory) {
      return res.status(404).json({ message: "Memory not found" });
    }

    if (memory?.likes?.includes(user)) {
      const updatedMemory = await memoriesModel.findByIdAndUpdate(
        memoryId,
        { $pull: { likes: user } },
        { new: true }
      );

      return res.status(200).json({
        message: "Memory unliked successfully",
        success: true,
        memory: updatedMemory,
      });
    } else {
      const updatedMemory = await memoriesModel.findByIdAndUpdate(
        memoryId,
        { $push: { likes: user } },
        { new: true }
      );

      return res.status(200).json({
        message: "Memory liked successfully ",
        success: true,
        memory: updatedMemory,
      });
    }
  } catch (error) {
    console.log("Error loking memory in server : ", error.message);
  }
};