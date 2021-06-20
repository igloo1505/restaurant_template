import { connectDB, middleware } from "../../../util/connectDB";
import nc from "next-connect";
import jwt from "jsonwebtoken";
const User = require("../../../models/User");
const colors = require("colors");

const handler = nc();
handler.use(middleware);
handler.post(async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.body.userID);
    return res.json({ user });
  } catch (error) {
    return res.json({ msg: "There was an error removing that user." });
  }
});

export default connectDB(handler);
