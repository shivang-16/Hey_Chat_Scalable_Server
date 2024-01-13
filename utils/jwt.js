import jwt from "jsonwebtoken";

const sendCookie = async (user, res, message, statuscode) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res
    .status(statuscode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 90 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    })
    .json({
      success: true,
      message: message,
      user,
    });
};

export default sendCookie;
