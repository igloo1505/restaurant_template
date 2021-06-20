const mongoose = require("mongoose");

const ProteinSchema = mongoose.Schema(
  {
    dataType: {
      type: String,
      default: "Protein",
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
  mongoose.models.Protein || mongoose.model("Protein", ProteinSchema);
