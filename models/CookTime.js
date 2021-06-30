import mongoose from "mongoose";

const units = ["minutes", "hours", "days"];

const TimerSchema = mongoose.Schema({
  time: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
});

TimerSchema.pre("save", async function (next, done) {
  if (!units.includes(this.unit.toLowerCase())) {
    var err = new Error("category is not valid");
    next(err);
  } else {
    next();
  }
});

TimerSchema.methods.getMilliseconds = function () {
  const mills = {
    minutes: 60000,
    hours: 3600000,
    days: 86400000,
  };
  return this.time * mills[this.unit];
};

module.exports = mongoose.models.Time || mongoose.model("Time", TimerSchema);
