import { connectDB, middleware } from "../../../util/connectDB";
import nc from "next-connect";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import Recipe from "../../../models/Recipe";
import User from "../../../models/User";
import Review from "../../../models/RecipeReview";
const colors = require("colors");

const handler = nc();
// handler.use(middleware);
handler.post(async (req, res) => {
  console.log(colors.bgBlue.white(req.body));
  const cookies = new Cookies(req, res);
  let userId = req.body.userId || cookies.get("userId");
  try {
    const recipe = await Recipe.findById(req.body.recipeId);
    const review = await Review.findById(req.body.reviewId);
    if (!recipe) {
      res.statusCode = 404;
      return res.json({ msg: "Invalid recipe Id" });
    }
    if (!review) {
      res.statusCode = 404;
      return res.json({ msg: "Review not found" });
    }
    if (recipe && userId && review) {
      let _user = await User.findById(userId);
      if (_user && _user.reviewsWritten) {
        let updatedUser = await User.findByIdAndUpdate(
          _user._id,
          {
            $pullAll: { reviewsWritten: [review._id] },
          },
          { new: true }
        );
        let updatedRecipe = await Recipe.findByIdAndUpdate(
          req.body.recipeId,
          {
            $pullAll: { recipeReviews: [review._id] },
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

        const deleteReview = await Review.findByIdAndDelete(review._id);
        console.log("updatedUser: ", updatedUser);
        return res.json({
          msg: "Recipe review removed successfully.",
          removedReviewId: review._id,
          updatedRecipe: updatedRecipe,
          updatedUser: updatedUser,
        });
      }
    }
    if (!recipe || !userId) {
      res.statusCode = 500;
      return res.json({ msg: "Error bookmarking that recipe." });
    }
  } catch (error) {
    res.statusCode = 500;
    return res.json({ msg: "There was an error removing that bookmark." });
  }
});

export default connectDB(handler);
