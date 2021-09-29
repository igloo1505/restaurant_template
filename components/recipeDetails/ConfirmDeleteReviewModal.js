/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../stateManagement/userActions";
import * as Types from "../../stateManagement/TYPES";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    padding: "0px 1rem 1rem 1rem",
  },
  actionsContainer: {
    padding: "0.5rem 0.5rem 0rem 0.5rem",
  },
  contentRoot: {
    padding: "0.5rem 0.5rem 0.5rem 0.5rem",
  },
  innerContainer: {
    minWidth: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  confirmTextContainer: {},
  titleText: { fontStyle: "italic" },
  warningText: {
    fontStyle: "italic",
    fontSize: "0.7rem",
    margin: "0.75rem 0.75rem 0.75rem 0rem",
    color: theme.palette.error.main,
    width: "calc(100% - 20px)",
    textAlign: "left",
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

const Modal_confirmDeleteReview = ({
  dialog: { variant, isOpen, contentText, title, confirmation, relevantId },
  user: {
    loggedIn,
    self: { _id: userId },
  },
  deleteReview,
}) => {
  const dispatch = useDispatch();
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
    deleteReview({
      reviewId: relevantId.reviewId,
      recipeId: relevantId.recipeId,
      userId: userId,
    });
  };
  const handleDismiss = () => {
    closeModal();
  };
  return (
    <div className={classes.outerContainer}>
      <div className={classes.innerContainer}>
        <DialogContent classes={{ root: classes.contentRoot }}>
          <Typography classes={{ root: classes.confirmTextContainer }}>
            Are you sure?
          </Typography>
          <div className={classes.warningText}>This cannot be undone.</div>
        </DialogContent>
      </div>
      <DialogActions classes={{ root: classes.actionsContainer }}>
        <Button
          onClick={() => handleDismiss()}
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
  user: state.user,
  props: props,
});

export default connect(mapStateToProps, { deleteReview })(
  Modal_confirmDeleteReview
);
