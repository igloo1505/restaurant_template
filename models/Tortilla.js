const mongoose = require("mongoose");

const TortillaSchema = mongoose.Schema(
  {
    dataType: {
      type: String,
      default: "Tortilla",
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
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Tortilla || mongoose.model("Tortilla", TortillaSchema);
