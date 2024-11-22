const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const userRoute = require("./route/userRoute");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/MemoLink/auth", userRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening on port ${PORT}`);
});
