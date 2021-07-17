import React, { Fragment, useState, useEffect } from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import StepConnector from "@material-ui/core/StepConnector";
import ForkAndKnife from "@material-ui/icons/LocalDining";
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

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: "#ccc",
    backgroundColor: theme.palette.secondary.main,
    zIndex: 1,
    color: "#fff",
    width: 60,
    height: 60,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    // boxShadow:
    // "0 4px 10px 0 rgba(0, 0, 0,.25)",
    // "0 4px 10px 0 rgba(0,0,0,.25), inset 6px 6px 16px #ac460b, inset -6px -6px 16px #fc6611",
    background: "linear-gradient(145deg, #d4560e, #fb6711)",
    boxShadow: "6px 6px 15px #b74b0c, -6px -6px 15px #ff7514",
  },
  active: {
    backgroundColor: "#d4560e",
    // !! New one to keep for active state
    boxShadow:
      "6px 6px 15px #b74b0c, -6px -6px 15px #ff7514, inset 6px 6px 6px #ac460b, inset -6px -6px 6px #fc6611",
  },
  completed: {
    backgroundColor: " #d4560e",

    boxShadow: "inset 20px 20px 60px #ac460b, inset -20px -20px 60px #fc6611",
  },
}));

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
