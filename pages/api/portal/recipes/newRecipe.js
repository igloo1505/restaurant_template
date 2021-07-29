const mongoose = require("mongoose");
import nc from "next-connect";
import { connectDB, middleware } from "../../../../util/connectDB";
import Recipe from "../../../../models/Recipe";
const colors = require("colors");

const handler = nc();
handler.use(middleware);
handler.post(async (req, res) => {
  try {
    console.log(
      colors.bgGreen.black("Ran this bitch in /api/portal/recipes/newRecipe")
    );
    console.log(colors.bgGreen.black(req.body));
    // const {
    //   category,
    //   title,
    //   imgUrl,
    //   description,
    //   ingredients,
    //   cookTime,
    //   prepTime,
    // } = req.body;
    const {
      servings,
      servingUnit,
      title,
      description,
      ingredients,
      directions,
      prepTime,
      cookTime,
      // ingredient: { text, optional },
    } = req.body;
    // let data = {
    //   category,
    //   name,
    //   description,
    //   price,
    //   isHot,
    //   isGlutenFree,
    //   isInStock,
    // };
    let recipe = new Recipe(data);
    console.log(recipe);
    let returned = await recipe.save();
    console.log("returned", returned.errors);
    return res.json(recipe);
  } catch (error) {
    console.log("Return this error?", error);
    return res.statusCode(500).json({
      msg: "There was an error saving that recipe to the database.",
    });
  }
});

export default connectDB(handler);
