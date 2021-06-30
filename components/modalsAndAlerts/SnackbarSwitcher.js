import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
// import * as Types from "../../stateManagement/TYPES";
import * as Types from "../../stateManagement/TYPES";

const useStyles = makeStyles((theme) => ({
  snackbarRoot: {
    // backgroundColor: "transparent",
    // border: "1px solid red",
  },
  alertRoot: {},
  // alertMessage: { backgroundColor: "transparent" },
  // alertAction: { backgroundColor: "transparent" },
  // alertIcon: { backgroundColor: "transparent" },
}));

const SnackbarSwitcher = ({
  snackbar: { isOpen, variant, message, hideIn },
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const closeSnackbar = () => {
    dispatch({ type: Types.HIDE_SNACKBAR });
  };
  const handleClose = (event, reason) => {
    console.log(reason);
    // const reasons = ["timeout", "clickaway", "undefined"];
    if (reason === "clickaway") {
      return;
    }
    dispatch({ type: Types.HIDE_SNACKBAR });
  };
  // iconMapping	{ error?: node, info?: node, success?: node, warning?: node }
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={hideIn}
      onClose={handleClose}
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
