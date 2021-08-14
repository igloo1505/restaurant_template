import React, { forwardRef, useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { connect } from "react-redux";
import MyRecipes_recipeCard from "./MyRecipes_recipeCard";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    width: "100%",
    paddingTop: "16px",
    display: "grid",
    gridGap: "10px",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
  },
}));

const MyRecipes_recipesGrid = ({ recipes: { myRecipes }, user, props }) => {
  const classes = useStyles();
  return (
    <div className={classes.gridContainer}>
      {myRecipes &&
        myRecipes.map((rec, i) => (
          <MyRecipes_recipeCard recipe={rec} index={i} key={rec._id} />
        ))}
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    recipes: state.recipes,
    user: state.user,
    props: props,
  };
};

export default connect(mapStateToProps)(MyRecipes_recipesGrid);
