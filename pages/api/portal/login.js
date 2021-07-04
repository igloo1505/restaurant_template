// const mongoose = require("mongoose");
import uuid from "uuid";
import nc from "next-connect";
import { connectDB } from "../../../util/connectDB";
import authMiddleware from "../../../util/authMiddleware";
import jwt from "jsonwebtoken";
import cookies from "next-cookies";
import Cookies from "cookies";
import { handleRememberMe } from "../../../util/handleRememberMe";
import User from "../../../models/User";
import colors from "colors";

const handler = nc();
// TODO add auth middleware back in to all protected routes
// TODO add check for cookies and adapt to 'remember me' state stored in cookies, and sign jwt in cookies as well.
handler.post(async (req, res) => {
  console.log(colors.bgBlue("Did run in route with...", req.body));
  const cookies = new Cookies(req, res);
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log("User!!!:", user);
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }
    const { isMatch } = await user.comparePassword(req.body.password);
    console.log(colors.red("IsMatch!!!"), isMatch);
    if (!isMatch) {
      return res.status(401).json({ error: "These passwords do not match." });
    }
    console.log("user!!!", user);
    if (isMatch) {
      const payload = {
        userID: user._id,
      };
      let expiresIn = req.rememberMe ? 604800 : 3600;
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: expiresIn,
      });
      cookies.set("token", token, { httpOnly: true });
      if (req.body.rememberMe) {
        console.log("AAA");
        let { user: updatedUser } = await handleRememberMe(user, req, cookies);
        console.log("BBB");
        // await updatedUser.save();
        // cookies.set("rememberMe", true, { httpOnly: false });
        // cookies.set("email", req.body.email, { httpOnly: true });
        // cookies.set("password", req.body.password, { httpOnly: true });
      }
      return res.json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error logging in." });
  }
});

export default connectDB(handler);
