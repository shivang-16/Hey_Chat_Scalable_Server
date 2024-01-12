import sendMail from "../middleware/sendMail.js";
import { User } from "../models/userModel.js";
import sendCookie from "../utils/jwt.js";
import bcrypt, { hashSync } from "bcrypt";

let user, OTP;
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User Already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    OTP = Math.floor(1000 + Math.random() * 9000);
    await sendMail({
      email,
      subject: "Hey! - Verication Code",
      message: `You verification code for registering in Hey! Chat <b>${OTP}</b>`,
    });
    res.status(200).json({
      success: true,
      message: "Verification code send to your email",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || "Internal Server Error",
      });
  }
};

export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    OTP = Math.floor(1000 + Math.random() * 9000);
    await sendMail({
      email,
      subject: "Hey! - Verication Code",
      message: `You verification code for registering in Hey! Chat <b>${OTP}</b>`,
    });
    res.status(200).json({
      success: true,
      message: "Verification code Resend to your email",
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || "Internal Server Error",
      });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;

    console.log(otp, OTP);

    if (OTP != otp) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Otp, Please try again" });
    }

    await user.save();
    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || "Internal Server Error",
      });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      res.status(400).json({
        success: false,
        message: "Wrong Credentials",
      });
    }

    sendCookie(user, req, `Hey! ${user.name}`, 200);
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || "Internal Server Error",
      });
  }
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      sameSite: "none",
      secure: true,
    })
    .json({
      success: false,
      message: "Logged Out",
    });
};
