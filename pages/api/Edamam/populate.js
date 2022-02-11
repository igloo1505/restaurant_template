import { connectDB, middleware } from "../../../util/connectDB";
import nc from "next-connect";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import Recipe from "../../../models/Recipe";
import Ingredient from "../../../models/Ingredient";
import User from "../../../models/User";
import Review from "../../../models/RecipeReview";
import axios from "axios";
const colors = require("colors");

const handler = nc();
// handler.use(middleware);
handler.post(async (req, res) => {
  try {
    console.log("req.body: ", req.body);
    let recipeResponse = await axios.get(`${process.env.EDAMAM_RECIPE_URL}`, {
      params: {
        type: "public",
        q: req.body.query,
        app_id: process.env.EDAMAM_RECIPE_APP_ID,
        app_key: process.env.EDAMAM_RECIPE_ACCESS_KEY,
      },
    });
    console.log("res: ", recipeResponse.data);
    recipeResponse.data.hits.forEach((ir) => {
      //   console.log("ir: ", ir);
      let healthKeys = [];
      if (ir?.recipe?.healthLabels) {
        healthKeys = [...ir?.recipe?.healthLabels];
      }
      if (ir?.recipe?.dietLabels) {
        healthKeys = [...healthKeys, ...ir?.recipe?.dietLabels];
      }
      let times = {
        ...(ir?.recipe?.totalTime && { totalTime: ir?.recipe?.totalTime }),
        ...(ir?.recipe?.prepTime && { prepTime: ir?.recipe?.prepTime }),
        ...(ir?.recipe?.cookTime && { cookTime: ir?.recipe?.cookTime }),
      };

      let ingredientsArray = [];
      ir.recipe.ingredients.forEach((ing) => {
        let ingredientData = {
          name: ing.food,
          quantity: ing.quantity,
          unit: ing.measure,
          text: ing.text,
        };
        let _ingredient = new Ingredient(ingredientData);
        ingredientsArray.push(_ingredient);
      });
      let recipeData = {
        createdBy: req.body.userId,
        categories: ir?.recipe?.cuisineType,
        title: ir?.recipe?.label,
        imgUrl: ir?.recipe?.image,
        courseType: ir?.recipe?.dishType,
        ingredients: ingredientsArray,
        healthKeys: healthKeys,
        time: times,
        servings: {
          amount: ing.yield,
        },
      };
    });
    return res.json({ data: recipeResponse.data });
  } catch (error) {
    res.statusCode = 500;
    return res.json({ msg: "There was an error populating recipes." });
  }
});

export default connectDB(handler);
