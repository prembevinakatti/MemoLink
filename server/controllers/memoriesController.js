const memoriesModel = require("../models/memoriesModel");
const memoryExchangeModel = require("../models/memoryExchangeModel");
const userModel = require("../models/userModel");

module.exports.createMemory = async (req, res) => {
  try {
    const { user, location, content, tags } = req.body;
    const logedinUser = req.user;

    if (!logedinUser) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    if (!user || !location || !content || !tags) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const memory = await memoriesModel.create({
      user: user,
      location: location,
      tags: tags,
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

module.exports.getMemoriesByUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const memories = await memoriesModel
      .find({ user: user })
      .sort({ createdAt: -1 }).populate("user")

    if (!memories) {
      return res
        .status(404)
        .json({ message: "No memories found for this user" });
    }

    return res.status(200).json({
      message: "User memories retrieved successfully ",
      success: true,
      memories,
    });
  } catch (error) {
    console.log("Error Getting User memories : ", error.message);
  }
};

module.exports.sendMemory = async (req, res) => {
  try {
    const user = req.user;
    const { recipientId, memoryId } = req.body;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    if (!recipientId || !memoryId) {
      return res
        .status(400)
        .json({ message: "Recipient ID and Memory ID are required" });
    }

    let conversation = await memoryExchangeModel
      .findOne({
        $or: [
          { sender: user, receiver: recipientId },
          { sender: recipientId, receiver: user },
        ],
      })
      .populate("memories");

    if (!conversation) {
      conversation = await memoryExchangeModel.create({
        sender: user,
        receiver: recipientId,
      });
    }

    conversation.memories.push(memoryId);
    await conversation.save();

    return res.status(200).json({
      message: "Memory sent successfully ",
      success: true,
      conversation,
    });
  } catch (error) {
    console.log("Error Sending Memory : ", error.message);
  }
};

module.exports.getMemories = async (req, res) => {
  try {
    const user = req.user;
    const senderId = req.params.senderId;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    if (!senderId) {
      return res.status(400).json({ message: "Sender ID is required" });
    }

    const conversation = await memoryExchangeModel
      .findOne({
        $or: [
          { sender: senderId, receiver: user },
          { sender: user, receiver: senderId },
        ],
      })
      .populate("memories");

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    return res.status(200).json({
      message: "Memories retrieved successfully",
      success: true,
      conversation,
    });
  } catch (error) {
    console.error("Error retrieving memories: ", error.message);
    return res.status(500).json({
      message: "An error occurred while retrieving memories",
      success: false,
    });
  }
};

module.exports.getAllMemories = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const memories = await memoriesModel
      .find()
      .sort({ createdAt: -1 })
      .populate("user");

    if (!memories) {
      return res.status(404).json({ message: "No memories found" });
    }

    return res.status(200).json({
      message: "All memories retrieved successfully",
      success: true,
      memories,
    });
  } catch (error) {
    console.log(
      "An error occurred while retrieving all memories: ",
      error.message
    );
  }
};

module.exports.getUsersByTags = async (req, res) => {
  try {
    const user = req.user; // Assuming user is authenticated
    const { tags } = req.body; // Tags are passed as an array of user IDs

    // Check if the user is authenticated
    if (!user) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    // Check if the tags array is provided
    if (!tags || !Array.isArray(tags)) {
      return res.status(400).json({ message: "Tags array is required" });
    }

    // Find users by their IDs
    const users = await userModel.find({ _id: { $in: tags } });

    // Check if users are found
    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found with these tags" });
    }

    return res.status(200).json({
      message: "Users retrieved successfully",
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error getting users by tags: ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.savePost = async (req, res) => {
  try {
    const user = req.user;
    const memoryId = req.params.memoryId;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    if (!memoryId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const memory = await memoriesModel.findById(memoryId);

    if (!memory) {
      return res.status(404).json({ message: "Memory not found" });
    }

    const currentUser = await userModel.findById(user);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (currentUser?.savedMemory?.includes(memory._id)) {
      const updatedUser = await userModel.findByIdAndUpdate(
        user,
        { $pull: { savedMemory: memory._id } },
        { new: true }
      );

      return res.status(200).json({
        message: "Memory Unsaved  successfully",
        success: true,
        memory: updatedUser,
      });
    } else {
      const updateduser = await userModel.findByIdAndUpdate(
        user,
        { $push: { savedMemory: memory._id } },
        { new: true }
      );

      return res.status(200).json({
        message: "Memory Saved successfully ",
        success: true,
        memory: updateduser,
      });
    }
  } catch (error) {
    console.log("Error Saving Post : ", error.message);
  }
};

module.exports.isSaved = async (req, res) => {
  try {
    const user = req.user;
    const memoryId = req.params.memoryId;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const currentUser = await userModel.findById(user);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isSaved = currentUser.savedMemory?.includes(memoryId);

    res.status(200).json({ success: true, isSaved });
  } catch (error) {
    console.error("Error checking saved state:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.getSavedMemory = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const currentUser = await userModel.findById(user);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const memories = await currentUser.populate("savedMemory");

    if (!memories) {
      return res.status(404).json({ message: "No saved memories found" });
    }

    return res.status(200).json({
      message: "Saved memories retrieved successfully",
      success: true,
      memories,
    });
  } catch (error) {
    console.log("Error Getting Saved Memory : ", error.message);
  }
};
