import mongoose from "mongoose";

const units = ["minutes", "hours", "days"];

const RecipeReviewSchema = mongoose.Schema({
	kidFriendly: {
		type: Number,
		required: true,
	},
	dateFriendly: {
		type: Number,
		required: true,
	},
	quickSnack: {
		type: Number,
		required: true,
	},
	dietFriendly: {
		type: Number,
		required: true,
	},
	comment: {
		type: String,
		required: false,
		maxLength: 200,
	},
	submittedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	recipeReference: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Recipe",
		required: true,
	},
});

// RecipeReviewSchema.plugin(require("mongoose-autopopulate"));

module.exports =
	mongoose?.models?.RecipeReview ||
	mongoose.model("RecipeReview", RecipeReviewSchema);
