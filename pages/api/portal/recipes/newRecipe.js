const mongoose = require("mongoose");
import nc from "next-connect";
import { connectDB, middleware } from "../../../../util/connectDB";
import { unitObject } from "../../../../util/appWideData";

import Recipe from "../../../../models/Recipe";
import Ingredient from "../../../../models/Ingredient";
const colors = require("colors");

const handler = nc();
// handler.use(middleware);
handler.post(async (req, res) => {
  try {
    console.log(
      colors.bgGreen.black("Ran this bitch in /api/portal/recipes/newRecipe")
    );
    console.log(colors.bgBlue.white(req.body));

    const {
      servings,
      createdBy,
      servingUnit,
      imgUrl,
      title,
      description,
      ingredients,
      directions,
      prepTime,
      cookTime,
    } = req.body;
    if (!createdBy) {
      res.statusCode = 401;
      res.json({ error: "You must be logged in to add a recipe." });
    }
    let _ingredients = [];
    let _ingredientsToReturn = [];

    ingredients.forEach(async (ingredient, index) => {
      // console.log("newIngredient: ", {
      //   name: ingredient.text,
      //   quantity: parseFloat(ingredient.amount),
      //   unit: ingredient.unit.long,
      //   optional: ingredient.optional,
      // });
      let newIngredient = new Ingredient({
        name: ingredient.text,
        quantity: parseFloat(ingredient.amount),
        unit: ingredient.unit.long,
        optional: ingredient.optional,
      });
      _ingredients.push(newIngredient._id);
      console.log(newIngredient);
      let _newIngredient = await newIngredient.save();
      _ingredientsToReturn.push(_newIngredient);
    });

    let data = {
      createdBy,
      servings,
      servingUnit,
      imgUrl,
      title,
      description,
      ingredients: _ingredients,
      directions,
      time: {
        prepTime: null,
        cookTime: null,
      },
      servings: {
        amount: servings,
        unit: servingUnit,
      },
    };
    if (prepTime && typeof parseFloat(prepTime) === "number") {
      data.time.prepTime = parseFloat(prepTime);
    }
    if (cookTime && typeof parseFloat(cookTime) === "number") {
      data.time.cookTime = parseFloat(cookTime);
    }

    let recipe = new Recipe(data);
    let returnRecipe = await recipe.save();
    return res.json({
      recipe: returnRecipe,
      ingredients: _ingredientsToReturn,
    });
  } catch (error) {
    console.log("Return this error?", error);
    console.log("Return this error?", res);
    res.statusCode = 500;
    return res.json({
      error: "Something went wrong while validating that recipe.",
    });
  }
});

export default connectDB(handler);
