const mongoose = require("mongoose");

const AddOnSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dataType: {
      type: String,
      default: "AddOn",
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

module.exports = mongoose.models.AddOn || mongoose.model("AddOn", AddOnSchema);
