import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import * as Types from "../../stateManagement/TYPES";
// TODO add a info snackbar and use this as icon on primary.dark background
import { FcIdea } from "react-icons/gi";

const useStyles = makeStyles((theme) => ({
  snackbarRoot: {
    overflow: "visible",
  },
  alertRoot: {},
}));

const SnackbarSwitcher = ({
  snackbar: {
    isOpen,
    variant,
    message,
    hideIn,
    vertical,
    horizontal,
    transitionDirection,
  },
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const closeSnackbar = () => {
    dispatch({ type: Types.HIDE_SNACKBAR });
  };
  const handleClose = (event, reason) => {
    // const reasons = ["timeout", "clickaway", "undefined"];
    if (reason === "clickaway") {
      return;
    }
    dispatch({ type: Types.HIDE_SNACKBAR });
  };
  // object and prop key if going to use custom icons
  // iconMapping	{ error?: node, info?: node, success?: node, warning?: node }
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={hideIn}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      TransitionProps={{ transitionDirection }}
      anchorOrigin={{ vertical, horizontal }}
      classes={{ root: classes.snackbarRoot }}
    >
      <Alert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity={variant}
        classes={{
          root: classes.alertRoot,
          message: classes.alertMessage,
          action: classes.alertAction,
          icon: classes.alertIcon,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

const mapStateToProps = (state, props) => ({
  snackbar: state.alert.snackbar,
});
export default connect(mapStateToProps)(SnackbarSwitcher);

export const SlideTransition = (props) => {
  return <Slide {...props} direction={props.transitionDirection} />;
};
