const mongoose = require("mongoose");
const categoryArray = ["specialty", "side", "drink", "tacoIngredients"];

const RecipeSchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isHot: {
      type: Boolean,
      default: false,
    },
    isGlutenFree: {
      type: Boolean,
      default: false,
    },
    isInStock: {
      type: Boolean,
      default: true,
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
