import { connectDB, middleware } from "../../../../util/connectDB";
import nc from "next-connect";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import Ingredient from "../../../../models/Ingredient";
import GroceryItem from "../../../../models/GroceryItem";
import User from "../../../../models/User";
const colors = require("colors");

const handler = nc();
// handler.use(middleware);
handler.post(async (req, res) => {
  const cookies = new Cookies(req, res);
  let userId = req.body.userId || cookies.get("userId");
  if (!userId) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  if (!req.body.ingredientId) {
    return res.status(500).json({ msg: "Invalid ingredientId" });
  }
  console.log(colors.bgBlue.white(req.body));
  try {
    let user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { groceryList: req.body.ingredientId },
      },
      { new: true }
    ).populate("groceryList");
    return res.json({
      msg: "Grocery item removed successfully.",
      updatedUser: user,
      removedId: req.body.ingredientId,
    });
  } catch (error) {
    res.statusCode = 500;
    return res.json({ msg: "There was an error removing that grocery item." });
  }
});

export default connectDB(handler);
