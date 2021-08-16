import colors from "colors";
import Cookies from "cookies";
import nc from "next-connect";
import { connectDB } from "../../../util/connectDB";
import { getRecipeImage } from "../../../util/s3";

// TODO add auth middleware back in to all protected routes
// TODO add check for cookies and adapt to 'remember me' state stored in cookies, and sign jwt in cookies as well.
const handler = nc();

handler.get(async (req, res) => {
  try {
    console.log("Did run getImage ", req);
    const { recipeImgUrl } = req.query;
    const imageStream = await getRecipeImage(recipeImgUrl);
    // res.json(uploaded);
    // }
    // res.pipe(destination)
    imageStream.pipe(res);
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
