import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const VerifyUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Token not provided.",
    });
  } else {
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.SCERET);

      // Check if the decoded object exists
      if (!decoded) {
        return res.status(403).json({
          success: false,
          message: "Token is invalid.",
        });
      }

      // Find the user in the database
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }

      // Attach user to the request object
      req.user = user;
      next();
    } catch (error) {
      // Handle specific JWT errors
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token has expired. Please log in again.",
        });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(403).json({
          success: false,
          message: "Invalid token. Please log in again.",
        });
      }

      // Generic error handler
      return res.status(500).json({
        success: false,
        message: `Internal Server Error: ${error.message}`,
      });
    }
  }
};

export default VerifyUser;
