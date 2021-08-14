import mongoose from "mongoose";
import validate from "mongoose-validator";
import { unitObject } from "../util/appWideData";

// TODO adjust this to match front-end array, eventually use from same source to avoid errors.

// const unitArray = Object.values(unitObject).filter((u) => !u.isKey);

// const unitValidator = [
//   validate({
//     validator: "isIn",
//     arguments: unitArray,
//     message: "Unit needs to be one of accepted values.",
//   }),
// ];

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
      // validate: unitValidator,
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
