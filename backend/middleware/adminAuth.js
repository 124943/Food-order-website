import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const adminAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = (authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : req.headers.token);

  if (!token) {
    return res.json({ success: false, message: "Not Authorized, Login Again" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(token_decode.id);
    
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.json({ success: false, message: "Access Denied: Admin role required" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Invalid or Expired Token" });
  }
};

export default adminAuth;
