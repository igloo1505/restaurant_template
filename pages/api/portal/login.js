// const mongoose = require("mongoose");
import nc from "next-connect";
import { middleware, connectDB } from "../../../util/connectDB";
import jwt from "jsonwebtoken";
const User = require("../../../models/User");
var colors = require("colors");

const handler = nc();
// TODO add auth middleware back in to all protected routes
// handler.use(middleware);
handler.post(async (req, res) => {
  console.log(colors.bgBlue("Did run in route with...", req.body));
  try {
    const user = await User.findOne({ userName: req.body.email });
    console.log("User!!!:", user);
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }
    const { isMatch, comparison } = await user.comparePassword(
      req.body.password
    );

    console.log(colors.red("IsMatch!!!"), isMatch, comparison);
    if (!isMatch) {
      return res.status(401).json({ error: "These passwords do not match." });
    }
    console.log("user!!!", user);
    if (isMatch) {
      const payload = {
        user: {
          id: user._id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          return res.json({ userID: user._id, token });
        }
      );
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error logging in." });
  }
});

export default connectDB(handler);
