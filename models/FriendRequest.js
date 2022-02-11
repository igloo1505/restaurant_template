const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const statusArray = ["Accepted", "Declined", "Pending"];

const FriendRequestSchema = mongoose.Schema(
  {
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sentTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: statusArray,
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models?.FriendRequest ||
  mongoose.model("FriendRequest", FriendRequestSchema);
