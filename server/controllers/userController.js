const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.createAccount = async (req, res) => {
  try {
    const { username, email, profilePhoto, password, confirmPassword } =
      req.body;

    if (!username || !email || !password || !confirmPassword || !profilePhoto) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await userModel.findOne({
      email: email,
      username: username,
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await userModel.create({
      username: username,
      email: email,
      profilePhoto: profilePhoto,
      password: password,
    });

    return res
      .status(200)
      .json({ message: "User created successfully", success: true, user });
  } catch (error) {
    console.log("Error creating account in server: " + error.message);
  }
};

module.exports.loginAccount = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    res.cookie("token", token, { expires: new Date(Date.now() + 3600000) });

    return res
      .status(200)
      .json({ message: "Logged in successfully", success: true, user });
  } catch (error) {
    console.log("Error while loginAccount in server: " + error.message);
  }
};

module.exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.log("Error while logging out in server: ", error.message);
  }
};

module.exports.updateAccount = async (req, res) => {
  try {
    const { profilePhoto, username, email } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updateData = {};

    if (profilePhoto) updateData.profilePhoto = profilePhoto;
    if (username) updateData.username = username;
    if (email) updateData.email = email;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No data to update" });
    }

    const updateUser = await userModel.findByIdAndUpdate(user, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Account updated successfully",
      success: true,
      user: updateUser,
    });
  } catch (error) {
    console.log("Error while updating account: ", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.checkUsername = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res
        .status(400)
        .json({ success: false, message: "Username is required" });
    }

    const existingUser = await userModel.findOne({ username });

    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Username is already taken" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Username is available" });
  } catch (error) {
    console.error("Error checking username:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports.getAllUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const allUsers = await userModel.find({ _id: { $ne: user } });

    if (!allUsers || allUsers.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({ success: true, users: allUsers });
  } catch (error) {
    console.log("Error getting all users: ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.toggleFollow = async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUser = req.user; // Authenticated user

    if (!currentUser) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const loginedUser = await userModel.findById(currentUser);

    if (!loginedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFollowing = loginedUser.following?.includes(userId.toString());

    if (isFollowing) {
      // Unfollow
      await userModel.findByIdAndUpdate(loginedUser._id, {
        $pull: { following: userId },
      });
      await userModel.findByIdAndUpdate(userId, {
        $pull: { followers: loginedUser._id },
      });
    } else {
      // Follow
      await userModel.findByIdAndUpdate(loginedUser._id, {
        $push: { following: userId },
      });
      await userModel.findByIdAndUpdate(userId, {
        $push: { followers: loginedUser._id },
      });
    }

    res.status(200).json({
      success: true,
      message: isFollowing
        ? "Unfollowed successfully"
        : "Followed successfully",
    });
  } catch (error) {
    console.error("Error toggling follow:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
