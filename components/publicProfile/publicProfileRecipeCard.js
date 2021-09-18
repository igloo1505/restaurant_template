import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import Slide from "@material-ui/core/Slide";
import { connect, useDispatch } from "react-redux";

const useClasses = makeStyles((theme) => ({}));

const publicProfileRecipeCard = ({ recipe }) => {
  const {
    title,
    time,
    servings: { unit: servingUnit, amount: servingAmount },
  } = recipe;
  console.log("recipe in profile: ", recipe);
  const classes = useClasses();
  return (
    <div className={classes.recipeCardOuterContainer}>
      <div>{title}</div>
    </div>
  );
};

export default publicProfileRecipeCard;
