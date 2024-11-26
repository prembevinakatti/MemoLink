const mongoose = require("mongoose");

const memoriesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    profilePhoto: {
      type: String,
      default: "default_profile_photo.jpg",
    },
    content: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
    },
    location: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Memory", memoriesSchema);
