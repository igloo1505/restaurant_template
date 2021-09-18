import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Slide from "@material-ui/core/Slide";
import { connect, useDispatch } from "react-redux";

const useClasses = makeStyles((theme) => ({
  recipeCardOuterContainer: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "4px",
    border: "1px solid red",
    backgroundColor: theme.palette.secondary.light,
    transition: theme.transitions.create(["box-shadow"], {
      duration: 500,
    }),
  },
  titleContainer: {
    textTransform: "capitalize",

    "& > *": {
      color: "#ffff",
    },
  },
  addBoxShadow: {
    boxShadow: `8px 8px 14px ${theme.palette.grey[400]}, -8px 8px 14px ${theme.palette.grey[300]}`,
    "&:hover": {
      boxShadow: `6px 6px 12px ${theme.palette.grey[400]}, -6px 6px 12px ${theme.palette.grey[300]}`,
    },
  },
}));

const publicProfileRecipeCardNoImage = ({ recipe, index }) => {
  const {
    title,
    time,
    servings: { unit: servingUnit, amount: servingAmount },
  } = recipe;
  const classes = useClasses();
  const [addBoxShadow, setAddBoxShadow] = useState(false);
  useEffect(() => {
    let offset = 500 + index * 200;
    setTimeout(() => {
      setAddBoxShadow(true);
    }, offset);
  }, []);

  console.log("recipe in profile: ", recipe);
  return (
    <div
      className={clsx(
        "userCreatedRecipeCard",
        classes.recipeCardOuterContainer,
        addBoxShadow && classes.addBoxShadow
      )}
    >
      <div className={classes.titleContainer}>
        <Typography variant="h6">{title}</Typography>
      </div>
    </div>
  );
};

export default publicProfileRecipeCardNoImage;
