import mongoose from "mongoose";

// TODO adjust this to match front-end array, eventually use from same source to avoid errors.

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
];

const Ingredient = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    optional: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models?.Ingredient || mongoose.model("Ingredient", Ingredient);
