import colors from "colors";
import Cookies from "cookies";
import fs from "fs";
import nc from "next-connect";
import { connectDB } from "../../../../util/connectDB";
import { uploadImage } from "../../../../util/s3";
import Recipe from "../../../../models/Recipe";
import multer from "multer";
import { v4 as uniqueFileName } from "uuid";

const _destination = "./recipeImagesUploading";

const upload = multer({
  storage: multer.diskStorage({
    destination: _destination,
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

// TODO add auth middleware back in to all protected routes
// TODO add check for cookies and adapt to 'remember me' state stored in cookies, and sign jwt in cookies as well.
const handler = nc();
const uploadMiddleware = upload.single("recipeImage");

handler.use(uploadMiddleware);

handler.post(async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.body.recipeId);
    console.log("recipe: ", recipe);
    // if (recipe && recipe.createdBy === req.body.userId) {
    console.log("req: ", req);
    console.log("req: ");
    const _fileName = uniqueFileName();
    const uploaded = await uploadImage(req.file, _fileName);
    console.log("uploaded: ", req.file);
    console.log(colors.bgBlue("Did run in route with...", req.file));
    const cookies = new Cookies(req, res);
    const _recipe = await Recipe.findByIdAndUpdate(
      req.body.recipeId,
      { imgUrl: `/api/recipeImages/${uploaded.Key}` },
      (err) => {
        console.log("Error in update recipe after image upload.", err);
      }
    );

    res.json({ updatedRecipe: _recipe });
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
    // bodyParser: {
    //   sizeLimit: "5mb",
    // },
    bodyParser: false,
  },
};
