const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Recipe = require("./Recipe");
const { v4 } = require("uuid");
const Ingredient = require("./Ingredient");

// NOTE make sure this continues to match array in Modal_setSkill.
const skillArray = [
  "I burn everything",
  "Just learning",
  "Beginner",
  "Home cook",
  "It's my job",
  "Professionally Trained",
];

const ProfileDataSchema = mongoose.Schema(
  {
    aboutMe: {
      type: String,
    },
    skillLevel: {
      type: String,
      enum: skillArray,
    },
    location: {
      city: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    favoriteCuisine: {
      type: String,
    },
    inspiredBy: {
      type: String,
    },
    roundedImg: {
      type: Boolean,
      default: false,
    },
    showFullName: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models?.ProfileData ||
  mongoose.model("ProfileData", ProfileDataSchema);
