const mongoose = require("mongoose");
const Ingredient = require("./Ingredient");

const unitArray = [
  "A pinch",
  "A smidgen",
  "A heap",
  "just a little",
  "A wee bit",
  "A speckle",
  "Teaspoons",
  "Tablespoons",
  "Cups",
  "Quarts",
  "Gallons",
  "Milliliters",
  "Cubic cm",
  "liters",
  "Pounds",
  "Ounces",
  "Grams",
  "Kilograms",
  "Stone",
  "People",
  "Whole",
];

const SubRecipeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Ingredient",
      autopopulate: true,
    },
  },
  { timestamps: true }
);

SubRecipeSchema.plugin(require("mongoose-autopopulate"));

module.exports =
  mongoose.models?.SubRecipe || mongoose.model("SubRecipe", SubRecipeSchema);
