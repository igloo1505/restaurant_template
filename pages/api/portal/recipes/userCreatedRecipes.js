import nc from "next-connect";
import { connectDB, middleware } from "../../../../util/connectDB";
import Recipe from "../../../../models/Recipe";
import Cookies from "cookies";

const handler = nc();
// handler.use(middleware);
handler.get(async (req, res) => {
  const cookies = new Cookies(req, res);
  console.log("cookies: ", cookies);
  try {
    let userId = cookies.get("userId");
    if (!userId) {
      res.statusCode = 401;
      return res.json({
        error: "No userId was passed to userCreatedRecipes route.",
      });
    }
    let recipes = await Recipe.find({ createdBy: userId }).populate(
      "ingredients"
    );
    return res.json({
      recipes,
    });
  } catch (error) {
    console.log("Return this error?", error);
    res.statusCode = 500;
    return res.json({
      error: "An error occurred while retrieving user created recipes.",
    });
    // return res.statusCode(500).json({
    //   msg: "There was an error saving that recipe to the database.",
    // });
  }
});

export default connectDB(handler);
