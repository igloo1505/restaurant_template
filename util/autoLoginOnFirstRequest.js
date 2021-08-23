import * as Types from "../stateManagement/TYPES";
import mongoose from "mongoose";
import Cookies from "cookies";
import User from "../models/User";
import bcrypt from "bcryptjs";

export const autoLoginOnFirstRequest = async (req, res) => {
  let cookies = new Cookies(req, res);
  let rememberMe = cookies.get("rememberMe");
  let userId = cookies.get("userId");
  let token = cookies.get("token");
  let returnUser;
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(async () => {
      let user = await User.findById(userId).select("-password -otp");
      if (user) {
        let comparison = await bcrypt.compare(
          cookies.get("_p"),
          user.oneTimePassword
        );
        console.log("user.oneTimePassword: ", user.oneTimePassword);
        console.log('cookies.get("_p"),: ', cookies.get("_p"));
        console.log("comparison**: ", comparison);
        if (comparison) {
          returnUser = user;
        }
        if (!comparison) {
          cookies.set("userId");
          cookies.set("rememberMe");
          cookies.set("token");
          cookies.set("_p");
          cookies.set("email");
        }
      }
    });
  if (returnUser) {
    console.log("Returning user ", returnUser);
    return JSON.parse(JSON.stringify(returnUser));
  }
  if (!returnUser) {
    console.log("Not Returning user ", returnUser);
    return false;
  }
};
