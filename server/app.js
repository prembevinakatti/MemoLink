const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const userRoute = require("./route/userRoute");
const memoryRoute = require("./route/memoryRoute");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOption));

app.use("/api/MemoLink/auth", userRoute);
app.use("/api/MemoLink/memory", memoryRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening on port ${PORT}`);
});
