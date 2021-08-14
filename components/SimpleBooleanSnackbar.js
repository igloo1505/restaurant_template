import React, { useState } from "react";
import { deleteRecipe } from "../stateManagement/recipeActions";
import { connect, useDispatch } from "react-redux";
import * as Types from "../stateManagement/TYPES";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

// TODO use this for bookmark and favorite confirmations and whatnot
const SimpleSnackbar = ({
  booleanSnackbar: {
    isOpen,
    transitionDirection,
    variant,
    hideIn,
    message,
    vertical,
    horizontal,
    relevantId,
    undoAction,
  },
}) => {
  const dispatch = useDispatch();

  const checkUndoAction = () => {
    switch (undoAction) {
      case "deleteRecipe": {
        return dispatch(deleteRecipe(relevantId));
      }
      default:
        return;
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({ type: Types.HIDE_BOOLEAN_SNACKBAR });
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={isOpen}
        autoHideDuration={hideIn}
        onClose={handleClose}
        message={message}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={checkUndoAction}>
              UNDO
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  booleanSnackbar: state.alert.booleanSnackbar,
});

export default connect(mapStateToProps, { deleteRecipe })(SimpleSnackbar);
