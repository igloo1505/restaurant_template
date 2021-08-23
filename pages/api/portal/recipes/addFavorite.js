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
    if (!recipe) {
      res.statusCode = 404;
      return res.json({ msg: "Invalid recipe Id" });
    }
    if (recipe && userId) {
      let user = await User.findByIdAndUpdate(userId, {
        $push: { myFavorites: recipe._id },
      });
      if (user) {
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
    return res.json({ msg: "There was an error add that favorite." });
  }
});

export default connectDB(handler);
