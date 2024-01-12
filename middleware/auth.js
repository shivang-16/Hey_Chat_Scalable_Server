import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res
      .status(400)
      .json({ success: false, message: "Please Login first" });

  const decodeId = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodeId._id);
  next();
};

export default isAuthenticated;
