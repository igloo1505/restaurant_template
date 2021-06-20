import { connectDB, middleware } from "../../../../util/connectDB";
import nc from "next-connect";
import jwt from "jsonwebtoken";
import Recipe from "../../../../models/Recipe";
const colors = require("colors");

const handler = nc();
handler.use(middleware);
handler.post(async (req, res) => {
  console.log(req.body);
  try {
    const recipe = await Recipe.findByIdAndDelete(req.body.id);
    if (!recipe) {
      return res.json({ msg: "The object you requested was not found." });
    }
    console.log("recipe", recipe);
    return res.json(recipe);
  } catch (error) {
    return res.json({ msg: "There was an error removing that recipe." });
  }
});

export default connectDB(handler);
