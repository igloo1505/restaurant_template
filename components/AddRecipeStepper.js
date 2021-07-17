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
    boxShadow: "none",
    transition: theme.transitions.create(
      ["box-shadow", "transform", "background"],
      {
        duration: 500,
      }
    ),
    "&.addBoxShadow": {
      boxShadow: "6px 6px 54px #993e0a, -6px -6px 54px #ff8216",

      background: "linear-gradient(145deg, #d4560e, #fb6711)",
    },
    "& > .MuiSvgIcon-root": {
      borderBottom: "none",
      transition: theme.transitions.create(["border-bottom"], {
        duration: 500,
      }),
    },
  },
  active: {
    backgroundColor: theme.palette.secondary.main,
    boxShadow: "none",
    transition: theme.transitions.create(
      ["box-shadow", "transform", "background-color"],
      {
        duration: 500,
      }
    ),
    "&.addBoxShadow": {
      transform: "scale(1.05)",
      boxShadow: "6px 6px 15px #b74b0c, -6px -6px 15px #ff7514",
    },
    "& > .MuiSvgIcon-root": {
      content: "\\00a0",
      transition: theme.transitions.create(["border-bottom"], {
        duration: 500,
      }),
    },
  },
  completed: {
    backgroundColor: theme.palette.secondary.main,
    transition: theme.transitions.create(
      ["box-shadow", "transform", "background-color"],
      {
        duration: 500,
      }
    ),
    "&.addBoxShadow": {
      backgroundColor: theme.palette.secondary.dark,
      boxShadow: "6px 6px 54px #993e0a, -6px -6px 54px #ff8216",
    },
  },
  borderBottom: {
    borderBottom: "none",
    transition: theme.transitions.create(["background-color"], {
      duration: 300,
    }),
  },
  borderBottomActive: {
    height: "1px",
    width: "40px",
    position: "absolute",
    // top: "calc(50%)",
    transform: "translateY(14px)",
    backgroundColor: "yellow",
    transition: theme.transitions.create(["background-color"], {
      duration: 300,
    }),
  },
}));

export const ColorlibStepIcon = (props) => {
  const [iconsLifted, setIconsLifted] = useState(false);
  useEffect(() => {
    setTimeout(() => setIconsLifted(true), 1000);
  }, []);
  const classes = useStyles();
  const { active, completed } = props;
  useEffect(() => console.log("props", props));
  const icons = {
    1: <ForkAndKnife />,
    2: <Fridge />,
    3: <Ballot />,
  };

  return (
    <div
      className={clsx(classes.root, iconsLifted && "addBoxShadow", {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
      <div
        className={clsx(
          classes.borderBottom,
          active && classes.borderBottomActive
        )}
      />
    </div>
  );
};
