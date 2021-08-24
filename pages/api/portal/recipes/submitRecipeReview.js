import { connectDB, middleware } from "../../../../util/connectDB";
import nc from "next-connect";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import User from "../../../../models/User";
import Recipe from "../../../../models/Recipe";
import RecipeReview from "../../../../models/RecipeReview";

const colors = require("colors");

const handler = nc();
// handler.use(middleware);
handler.post(async (req, res) => {
  console.log(colors.bgBlue.white(req.body));
  try {
    let review = {
      ...req.body.review,
      recipeReference: req.body.review.recipeId,
    };
    let CheckUniqueSubmission = await Recipe.findById(
      req.body.review.submittedBy
    );
    if (CheckUniqueSubmission) {
      CheckUniqueSubmission.recipeReviews.forEach((r) => {
        if (r.submittedBy === req.body.review.submittedBy) {
          return res
            .status(401)
            .json({ error: "Each recipe can only be reviewed once." });
        }
      });
    }

    delete review.recipeId;
    let newReview = new RecipeReview(review);

    let user = await User.findByIdAndUpdate(
      req.body.review.submittedBy,
      {
        $push: { reviewsWritten: newReview._id },
      },
      { new: true }
    );
    let _recipe = await Recipe.findByIdAndUpdate(
      req.body?.review?.recipeId,
      {
        $push: { recipeReviews: newReview._id },
      },
      { new: true }
    );

    await newReview.save();

    console.log(user, _recipe);

    if (!user) {
      res.statusCode = 500;
      return res.json({ msg: "Failed to add review" });
    }
    let recipe = await Recipe.findById(req.body?.review?.recipeId);
    if (!recipe) {
      res.statusCode = 500;
      return res.json({ msg: "Failed to add review" });
    }
    return res.json({
      updatedUser: user,
      updatedRecipe: _recipe,
      review: newReview,
    });
  } catch (error) {
    res.statusCode = 500;
    return res.json({ msg: "An error occurred while adding that review." });
  }
});

export default connectDB(handler);
