const mongoose = require("mongoose");
const nc = require("next-connect");
const authMiddleware = require("./authMiddleware");
const colors = require("colors");

const connectDB = (handler, isProtected) => async (req, res) => {
  console.log(colors.bgCyan.black("Running connectDB()"));
  if (mongoose.connections[0].readyState) {
    if (isProtected) {
      await authMiddleware(req, res);
    }
    return handler(req, res);
  }
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(async () => {
      if (isProtected) {
        await authMiddleware(req, res);
      }
      return handler(req, res);
    });
};

// const middleware = nc();
// const middlewareWithAuth = nc();
// console.log("MIDDLEWARE", middleware);
// middleware.use(database);
// middlewareWithAuth.use(async (req, res, next) => {
//   // await authMiddleware();
//   next();
// });
// middlewareWithAuth.use(async (req, res, next) => {
//   connectDB();
//   next();
// });
// middleware.use(async (req, res, next) => {
//   connectDB();
//   next();
// });

// middleware.use(authMiddleware);
module.exports = {
  connectDB,
};
