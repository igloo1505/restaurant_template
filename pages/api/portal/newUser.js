const mongoose = require("mongoose");
import nc from "next-connect";
import { connectDB, middleware } from "../../../util/connectDB";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import { handleRememberMe } from "../../../util/handleRememberMe";
const User = require("../../../models/User");
const colors = require("colors");

const handler = nc();
// handler.use(middleware);
handler.post(async (req, res) => {
  console.log(colors.red("Reached backend with: "), req.body);
  const cookies = new Cookies(req, res);
  try {
    let user = new User(req.body);
    const newUser = await user.save();
    console.log("User Saved!!: ", newUser);
    let token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
    cookies.set("token", token, { httpOnly: true });
    if (req.body.rememberMe) {
      await handleRememberMe(user, req, cookies);
    }
    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error adding that user." });
  }
});

export default connectDB(handler);
