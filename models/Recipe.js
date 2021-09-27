const Ingredient = require("./Ingredient");
const mongoose = require("mongoose");
const categoryArray = ["specialty", "side", "drink", "tacoIngredients"];
const RecipeReview = require("./RecipeReview");

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
      autopopulate: true,
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
        required: true,
      },
      dateFriendly: {
        type: Number,
        required: true,
      },
      quickSnack: {
        type: Number,
        required: true,
      },
      dietFriendly: {
        type: Number,
        required: true,
      },
    },
  },
  { timestamps: true }
);

RecipeSchema.pre("findOneAndUpdate", async function (next, done) {
  // return next();
  console.log("this", this);
  if (this?._update?.["$push"]?.recipeReviews) {
    let latestReview = await RecipeReview.findById(
      this._update["$push"].recipeReviews._id
    );
    console.log("latestReview: ", latestReview);
    let averageReviews = {
      kidFriendly: [latestReview.kidFriendly],
      dateFriendly: [latestReview.dateFriendly],
      quickSnack: [latestReview.quickSnack],
      dietFriendly: [latestReview.dietFriendly],
    };
    console.log("averageReviews: ", averageReviews);

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
    console.log("averageReviews: ", averageReviews);
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
