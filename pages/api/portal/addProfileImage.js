import colors from "colors";
import Cookies from "cookies";
import fs from "fs";
import nc from "next-connect";
import { connectDB } from "../../../util/connectDB";
import { uploadImage } from "../../../util/s3";
import User from "../../../models/User";
import multer from "multer";
import { v4 as uniqueFileName } from "uuid";

const _destination = "./profileImagesUploading";

const upload = multer({
  storage: multer.diskStorage({
    destination: _destination,
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

// TODO add auth middleware back in to all protected routes
// TODO add check for cookies and adapt to 'remember me' state stored in cookies, and sign jwt in cookies as well.
const handler = nc();
const uploadMiddleware = upload.single("profileImage");

handler.use(uploadMiddleware);

handler.post(async (req, res) => {
  try {
    let user = await User.findById(req.body.userId);
    const _fileName = uniqueFileName();
    const uploaded = await uploadImage(req.file, _fileName);
    const cookies = new Cookies(req, res);
    const _user = await User.findByIdAndUpdate(
      req.body.userId,
      { profileImgUrl: `/api/recipeImages/${uploaded.Key}` },
      (err) => {
        console.log("Error in update user after image upload.", err);
      }
    );
    res.json({ updatedUser: _user });
    return fs.unlink(`${_destination}/${req.file.filename}`, (err) => {
      console.log(colors.bgRed.white("Error", err));
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Something went wrong while uploading that image." });
  }
});

export default connectDB(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};
