import mongoose from "mongoose";

const GroceryItemSchema = mongoose.Schema(
  {
    ingredient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient",
      required: true,
      autopopulate: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

GroceryItemSchema.plugin(require("mongoose-autopopulate"));

module.exports =
  mongoose.models?.GroceryItem ||
  mongoose.model("GroceryItem", GroceryItemSchema);
