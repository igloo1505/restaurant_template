import { connectDB, middleware } from "../../../../util/connectDB";
import nc from "next-connect";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import Recipe from "../../../../models/Recipe";
import User from "../../../../models/User";
const colors = require("colors");

const handler = nc();
// handler.use(middleware);
handler.post(async (req, res) => {
  const cookies = new Cookies(req, res);
  let userId = req.body.userId || cookies.get("userId");
  console.log(colors.bgBlue.white(req.body));
  try {
    const recipe = await Recipe.findById(req.body.recipeId);
    console.log("recipe: ", recipe);
    if (!recipe) {
      res.statusCode = 404;
      return res.json({ msg: "Invalid recipe Id" });
    }
    if (recipe && userId) {
      let _user = await User.findById(userId);
      if (_user && _user.myBookmarks) {
        _user.myFavorites.pull(recipe._id);
        return res.json({
          msg: "Recipe bookmark removed successfully.",
          recipeId: recipe._id,
        });
      }
    }
    if (!recipe || !userId) {
      return res.json({ msg: "Error bookmarking that recipe." });
    }
  } catch (error) {
    res.statusCode = 500;
    return res.json({ msg: "There was an error removing that bookmark." });
  }
});

export default connectDB(handler);
