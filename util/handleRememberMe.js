import { v4 as uuidv4 } from "uuid";
import User from "../models/User";
import bcrypt from "bcryptjs";

export const handleRememberMe = async (user, req, cookies) => {
  console.log("Did run in handleRememberMe block");
  try {
    let salt = await bcrypt.genSalt(10);
    let uniquePassword = uuidv4();
    let stringifiedPassword = "";
    for (let i = 0; i < uniquePassword.length; i++) {
      if (uniquePassword[i] !== "-") {
        stringifiedPassword += uniquePassword[i];
      }
    }
    cookies.set("rememberMe", true, { httpOnly: false });
    cookies.set("email", req.body.email, { httpOnly: true });
    cookies.set("_p", stringifiedPassword, { httpOnly: true });
    console.log("here!!", stringifiedPassword);
    let encrypted = await bcrypt.hash(stringifiedPassword, salt);
    await User.findByIdAndUpdate(user._id, {
      oneTimePassword: encrypted,
    });
    return { user, req, cookies };
  } catch (error) {
    console.log("Error in handleRememberMe block.");
    console.log(error);
  }
};
