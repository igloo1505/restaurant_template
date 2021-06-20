const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } else {
    next(new Error("failed to encrypt password"));
  }
});

UserSchema.methods.comparePassword = async function (password, next) {
  const comparison = await bcrypt.compare(password, this.password);
  if (!comparison) {
    return {
      isMatch: false,
      comparison: comparison,
    };
  } else {
    return {
      isMatch: true,
      comparison: comparison,
    };
  }
};

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
