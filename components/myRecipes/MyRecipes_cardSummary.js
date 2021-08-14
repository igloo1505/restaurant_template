import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";
import { connect, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  outerContainer: {},
  innerContainer: {},
}));

const MyRecipes_cardSummary = () => {
  const classes = useStyles();
  return (
    <div className={classes.outerContainer}>
      <div>Summary</div>
    </div>
  );
};

export default MyRecipes_cardSummary;
