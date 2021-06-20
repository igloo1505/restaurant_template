const mongoose = require("mongoose");
import nc from "next-connect";
import { connectDB, middleware } from "../../../../util/connectDB";
import Recipe from "../../../../models/Recipe";
const colors = require("colors");

const handler = nc();
handler.use(middleware);
handler.post(async (req, res) => {
  try {
    console.log(colors.bgGreen.black(req.body));
    const {
      Spicy: isHot,
      Category: category,
      Title: name,
      Description: description,
      Price: price,
      "In Stock": isInStock,
      "Gluten Free": isGlutenFree,
    } = req.body;
    let data = {
      category,
      name,
      description,
      price,
      isHot,
      isGlutenFree,
      isInStock,
    };
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
