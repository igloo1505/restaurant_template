const mongoose = require("mongoose");
import nc from "next-connect";
import { connectDB, middleware } from "../../../util/connectDB";
import jwt from "jsonwebtoken";
const User = require("../../../models/User");
const colors = require("colors");

const handler = nc();
// handler.use(middleware);
handler.post(async (req, res) => {
  console.log(colors.red("Reached backend with: "), req.body);
  try {
    console.log(colors.red("Reached backend with: "), req.body);
    console.log("Firstname?", req.body["First Name"]);
    let user = new User({
      userName: req.body.Username,
      password: req.body.Password,
      firstName: req.body["First Name"],
      lastName: req.body["Last Name"],
    });

    console.log("USER!!!", user);
    // const newUser = user;
    const newUser = await user.save();
    // console.log("User Saved!!: ", user);
    let token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
    res.json({
      ...newUser,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error adding that user." });
  }
});

export default connectDB(handler);
