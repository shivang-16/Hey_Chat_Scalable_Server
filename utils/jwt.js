import jwt from "jsonwebtoken";

const sendCookie = async (user, res, message, statuscode) => {
  const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET);
  res
    .status(statuscode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 60 * 60,
      sameSite: "none",
      secure: true,
    })
    .json({
      success: true,
      message: message,
    });
};

export default sendCookie;
