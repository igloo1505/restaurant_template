import { connectDB, middleware } from "../../util/connectDB";
import nc from "next-connect";
import jwt from "jsonwebtoken";
import Cookies from "cookies";

const colors = require("colors");

const handler = nc();
// handler.use(middleware);
handler.post(async (req, res) => {
  console.log(colors.bgBlue.white(req.body));
  try {
    let cookies = new Cookies(req, res);
    cookies.set("userId");
    cookies.set("token");
    cookies.set("password");
    cookies.set("_p");
    cookies.set("email");
    return res.json({ msg: "Recipe removed successfully." });
  } catch (error) {
    res.statusCode = 500;
    return res.json({ msg: "Error clearing login cookies" });
  }
});

export default connectDB(handler);
