const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("Connected to MongoDB!");
      })
      .catch((error) => {
        console.error("Failed to connect to MongoDB:", error.message);
      });
  } catch (error) {
    console.log("Error connecting to MongoDB: " + error.message);
  }
};

module.exports = connectDB;
