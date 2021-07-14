import nc from "next-connect";
import { connectDB } from "../util/connectDB";
import authMiddleware from "../util/authMiddleware";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import User from "../models/User";
import cookieParser from "cookie-parser";

// TODO adjust all routes to only use cookieParser middleware

export const autoLoginOnFirstRequest = async (req, res) => {
  await connectDB();
  await cookieParser(req, res);
  console.log(req.cookies);
  //   debugger;
  console.log("Res", res);
  console.log("Did reach autoLogin route...");
  const cookies = new Cookies(req, res);
  console.log("cookies", cookies);
  try {
    let email = cookies.get("email");
    let password = cookies.get("password");
    // debugger;
    if (!email || !password) {
      res.statusCode = 401;
      return { success: false, message: "Did not have proper cookies." };
    }

    // let user = await User.findOne({ email: email });
    let user = User.findOne({ email: email }).select("-password");
    console.log("USER USER USER", user);
    if (!user) {
      debugger;
      res.statusCode = 401;
      return {
        success: false,
        msg: "User not found through autoLogin attempt",
      };
    }
    let { isMatch } = await user.comparePassword(password, true);
    if (!isMatch) {
      debugger;
      res.statusCode = 401;
      return {
        success: false,
        msg: "Mix up of secure tokens between DB and client.",
      };
    }
    if (isMatch) {
      debugger;
      res.statusCode = 200;
      return user;
    }
  } catch (error) {
    // debugger;
    console.log(error);
    res.statusCode = 500;
    return {
      error: "There was an error logging in.",
    };
  }
};
