import React, { Fragment, useState, useEffect } from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import StepConnector from "@material-ui/core/StepConnector";
import ForkAndKnife from "@material-ui/icons/LocalDining";
import Fridge from "@material-ui/icons/KitchenRounded";
import Ballot from "@material-ui/icons/Ballot";

// primary = 235,96,17

export const ColorlibConnector = withStyles((theme) => ({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      background: "#fff",
      transition: theme.transitions.create(["background"], { duration: 500 }),
    },
  },
  completed: {
    "& $line": {
      background: "#fff",
      transition: theme.transitions.create(["background"], { duration: 500 }),
    },
  },
  line: {
    height: 3,
    border: 0,
    background: "#e0e0e0",
    borderRadius: 1,
    transition: theme.transitions.create(["background"], { duration: 500 }),
  },
}))(StepConnector);

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    zIndex: 1,
    color: "#fff",
    width: 60,
    height: 60,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(145deg, #d4560e, #fb6711)",
    boxShadow: "6px 6px 15px #b74b0c, -6px -6px 15px #ff7514",
    transition: theme.transitions.create(["box-shadow", "transform"], {
      duration: 500,
    }),
  },
  active: {
    backgroundColor: theme.palette.secondary.dark,
    boxShadow: "6px 6px 54px #993e0a, -6px -6px 54px #ff8216",
    transform: "translateY(-10px)",
    transition: theme.transitions.create(["box-shadow", "transform"], {
      duration: 500,
    }),
  },
  completed: {
    backgroundColor: theme.palette.secondary.dark,
    transition: theme.transitions.create(["box-shadow", "transform"], {
      duration: 500,
    }),
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
