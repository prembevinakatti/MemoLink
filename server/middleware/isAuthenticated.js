const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    req.user = decodedToken.id;
    next();
  } catch (error) {
    console.log("Error in middleware : ", error.message);
  }
};
module.exports = isAuthenticated;
