import mongoose from "mongoose";
import validate from "mongoose-validator";

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
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Ingredient || mongoose.model("Ingredient", Ingredient);
