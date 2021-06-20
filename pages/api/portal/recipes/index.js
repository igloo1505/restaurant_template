import nc from "next-connect";
import { connectDB, middleware } from "../../../../util/connectDB";
import Recipe from "../../../../models/Recipe";
const colors = require("colors");

const handler = nc();
handler.use(middleware);
handler.get(async (req, res) => {
  try {
    let recipes = await Recipe.find({}).sort({ createdAt: -1 }).limit(20);
    return res.json(recipes);
  } catch (error) {
    console.log("ERROR; ", error);
    return res.json({ msg: "There was an error retrieving recipe data." });
  }
});

export default connectDB(handler);
