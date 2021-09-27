/* eslint-disable react/display-name */
import React, { Fragment, useState, useEffect, forwardRef } from "react";
import { connect, useDispatch } from "react-redux";
import clsx from "clsx";
import Details_IngredientItem from "./Details_IngredientItem";
import { makeStyles } from "@material-ui/core/styles";
import { handleGroceryItem } from "../../stateManagement/userActions";
import Typography from "@material-ui/core/Typography";

const useClasses = makeStyles((theme) => ({
  ingredientsTitle: {
    margin: "0px 1rem 1rem 0.5rem",
    color: "#fff",
    "&:hover": {
      textShadow: `3px 3px 2px #cc540e, -3px -3px 2px #ff6c12`,
    },
  },
  ingredientsContainer: {
    marginLeft: "2rem",
    padding: "0.75rem",
    boxShadow: `4px 4px 8px ${theme.palette.grey[400]}, -4px -4px 8px ${theme.palette.grey[300]}`,
    backgroundColor: theme.palette.secondary.main,
  },
  ingredientsContainerNoImage: {
    marginLeft: "2rem",
    marginTop: "1rem",
    padding: "0.75rem 2rem 0.75rem 0.75rem",
    boxShadow: `4px 4px 8px ${theme.palette.grey[400]}, -4px -4px 8px ${theme.palette.grey[300]}`,
    backgroundColor: theme.palette.secondary.main,
  },
}));

const Details_Ingredients = ({ props: { recipe } }) => {
  const classes = useClasses();
  return (
    <div
      className={clsx(
        classes.ingredientsContainer,
        !recipe.imgUrl && classes.ingredientsContainerNoImage
      )}
    >
      <Typography classes={{ root: classes.ingredientsTitle }} variant="h4">
        Ingredients:
      </Typography>
      {recipe?.ingredients?.map((ingredient, i) => (
        <Details_IngredientItem
          item={ingredient}
          recipeId={recipe._id}
          key={ingredient._id}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  user: state.user,
  viewport: state.UI.viewport,
  props: props,
});

export default connect(mapStateToProps, { handleGroceryItem })(
  Details_Ingredients
);
