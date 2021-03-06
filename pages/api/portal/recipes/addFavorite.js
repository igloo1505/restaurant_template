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
      console.log("_user: ", _user);
      let user;
      console.log("_user.myFavorites: ", _user.myFavorites);
      if (_user) {
        user = await User.findByIdAndUpdate(
          userId,
          {
            $push: { myFavorites: recipe._id },
          },
          { new: true }
        );
        return res.json({
          msg: "Recipe favorited successfully.",
          recipeId: recipe._id,
        });
      }
    }
    if (!recipe || !userId) {
      return res.json({ msg: "Error favoriting that recipe." });
    }
  } catch (error) {
    res.statusCode = 500;
    return res.json({
      msg: "There was an error adding that favorite.",
      error: error,
    });
  }
});

export default connectDB(handler);
