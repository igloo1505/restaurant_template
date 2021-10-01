const Ingredient = require("./Ingredient");
const mongoose = require("mongoose");
const RecipeReview = require("./RecipeReview");
const SubRecipe = require("./SubRecipe");

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

const healthKeyEnum = [
  "gluten free",
  "dairy free",
  "vegan",
  "vegetarian",
  "paleo",
  "keto",
  "lactose free",
  "low fat",
  "low carb",
  "low sodium",
  "high protein",
  "low cholesterol",
  "high fiber",
  "low sugar",
];

const cuisineEnum = [
  "Italian",
  "American",
  "Chinese",
  "Thai",
  "Indian",
  "Mexican",
  "French",
  "Salad",
];

const categoryEnum = [
  "one pan",
  "side",
  "drink",
  "condiment",
  "dinner",
  "snack",
  "holiday",
  "celebration",
  "breakfast",
  "on the go",
  "affordable",
  "health focused",
  "Salad",
];

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
    cuisineType: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      default: "",
    },
    ingredients: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Ingredient",
      autopopulate: true,
    },
    subRecipes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "SubRecipe",
      autopopulate: true,
    },
    // TODO Add this functionality to add/remove favorite route to help with sorting search results
    favoriteCount: {
      type: Number,
      default: 0,
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
        enum: unitArray,
        default: "People",
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
    healthKeys: {
      type: [String],
      default: [],
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Comment",
      unique: true,
    },
    recipeReviews: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "RecipeReview",
      unique: true,
    },
    averageRatings: {
      kidFriendly: {
        type: Number,
      },
      dateFriendly: {
        type: Number,
      },
      quickSnack: {
        type: Number,
      },
      dietFriendly: {
        type: Number,
      },
    },
  },
  { timestamps: true }
);

RecipeSchema.pre("findOneAndUpdate", async function (next, done) {
  // return next();

  if (this?._update?.["$push"]?.recipeReviews) {
    let latestReview = await RecipeReview.findById(
      this._update["$push"].recipeReviews._id
    );

    let averageReviews = {
      kidFriendly: [latestReview.kidFriendly],
      dateFriendly: [latestReview.dateFriendly],
      quickSnack: [latestReview.quickSnack],
      dietFriendly: [latestReview.dietFriendly],
    };

    let allReviews = await mongoose
      .model("RecipeReview")
      .find({ recipeReference: this.getQuery()._id });
    allReviews.forEach((review) => {
      Object.keys(averageReviews).forEach((key) => {
        averageReviews[key].push(review[key]);
      });
    });
    Object.keys(averageReviews).forEach((finishedKey) => {
      let newAverage = averageReviews[finishedKey].reduce((a, b) => {
        return a + b;
      }, 0);
      averageReviews[finishedKey] =
        newAverage / averageReviews[finishedKey].length;
    });

    this._update.averageRatings = averageReviews;
    return next();
  } else {
    return next();
  }
});

RecipeSchema.methods.getUsersRecentRecipes = async function () {
  let recipes = await mongoose
    .model("Recipe")
    .find({ createdBy: this.createdBy })
    .sort({ createdAt: -1 })
    .limit(5);
  return recipes;
};

RecipeSchema.plugin(require("mongoose-autopopulate"));

module.exports =
  mongoose.models?.Recipe || mongoose.model("Recipe", RecipeSchema);
