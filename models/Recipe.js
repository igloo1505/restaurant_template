const Ingredient = require("./Ingredient");
const mongoose = require("mongoose");
const categoryArray = ["specialty", "side", "drink", "tacoIngredients"];

const RecipeSchema = mongoose.Schema(
  {
    category: {
      type: [String],
      default: [],
    },
    name: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Ingredient",
    },
    time: {
      prepTime: { type: mongoose.Schema.Types.ObjectId },
      cookTime: { type: mongoose.Schema.Types.ObjectId },
      totalTime: { type: mongoose.Schema.Types.ObjectId },
    },
    servings: { type: Number, required: true },
    directions: { type: [String], required: true },
    isHot: {
      type: Boolean,
      default: false,
    },
    isGlutenFree: {
      type: Boolean,
      default: false,
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Comment",
    },
  },
  { timestamps: true }
);

RecipeSchema.pre("save", async function (next, done) {
  if (!categoryArray.includes(this.category.toLowerCase())) {
    var err = new Error("category is not valid");
    next(err);
  } else {
    next();
  }
});

// module.exports = mongoose.model("Recipe", RecipeSchema);
module.exports =
  mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema);
