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
  try {
    let review = {
      ...req.body.review,
      recipeReference: req.body.review.recipeId,
    };

    let recipe = await Recipe.findById(req.body?.review?.recipeId);

    if (!recipe) {
      res.statusCode = 500;
      return res.json({ msg: "Failed to add review" });
    }

    let CheckUniqueSubmission = await Recipe.findById(
      req.body.review.recipeId
    ).populate("recipeReviews");

    let hasRecipeReviews = Boolean(CheckUniqueSubmission?.recipeReviews);
    if (hasRecipeReviews) {
      console.log("Reached here point1");
      CheckUniqueSubmission.recipeReviews.forEach(async (r) => {
        if (r.submittedBy._id.equals(req.body.review.submittedBy)) {
          console.log("Reached here point1");
          let newRecipe = await Recipe.findByIdAndUpdate(
            req.body.review.recipeId,
            {
              $pullAll: { recipeReviews: [r._id] },
            },
            { new: true }
          );
          let removeRemoveFromUser = await User.findByIdAndUpdate(
            req.body.review.submittedBy,
            {
              $pullAll: { reviewsWritten: [r._id] },
            },
            { new: true }
          );
          await RecipeReview.findByIdAndDelete(r._id);
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
    if (!user) {
      res.statusCode = 500;
      return res.json({ msg: "Failed to add review" });
    }
    await newReview.save();
    let _recipe = await Recipe.findByIdAndUpdate(
      req.body?.review?.recipeId,
      {
        $push: { recipeReviews: newReview._id },
      },
      { new: true }
    ).populate({
      path: "recipeReviews",
      options: {
        limit: 10,
        sort: { created: -1 },
        // skip: req.params.pageIndex*10
      },
      populate: {
        path: "submittedBy",
        select:
          "firstName lastName _id -groceryList -myBookmarks -userProfileData",
      },
    });

    console.log("_recipe: ", _recipe);

    return res.json({
      updatedUser: user,
      updatedRecipe: _recipe,
      review: newReview,
    });
  } catch (error) {
    console.log("error: ", error);
    res.statusCode = 500;
    return res.json({ msg: "An error occurred while adding that review." });
  }
});

export default connectDB(handler);
