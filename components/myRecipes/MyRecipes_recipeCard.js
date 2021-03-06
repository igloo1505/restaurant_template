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
    // height: "256px",
    flexDirection: "column",
    opacity: 0.25,
    borderRadius: "4px",
    position: "relative",
    backgroundColor: "#fff",
    transition: `background-color 4000ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 2000ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border ${backgroundTransition}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
    [theme.breakpoints.down(600)]: {
      minWidth: "90vw",
    },
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
    // border: "1px solid red",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: "4px",
    zIndex: 1,
    color: "rgba(0, 0, 0, 0.5)",
    transition: theme.transitions.create(["color", "background-color"], {
      duration: 250,
    }),
    "&:hover": {
      cursor: "pointer",
      color: "rgba(0, 0, 0, 1)",
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      transition: theme.transitions.create(["color", "background-color"], {
        duration: 250,
      }),
    },
  },
}));

export const MyRecipes_recipeCard = ({
  user,
  recipes,
  props: { recipe, index, key },
  viewport: { width: deviceWidth },
  deleteRecipe,
}) => {
  let itemId = `myRecipes-card-${index}`;
  const dispatch = useDispatch();
  const [addBoxShadow, setAddBoxShadow] = useState(false);
  const [addBackground, setAddBackground] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [_fixedHeight, _setFixedHeight] = useState({});
  const classes = useStyles();

  useEffect(() => {
    let imageContainer = document
      .getElementById(`card-image-container-${index}`)
      .getBoundingClientRect();
    let summaryContainer = document
      .getElementById(`summary-card-container-${index}`)
      .getBoundingClientRect();
    let fixed = imageContainer.height + summaryContainer.height;
    _setFixedHeight({
      height: ` ${fixed}px`,
    });
    // console.log("imageContainer: ", imageContainer);
  }, [deviceWidth]);

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

  return (
    <div
      className={clsx(
        classes.cardOuterContainer,
        addBoxShadow && classes.addBoxShadow,
        addBackground && classes.addBackground
      )}
      style={_fixedHeight}
      id={itemId}
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
        setSummaryOpen={setSummaryOpen}
        summaryOpen={summaryOpen}
        index={index}
      />

      <MyRecipes_cardSummary
        index={index}
        cardId={itemId}
        recipe={recipe}
        setSummaryOpen={setSummaryOpen}
        summaryOpen={summaryOpen}
      />
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  user: state.user,
  recipes: state.recipes,
  viewport: state.UI.viewport,
  props: props,
});

const mapDispatchToProps = { deleteRecipe };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyRecipes_recipeCard);
