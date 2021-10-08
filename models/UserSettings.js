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

const UserSetting = mongoose.Schema(
  {
    shortcuts: {
    allowShortcuts: {
      type: Boolean,
      default: false
        },
    currentShortcuts: {
        
      type: String,
      default: false
        },

    },
  },
  { timestamps: true }
);
const Shortcut = mongoose.Schema(
  {
    key: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    keyCode: {
        type: Number,
        required: true,
    },
    filter: {
        // NOTE Use this to filter keyPress's like e[user.filter] => e["metaKey"]
        type: String,
        required: false,
    },
  }
);

module.exports =
  mongoose.models?.UserSetting || mongoose.model("UserSetting", UserSetting);
