/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Details_ReviewItem from "./Details_ReviewItem";

const useClasses = makeStyles((theme) => ({
  outerContainer: {
    margin: "1rem 0rem",
    width: "100%",
    display: "grid",
    gap: "10px",
    gridTemplateColumns: "repeat(auto-fit, minmax(50%, 1fr))",
  },
}));

const Details_RecipeReviews = ({ recipeReviews, recipeId }) => {
  console.log("recipeReviews: ", recipeReviews);
  const classes = useClasses();
  return (
    <div className={classes.outerContainer}>
      {recipeReviews &&
        recipeReviews?.map((review, index, array) => (
          <Details_ReviewItem
            review={review}
            recipeId={recipeId}
            index={index}
            array={array}
            key={`recipeReview-${index}`}
          />
        ))}
    </div>
  );
};

export default Details_RecipeReviews;
