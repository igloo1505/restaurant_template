/* eslint-disable react/prop-types */
import React, { Fragment, useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TimerIcon from "@material-ui/icons/Timer";
import { connect } from "react-redux";

const useDescriptionStyles = makeStyles((theme) => ({
  root: {
    margin: "0.5rem 1rem 1rem 0.5rem ",
    gridArea: "description",
  },
}));

const useStyles = makeStyles((theme) => ({
  descriptionContainer: {
    position: "absolute",
    opacity: 0,
    transform: "translateY(8px)",
  },
  descriptionOpen: {
    opacity: 1,
    transition: theme.transitions.create(["opacity"], {
      duration: 350,
      delay: 400,
    }),
  },
  descriptionInnerContainer: {
    display: "flex",
    gap: "0.75rem",
  },
  ingredientsContainer: {
    marginTop: "0.5rem",
  },
  IngredientTitle: {
    fontWeight: 500,
  },
}));

const MyRecipes_cardDescription = ({ recipe, summaryOpen, index }) => {
  const [maxHeight, setMaxHeight] = useState({});
  useEffect(() => {
    if (typeof window !== "undefined") {
      let containerHeight = document
        .getElementById(`card-image-container-${index}`)
        .getBoundingClientRect().height;
      setMaxHeight({
        maxHeight: `${containerHeight - 16}px`,
        overflow: "hidden",
      });
    }
  }, []);
  const { description } = recipe;
  const classes = useStyles();
  const descriptionClasses = useDescriptionStyles();
  return (
    <div
      className={clsx(
        classes.descriptionContainer,
        summaryOpen && classes.descriptionOpen
      )}
      style={maxHeight}
    >
      <div className={classes.descriptionInnerContainer}>
        <div className={classes.ingredientsContainer}>
          <Typography classes={{ root: classes.IngredientTitle }}>
            Ingredients
          </Typography>
        </div>
        <Typography classes={descriptionClasses}>
          {description.length >= 200
            ? `${description.slice(0, 200)}...`
            : description}
        </Typography>
      </div>
    </div>
  );
};

export default MyRecipes_cardDescription;
