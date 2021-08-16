const mongoose = require("mongoose");
// const nc = require("next-connect");
// import authMiddleware from "./authMiddleware";
// import errorHandler from "./errorHandler";
const colors = require("colors");

const MONGO_URI = process.env.MONGO_URI;
console.log("MONGO_URI: ", MONGO_URI);
const MONGODB_DB = process.env.MONGODB_DB;
console.log("MONGODB_DB: ", MONGODB_DB);

export const connectDB = async (req, res) => {
  console.log("process.env.MONGO_URI: ", process.env.MONGO_URI);
  console.log(colors.bgCyan.black("Running connectDB()"));
  if (mongoose.connections[0].readyState) {
    return true;
  }
  return mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(async () => {
      return true;
    });
};
