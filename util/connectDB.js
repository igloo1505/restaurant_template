const mongoose = require("mongoose");
const nc = require("next-connect");
import authMiddleware from "./authMiddleware";
// const authMiddleware = require("./authMiddleware");
import errorHandler from "./errorHandler";
const colors = require("colors");

const connectDB = (handler) => async (req, res) => {
  handler.use(errorHandler);
  // handler.options.onError = errorHandler
  await errorHandler(handler);
  console.log(colors.bgCyan.black("Running connectDB()"));
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }
  return mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(async () => {
      return handler(req, res);
    });
};

module.exports = {
  connectDB,
};
