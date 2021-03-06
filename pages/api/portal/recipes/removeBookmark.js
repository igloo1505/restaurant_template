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
  console.log(colors.bgBlue.white(req.body));
  const cookies = new Cookies(req, res);
  let userId = req.body.userId || cookies.get("userId");
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
        let newUser = await User.findByIdAndUpdate(
          _user._id,
          {
            $pullAll: { myBookmarks: [recipe._id] },
          },
          { new: true }
        );

        console.log("newUser: ", newUser);
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
