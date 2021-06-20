const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  let token;
  if (req.header("x-auth-token")) {
    token = req.header("x-auth-token");
  }
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded: ", decoded);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default authMiddleware;
