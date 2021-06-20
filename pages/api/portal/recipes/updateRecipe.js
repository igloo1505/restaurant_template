import nc from "next-connect";
import { connectDB, middleware } from "../../../../util/connectDB";
import jwt from "jsonwebtoken";
import Recipe from "../../../../models/Recipe";
const colors = require("colors");

const handler = nc();
handler.use(middleware);
handler.post(async (req, res) => {
  console.log(colors.red("req.body", req.body));
  try {
    let {
      "In Stock": isInStock,
      "Gluten Free": isGlutenFree,
      Description: description,
      Category: category,
      Spicy: isHot,
      Title: name,
      Price: price,
      _id: _id,
    } = req.body;
    let fields = {};
    if (isInStock) {
      fields.isInStock = isInStock;
    }
    if (isGlutenFree) {
      fields.isGlutenFree = isGlutenFree;
    }
    if (description) {
      fields.description = description;
    }
    if (category) {
      fields.category = category;
    }
    if (isHot) {
      fields.isHot = isHot;
    }
    if (name) {
      fields.name = name;
    }
    if (price) {
      fields.price = price;
    }
    let recipe = await Recipe.findByIdAndUpdate(_id, fields, { new: true });

    return res.json(recipe);
  } catch (error) {
    return res.json({
      msg: "There was an error updating that Recipe.",
      error: error,
    });
  }
});

export default connectDB(handler);
