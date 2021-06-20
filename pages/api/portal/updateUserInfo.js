import nc from "next-connect";
import { connectDB, middleware } from "../../../util/connectDB";
import jwt from "jsonwebtoken";
const User = require("../../../models/User");
const colors = require("colors");

const handler = nc();
handler.use(middleware);
handler.post(async (req, res) => {
  try {
    console.log(colors.bgWhite.cyan(req.body));
    const firstName = req.body["First Name"];
    const lastName = req.body["Last Name"];
    const { Username, Password } = req.body;
    const fieldsToUpdate = {};
    const user = await User.findById(req.body._id);
    if (!user) {
      return res.json({
        msg: "There was an error updating that users information.",
      });
    }
    if (firstName !== user.firstName) {
      fieldsToUpdate.firstName = firstName;
    }
    if (lastName !== user.lastName) {
      fieldsToUpdate.lastName = lastName;
    }
    if (Password !== user.password) {
      fieldsToUpdate.password = Password;
    }
    if (Username !== user.userName) {
      fieldsToUpdate.userName = Username;
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.body._id,
      fieldsToUpdate,
      { new: true }
    );

    return res.json(updatedUser);
  } catch (error) {
    return res.json({
      msg: "There was an error updating that users information.",
      error: error,
    });
  }
});

export default connectDB(handler);
