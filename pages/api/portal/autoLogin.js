import nc from "next-connect";
import { connectDB } from "../../../util/connectDB";
import authMiddleware from "../../../util/authMiddleware";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import User from "../../../models/User";
import cookieParser from "cookie-parser";

// TODO adjust all routes to only use cookieParser middleware

const handler = nc();
handler.use(cookieParser());
handler.get(async (req, res) => {
  console.log(req.cookies);
  console.log("Did reach autoLogin route...");
  const cookies = new Cookies(req, res);
  try {
    console.log("EMAIL: ", email, password);
    let email = cookies.get("email");
    let password = cookies.get("password");
    // let x = jsonCookie.
    if (!email || !password) {
      return res
        .status(401)
        .json({ success: false, message: "Did not have proper cookies." });
    }
    console.log("PASSWORD: ", password);
    let user = await User.findOne({ email: email });
    // let user = User.findOne({ email: email }).select("-password");
    // console.log(user);
    if (!user) {
      return res.status(401).json({
        success: false,
        msg: "User not found through autoLogin attempt",
      });
    }
    let { isMatch } = await user.comparePassword(password, true);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        msg: "Mix up of secure tokens between DB and client.",
      });
    }
    if (isMatch) {
      return res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error logging in." });
  }
});

export default connectDB(handler);
