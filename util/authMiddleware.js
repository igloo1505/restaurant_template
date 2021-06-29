// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import { promisify } from "util";

const authMiddleware = async (handler) => {
  console.log(typeof handler);
  console.log(handler);
  return async (req, res) => {
    const { token } = req.cookies;
    console.log("BODY", req.body);
    console.log("Did run in middleware");
    if (!token) {
      return res
        .status(401)
        .json({ success: false, msg: "No token, authorization denied" });
    }
    try {
      console.log("Did run in try block");
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );
      console.log("decoded: ", decoded);
      // TODO Add redirect here for failed authentication and resign successfull logins
      // let authenticated = Boolean(req.user._id === decoded.userID);
      // console.log("authenticated", authenticated);

      // next();
      return handler(req, res);
    } catch (err) {
      return res.status(401).json({ msg: "Token is not valid" });
    }
  };
};

export default authMiddleware;
