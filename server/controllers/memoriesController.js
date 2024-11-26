const memoriesModel = require("../models/memoriesModel");

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
