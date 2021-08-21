const Ingredient = require("./Ingredient");
const mongoose = require("mongoose");
const categoryArray = ["specialty", "side", "drink", "tacoIngredients"];

const RecipeSchema = mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [
        true,
        "There was an error creating that recipe. Please try logging in again.",
      ],
    },
    categories: {
      type: [String],
      default: [],
    },
    title: {
      type: String,
      required: [true, "Please give your recipe a title!"],
    },
    imgUrl: {
      type: String,
    },
    description: {
      type: String,
      required: [
        true,
        "Make sure people can find your recipe by giving it a description.",
      ],
    },
    ingredients: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Ingredient",
    },
    time: {
      prepTime: { type: Number },
      cookTime: { type: Number },
      totalTime: { type: Number },
    },
    servings: {
      amount: {
        type: Number,
        required: [
          true,
          "Please fill out the serving information as accurately as you can.",
        ],
      },
      unit: {
        type: String,
        required: [
          true,
          "Please fill out the serving information as accurately as you can.",
        ],
      },
    },
    directions: {
      type: [String],
      required: [
        true,
        "Please add some directions. Some of us need more help than others.",
      ],
    },
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

RecipeSchema.methods.getUsersRecentRecipes = async function () {
  let recipes = await mongoose
    .model("Recipe")
    .find({ createdBy: this.createdBy })
    .sort({ createdAt: -1 })
    .limit(5);
  return recipes;
};

// module.exports = mongoose.model("Recipe", RecipeSchema);
module.exports =
  mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema);
