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
      expiresIn: "1h",
    });

    res.cookie("token", token, { expires: new Date(Date.now() + 3600000) });

    return res
      .status(200)
      .json({ message: "Logged in successfully", success: true, user });
  } catch (error) {
    console.log("Error while loginAccount in server: " + error.message);
  }
};
