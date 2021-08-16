const path = require("path");
module.exports = {
  poweredByHeader: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  // images: {
  //   // domains: ["localhost", "localhost:3000"],
  // },
};
