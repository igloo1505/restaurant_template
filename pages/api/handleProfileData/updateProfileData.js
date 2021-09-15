// const mongoose = require("mongoose");
import uuid from "uuid";
import nc from "next-connect";
import { connectDB } from "../../../util/connectDB";
import authMiddleware from "../../../util/authMiddleware";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import colors from "colors";
// import NextCors from "nextjs-cors";
import { handleRememberMe } from "../../../util/handleRememberMe";
import User from "../../../models/User";
import ProfileData from "../../../models/ProfileData";

const handler = nc();
// TODO add auth middleware back in to all protected routes
// TODO add check for cookies and adapt to 'remember me' state stored in cookies, and sign jwt in cookies as well.
handler.post(async (req, res) => {
  let cookies = new Cookies(req, res);
  let userId = cookies.get("userId") || req.body?.userId;
  if (!userId) {
    return res.status(401).json({ msg: "Unauthorized." });
  }
  !req.body?.userId && delete req.body.userId;
  let fields = { ...req.body };
  let user = await User.findById(userId);
  let pDataId = false;
  if (user?.userProfileData) {
    pDataId = user.userProfileData._id;
  }

  if (!pDataId) {
    let newPData = new ProfileData(fields);
    user.userProfileData = newPData._id;
    let _user = await User.findByIdAndUpdate(
      userId,
      { userProfileData: newPData._id },
      { new: true }
    );
    // await user.save();
    console.log("this far");

    await newPData.save();
    return res.json({ updatedUser: _user, profileData: newPData });
  }
  if (pDataId) {
    let newPData = await ProfileData.findByIdAndUpdate(pDataId, fields, {
      new: true,
    });
    return res.json({ updatedUser: user, profileData: newPData });
  }
});

export default connectDB(handler);
