/* eslint-disable react/prop-types */
import React, { Fragment, useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TimerIcon from "@material-ui/icons/Timer";
import { connect } from "react-redux";

const useDescriptionStyles = makeStyles((theme) => ({
  root: {
    // margin: "1.5rem 1rem 1rem 0.5rem ",
    padding: "0px 0.75rem 0.75rem 0.75rem",
    gridArea: "description",
    width: "100%",
    height: "100%",
  },
}));

const useStyles = makeStyles((theme) => ({
  descriptionContainer: {
    position: "absolute",
    opacity: 0,
    display: "flex",
    gridTemplateColumns: "[ingredients] 1fr [description] 3fr",
    gridTemplateRows: "1fr",
    overflow: "hidden",
  },
  descriptionOpen: {
    opacity: 1,
    marginTop: "0.5rem",
    width: "calc(100% - 8px)",
    height: "100%",
    transition: theme.transitions.create(["opacity"], {
      duration: 350,
      delay: 400,
    }),
  },
  descriptionInnerContainer: {
    // deprecated. adjust elsewhere.
    display: "flex",
    gap: "0.75rem",
  },
  ingredientsContainer: {
    marginTop: "0.5rem",
    paddingRight: "0.35rem",
    borderRight: `1px solid ${theme.palette.grey[500]}`,
    maxWidth: "33%",
  },
  IngredientTitle: {
    fontWeight: 500,
    marginBottom: "6px",
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    padding: "0px 0.5rem",
  },
  ingredientItemsContainer: {
    listStyleType: "disc",

    maxHeight: "calc(100% - 31px)",
    // Scroll here just looks super congested... as if cramming an entire recipe onto a 400 * 250px card will ever look great.
    overflowY: "auto",
    paddingLeft: "0.3rem",
  },
  ingredientItem: {
    color: theme.palette.grey[800],
    paddingTop: "0.35rem",
    display: "block",
  },
  rightSideContainer: {
    minHeight: "calc(100% - 31px)",
    position: "relative",
    width: "100%",
    marginRight: "0.75rem",
  },
  actionsContainer: {
    position: "absolute",
    bottom: "0",
    right: "0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "6px",
  },
  buttonText: {},
  editButton: {},
}));

const MyRecipes_cardDescription = ({ recipe, summaryOpen, index }) => {
  const router = useRouter();
  const [maxHeight, setMaxHeight] = useState({});
  useEffect(() => {
    if (typeof window !== "undefined") {
      let containerHeight = document
        .getElementById(`card-image-container-${index}`)
        .getBoundingClientRect().height;
      setMaxHeight({
        maxHeight: `${containerHeight - 8}px`,
        overflow: "hidden",
      });
    }
  }, []);
  const { description } = recipe;
  const classes = useStyles();
  const descriptionClasses = useDescriptionStyles();
  const handleEditClick = (e) => {};
  const viewPublicPage = (e) => {
    router.push(`/recipeDetails/${recipe._id}`);
  };
  return (
    <div
      className={clsx(
        classes.descriptionContainer,
        summaryOpen && classes.descriptionOpen
      )}
      style={maxHeight}
    >
      <div className={classes.ingredientsContainer}>
        <Typography classes={{ root: classes.IngredientTitle }}>
          Ingredients:
        </Typography>
        <ul className={classes.ingredientItemsContainer}>
          {recipe.ingredients.map((ingredient, i) => (
            <RecipeItem ingredient={ingredient} classes={classes} />
          ))}
        </ul>
      </div>
      <div className={classes.rightSideContainer}>
        <Typography classes={descriptionClasses}>
          {description.length >= 200
            ? `${description.slice(0, 200)}...`
            : description}
        </Typography>
        <div className={classes.actionsContainer}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            classes={{ root: classes.editButton, label: classes.buttonText }}
            onClick={() => viewPublicPage()}
          >
            Public
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            classes={{ root: classes.editButton, label: classes.buttonText }}
            onClick={handleEditClick}
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyRecipes_cardDescription;

const RecipeItem = ({ ingredient, classes }) => {
  return ingredient.name
    .split(/\r?\n/)
    .map((i) => (
      <div className={classes.ingredientItem}>* {ingredient.name}</div>
    ));
};
