const userModel = require("../models/userModel");

module.exports.createAccount = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
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
      password: password,
    });

    return res
      .status(200)
      .json({ message: "User created successfully", success: true, user });
  } catch (error) {
    console.log("Error creating account in server: " + error.message);
  }
};
