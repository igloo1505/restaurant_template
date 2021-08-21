import React, { Fragment, useState, useEffect } from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import StepConnector from "@material-ui/core/StepConnector";
import ForkAndKnife from "@material-ui/icons/LocalDining";
import ForkAndKnifeAlternative from "@material-ui/icons/Restaurant";
import Fridge from "@material-ui/icons/KitchenRounded";
import Ballot from "@material-ui/icons/Ballot";

// primary = 235,96,17

const useConnectorClasses = makeStyles((theme) => ({
  alternativeLabel: {
    top: 22,
  },
  root: {
    transform: "translate(-50%, 30px)",
  },
  // active: {
  //   "& $line": {
  //     background: "#fff",
  //   },
  // },
  // completed: {
  //   "& $line": {
  //     background: "#fff",
  //   },
  // },
  line: {
    height: 3,
    border: 0,
    background:
      "linear-gradient(90deg, rgba(255,255,255, 1) 0%, rgba(255,255,255, 1) 100%)",
    borderRadius: 1,
    transition: theme.transitions.create(["background"], {
      duration: 1200,
    }),
  },
}));
const addBoxShadowStyles = makeStyles((theme) => ({
  addShadowRight: {
    // background: "#fff",
    background:
      "linear-gradient(90deg, rgba(255,255,255,1) 67%, rgba(81,161,255,1) 100%)",
    transition: theme.transitions.create(["background"], {
      duration: 1200,
    }),
  },
  addShadowLeft: {
    background:
      "linear-gradient(270deg, rgba(255,255,255,1) 67%, rgba(81,161,255,1) 100%)",
    transition: theme.transitions.create(["background"], {
      duration: 1200,
    }),
  },
  addShadowBoth: {
    background:
      "linear-gradient(90deg, rgba(81,161,255,1) 0%, rgba(255,255,255,1) 50%, rgba(81,161,255,1) 100%)",
    transition: theme.transitions.create(["background"], {
      duration: 1200,
    }),
  },
}));

export const ConnectorComponent = ({
  active,
  activeStep,
  alternativeLabel,
  completed,
  disabled,
  index,
  orientation,
}) => {
  const [classes, setClasses] = useState({});
  let _rootConnectorClasses = useConnectorClasses();
  let _shadowConnectorClasses = addBoxShadowStyles();
  useEffect(() => {
    if (index === 1) {
      if (activeStep === 0) {
        let line = clsx(
          _rootConnectorClasses.line,
          _shadowConnectorClasses.addShadowLeft
        );
        let _classes = { ..._rootConnectorClasses, line: line };
        setClasses(_classes);
      }
      if (activeStep === 1) {
        let line = clsx(
          _rootConnectorClasses.line,
          _shadowConnectorClasses.addShadowBoth
        );
        let _classes = { ..._rootConnectorClasses, line: line };
        setClasses(_classes);
      }
      if (activeStep === 2) {
        let line = clsx(
          _rootConnectorClasses.line,
          _shadowConnectorClasses.addShadowBoth
        );
        let _classes = { ..._rootConnectorClasses, line: line };
        setClasses(_classes);
      }
    }
    if (index === 2) {
      if (activeStep === 0) {
        setClasses(_rootConnectorClasses);
      }
      if (activeStep === 1) {
        let line = clsx(
          _rootConnectorClasses.line,
          _shadowConnectorClasses.addShadowLeft
        );
        let _classes = { ..._rootConnectorClasses, line: line };
        setClasses(_classes);
      }
      if (activeStep === 2) {
        let line = clsx(
          _rootConnectorClasses.line,
          _shadowConnectorClasses.addShadowBoth
        );
        let _classes = { ..._rootConnectorClasses, line: line };
        setClasses(_classes);
      }
    }
  }, [activeStep]);

  return <StepConnector classes={classes} />;
};

const useStyles = makeStyles((theme) => ({
  hideBackdrop: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    backgroundColor: theme.palette.secondary.main,
    zIndex: 10,
  },
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
      // boxShadow: "6px 6px 54px #993e0a, -6px -6px 54px #ff8216",
      background: "linear-gradient(145deg, #d4560e, #fb6711)",
      boxShadow: "6px 6px 54px #783108, -6px -6px 54px #ff8f18",
      border: `1px solid ${theme.palette.secondary.light}`,
      "&:hover": {
        // transform: "scale(1.05)",
        background: "linear-gradient(145deg, #d4560e, #fb6711)",
        boxShadow: "6px 6px 54px #5e2606, -6px -6px 54px #ff9a1a",
      },
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
      boxShadow: "6px 6px 15px #b74b0c, -6px -6px 15px #ff7514",
      transform: "scale(1.05)",
      "&:hover": {
        background: "linear-gradient(145deg, #d4560e, #fb6711)",
        // boxShadow: "6px 6px 54px #5e2606, -6px -6px 54px #ff9a1a",
        boxShadow: "6px 6px 28px #b74b0c, -6px -6px 28px #ff7514 !important",
      },
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
    background: "unset",
    transition: theme.transitions.create(
      ["box-shadow", "transform", "background-color"],
      {
        duration: 500,
      }
    ),
    "&.addBoxShadow": {
      // backgroundColor: theme.palette.secondary.main,
      background: theme.palette.secondary.main,
      // boxShadow: "6px 6px 54px #993e0a, -6px -6px 54px #ff8216",
      boxShadow: "5px 5px 8px #cc540e,-5px -5px 8px #ff6c12",
      "&::after": {
        content: '""',
        position: "absolute",
        height: "55px",
        width: "55px",
        borderRadius: "50%",
        // boxShadow: "inset 5px 5px 8px #cc540e, inset -5px -5px 8px #ff6c12",
        boxShadow: "inset 3px 3px 6px #cc540e, inset -3px -3px 6px #ff6c12",
        transition: theme.transitions.create(
          ["box-shadow", "transform", "background-color"],
          {
            duration: 500,
          }
        ),
      },
      transition: theme.transitions.create(
        ["box-shadow", "transform", "background-color"],
        {
          duration: 500,
        }
      ),
      "&:hover": {
        boxShadow: "7px 7px 10px #cc540e, -7px -7px 10px #ff6c12",
        backgroundColor: theme.palette.secondary.main,
        background: theme.palette.secondary.main,
      },
    },
    // .neumorphism-3 {
    //   display: flex;
    //   justify-content: center;
    //   align-items: center;
    //   height: 250px;
    //   width: 250px;
    //   background: #dde1e7;
    //   border-radius: 50%;
    //   box-shadow: -3px -3px 7px #ffffffa6, 3px 3px 5px rgba(94, 104, 121, 0.712);
    //   position: relative;
    // }
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

export const StepIconComponent = (props) => {
  let { active, completed, activeStep, index } = props;
  if (activeStep > index) {
    completed = true;
  }
  const [iconsLifted, setIconsLifted] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  useEffect(() => {
    if (initialRender) {
      setIconsLifted(false);
      initialRender && setInitialRender(false);
      let timeOut = 1200 + 250 * index;
      let _timeOut = 1300 + 250 * index;
      if (index >= activeStep) setTimeout(() => setIconsLifted(true), timeOut);
      if (!active) {
        setTimeout(() => setIconsLifted(false), _timeOut);
      }
    }
  }, []);
  useEffect(() => {
    if (!initialRender) {
      setIconsLifted(false);
      let timeOut = 250 * index;
      let _timeOut = 200 + 250 * index;
      if (active || completed) setTimeout(() => setIconsLifted(true), timeOut);
    }
  }, [activeStep]);
  const classes = useStyles();
  const icons = {
    // 1: <ForkAndKnife />,
    1: <ForkAndKnifeAlternative />,
    2: <Fridge />,
    3: <Ballot />,
  };

  return (
    <div className={classes.hideBackdrop}>
      <div
        className={clsx(classes.root, iconsLifted && "addBoxShadow", {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    </div>
  );
};
