import { connectDB, middleware } from "../../../../util/connectDB";
import nc from "next-connect";
import jwt from "jsonwebtoken";
import Recipe from "../../../../models/Recipe";
const colors = require("colors");

const handler = nc();
// handler.use(middleware);
handler.post(async (req, res) => {
  console.log(colors.bgBlue.white(req.body));
  try {
    const recipe = await Recipe.findByIdAndDelete(req.body.recipeId);
    if (!recipe) {
      res.statusCode = 404;
      return res.json({ msg: "The object you requested was not found." });
    }
    console.log("recipe", recipe);
    return res.json({ msg: "Recipe removed successfully.", recipe });
  } catch (error) {
    res.statusCode = 500;
    return res.json({ msg: "There was an error removing that recipe." });
  }
});

export default connectDB(handler);
