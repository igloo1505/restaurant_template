const mongoose = require("mongoose");

const ToppingSchema = mongoose.Schema(
  {
    dataType: {
      type: String,
      default: "Topping",
    },
    name: {
      type: String,
      required: true,
    },
    isGlutenFree: {
      type: Boolean,
      default: false,
    },
    isInStock: {
      type: Boolean,
      default: true,
    },
    isHot: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Topping || mongoose.model("Topping", ToppingSchema);
