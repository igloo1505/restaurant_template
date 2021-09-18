const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Recipe = require("./Recipe");
const { v4 } = require("uuid");
const Ingredient = require("./Ingredient");

const SocialDataSchema = mongoose.Schema(
  {
    friends: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      unique: true,
    },
    friendRequests: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "FriendRequest",
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models?.SocialData || mongoose.model("SocialData", SocialDataSchema);
