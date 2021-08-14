import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { deleteRecipe } from "../../stateManagement/recipeActions";
import * as Types from "../../stateManagement/TYPES";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { FcHighPriority } from "react-icons/fc";

const useStyles = makeStyles((theme) => ({
  outerContainer: { padding: "1rem" },
  innerContainer: {},
  confirmTextContainer: {},
  titleText: { fontStyle: "italic" },
  warningText: {
    fontStyle: "italic",
    fontSize: "0.7rem",
    color: theme.palette.error.main,
    width: "calc(100% - 20px)",
    textAlign: "right",
    margin: "5px 10px 10px",
  },
}));
const useDeleteButtonClasses = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
  label: {},
  text: { color: "#fff" },
}));
const useDismissClasses = makeStyles((theme) => ({
  //   root: {},
  //   label: {},
  //   text: {},
}));

const Modal_confirmDeleteRecipe = ({
  dialog: { variant, isOpen, contentText, title, confirmation, relevantId },
  recipes: { myRecipes },
  deleteRecipe,
}) => {
  const dispatch = useDispatch();
  const [recipe, setRecipe] = useState();
  useEffect(() => {
    let _recipe = myRecipes.filter((recipe) => recipe._id === relevantId);
    _recipe.length !== 0 && setRecipe(_recipe[0]);
    console.log("_recipe: ", _recipe);
  }, []);
  const classes = useStyles();
  const deleteClasses = useDeleteButtonClasses();
  const dismissClasses = useDismissClasses();
  const closeModal = () => {
    dispatch({ type: Types.HIDE_ALERT });
    setTimeout(() => {
      dispatch({ type: Types.RESET_ALERT });
    }, 1000);
  };
  const handleDelete = () => {
    closeModal();
    deleteRecipe(relevantId);
  };
  const handleDismiss = () => {
    closeModal();
  };
  return (
    <div className={classes.outerContainer}>
      <div className={classes.innerContainer}>
        {recipe && (
          <div className={classes.confirmTextContainer}>
            Are you sure you want to remove{" "}
            <span className={classes.titleText}>{recipe.title}</span>?
          </div>
        )}
        {!recipe && (
          <div className={classes.confirmTextContainer}>Are you sure?</div>
        )}
        <div className={classes.warningText}>This cannot be undone.</div>
      </div>
      <DialogActions>
        <Button
          onClick={(e) => handleDismiss()}
          color="primary"
          classes={dismissClasses}
        >
          Dismiss
        </Button>
        <Button
          onClick={(e) => handleDelete()}
          color="primary"
          autoFocus
          classes={deleteClasses}
        >
          Delete
        </Button>
      </DialogActions>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  dialog: state.alert.dialog,
  recipes: state.recipes,
  props: props,
});

export default connect(mapStateToProps, { deleteRecipe })(
  Modal_confirmDeleteRecipe
);
