import React, { Fragment, useState, useEffect } from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import StepConnector from "@material-ui/core/StepConnector";

import ForkAndKnife from "@material-ui/icons/LocalDining";
import ShoppingCart from "@material-ui/icons/LocalGroceryStore";
import Fridge from "@material-ui/icons/KitchenRounded";
import Ballot from "@material-ui/icons/Ballot";

// primary = 235,96,17

export const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(235,96,16) 0%,rgb(251,201,92) 50%,rgb(81,161,255) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(235,96,16) 0%,rgb(251,201,92) 50%,rgb(81,161,255) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 60,
    height: 60,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    // backgroundImage:
    // "radial-gradient(circle, rgba(235,96,16,1) 29%, #FBC95C 100%)",
    // "linear-gradient(145deg, #fb6711, #d4560e)",
    backgroundColor: "#eb6010",
    // boxShadow:
    //   "0 4px 10px 0 rgba(0,0,0,.25), inset 20px 20px 60px #c8520e, inset -20px -20px 60px #ff6e12",
    boxShadow:
      "0 4px 10px 0 rgba(0,0,0,.25), inset 20px 20px 60px #c8520e, inset -20px -20px 60px #ff6e12",
  },
  completed: {
    // backgroundImage:
    // "radial-gradient(circle, rgba(235,96,16,1) 29%, #FBC95C 100%)",
    // "linear-gradient(145deg, #fb6711, #d4560e)",
    backgroundColor: "#eb6010",
    boxShadow: "inset 20px 20px 60px #c8520e, inset -20px -20px 60px #ff6e12",
  },
});

export const ColorlibStepIcon = (props) => {
  const classes = useStyles();
  const { active, completed } = props;

  const icons = {
    1: <ForkAndKnife />,
    2: <Fridge />,
    3: <Ballot />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
};
