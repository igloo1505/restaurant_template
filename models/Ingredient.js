import mongoose from "mongoose";
import validate from "mongoose-validator";

// TODO adjust this to match front-end array, eventually use from same source to avoid errors.
const units = [
  "grams",
  "kilograms",
  "pounds",
  "ounces",
  "fluid ounces",
  "milliliters",
  "liters",
  "inch",
  "centimeter",
  "pinch",
  "to taste",
];

const unitValidator = [
  validate({
    validator: "isIn",
    arguments: units,
    message: "Unit needs to be one of accepted values.",
  }),
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
      validate: unitValidator,
    },
    optional: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Ingredient || mongoose.model("Ingredient", Ingredient);
