import React, { useState, useEffect, Fragment, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  container: {
    opacity: 1,
    transform: "translateX(0%)",
    transition: theme.transitions.create(["transform"], {
      duration: 500,
    }),
  },
  transformContainer: {
    transform: "translateX(-50%)",
    zIndex: -100,
    opacity: 0,
    // backgroundColor: theme.palette.secondary.main,
    transition: theme.transitions.create(["transform"], {
      duration: 500,
    }),
  },
}));

const StepTwoDisplayComponent = ({ isShifted }) => {
  const classes = useStyles();
  return (
    <div
      className={clsx(
        classes.container,
        !isShifted && classes.transformContainer
      )}
    >
      Display stuff here
    </div>
  );
};

export default StepTwoDisplayComponent;
