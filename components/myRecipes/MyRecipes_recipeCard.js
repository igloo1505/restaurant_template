import React, { forwardRef, useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { connect, useDispatch } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import MyRecipes_cardBanner from "./MyRecipes_cardBanner";
import MyRecipes_cardSummary from "./MyRecipes_cardSummary";
import {
  deleteRecipe,
  addDeleteConfirmationListeners,
} from "../../stateManagement/recipeActions";
import * as Types from "../../stateManagement/TYPES";

let boxShadowTransition = 350;
let backgroundTransition = 650;

const useStyles = makeStyles((theme) => ({
  cardOuterContainer: {
    border: `1px solid #fff`,
    marginTop: "10px",
    marginBottom: "10px",
    padding: "0",
    display: "flex",
    flexDirection: "column",
    opacity: 0.25,
    borderRadius: "4px",
    position: "relative",
    backgroundColor: "#fff",
    transition: `background-color 4000ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 2000ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border ${backgroundTransition}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
  },
  addBackground: {
    backgroundColor: theme.palette.common.paperLight,
    opacity: 1,
    transition: `background-color 4000ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 2000ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border ${backgroundTransition}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
  },
  addBoxShadow: {
    border: `1px solid ${theme.palette.grey[200]}`,
    boxShadow: `2px 2px 5px ${theme.palette.grey[400]}, -2px 2px 5px ${theme.palette.grey[300]}`,

    transition:
      "box-shadow 1500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,transform 1500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background 1500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important",
  },
  closeIconContainer: {
    position: "absolute",
    float: "right",
    top: "5px",
    right: "5px",
    transform: "scale(1)",
    transition: theme.transitions.create(["color"], { duration: 250 }),
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.grey[500],
      transition: theme.transitions.create(["color"], { duration: 250 }),
    },
  },
}));

// EXAMPLE recipe object and embedded ingredient
// {__v: 0
// _id: "6116020737c12f29bf3727c6"
// categories: [] (0)
// comments: [] (0)
// createdAt: "2021-08-13T05:24:23.567Z"
// createdBy: "60ca3c4e89226b09e04ad70e"
// description: "Some bomb ass recipe"
// directions: ["Add stuff to pan", "Take stuff out of pan"] (2)
// imgUrl: null
// ingredients: [{
// _id: "6116020737c12f29bf3727c0"
// createdAt: "2021-08-13T05:24:23.567Z"
// name: "Item One"
// optional: false
// quantity: 1
// unit: "Tablespoons"
// updatedAt: "2021-08-13T05:24:23.567Z"
// }, Object, Object, Object, Object, Object] (6)
// isGlutenFree: false
// isHot: false
// servings: {amount: 4, unit: "Cups"}
// time: {prepTime: 12, cookTime: 16}
// title: "Test Recipe One"
// updatedAt: "2021-08-13T05:24:23.567Z"}

export const MyRecipes_recipeCard = ({
  user,
  recipes,
  props: { recipe, index, key },
  deleteRecipe,
}) => {
  let itemId = `myRecipes-card-${index}`;
  const dispatch = useDispatch();
  const [addBoxShadow, setAddBoxShadow] = useState(false);
  const [addBackground, setAddBackground] = useState(false);
  const [bannerIn, setBannerIn] = useState(true);
  const classes = useStyles();
  //   const [showSingle, setShowSingle] = useState(false);
  const [showSingle, setShowSingle] = useState(true);
  const handleDeleteRecipe = (e) => {
    // TODO Handle confirmation here before delete
    let modalPayload = {
      isOpen: true,
      //   contentText: `Are you sure you want to permanently remove ${title}?`,
      title: "Delete Recipe?",
      variant: "deleteRecipe",
      relevantId: recipe._id,
      titleColor: "error",
      confirmation: {
        confirmAction: () => deleteRecipe(recipe._id),
        dismissAction: () => dispatch({ type: Types.HIDE_ALERT }),
      },
    };
    dispatch({ type: Types.SHOW_ALERT, payload: modalPayload });
  };
  useEffect(() => {
    let duration = 135 * index;
    // console.log("duration: ", duration);
    setTimeout(() => setAddBackground(true), duration);
    setTimeout(() => setAddBoxShadow(true), duration);
  }, []);
  useEffect(() => {
    if (index === 0) {
      setShowSingle(true);
    }
  }, []);
  return (
    <div id={itemId}>
      <div
        style={showSingle ? { display: "flex" } : { display: "none" }}
        className={clsx(
          classes.cardOuterContainer,
          addBoxShadow && classes.addBoxShadow,
          addBackground && classes.addBackground
        )}
      >
        <div className={classes.closeIconContainer}>
          <CloseIcon
            classes={{ root: classes.closeIcon }}
            onClick={handleDeleteRecipe}
          />
        </div>

        <MyRecipes_cardBanner
          cardId={itemId}
          recipe={recipe}
          setBannerIn={setBannerIn}
          bannerIn={bannerIn}
        />

        <Slide>
          <MyRecipes_cardSummary
            cardId={itemId}
            recipe={recipe}
            setBannerIn={setBannerIn}
            bannerIn={bannerIn}
          />
        </Slide>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  user: state.user,
  recipes: state.recipes,
  props: props,
});

const mapDispatchToProps = { deleteRecipe };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyRecipes_recipeCard);
