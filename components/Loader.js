import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    width: "80vw",
    top: "50%",
    marginLeft: "10vw",
    overflow: "visible",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  rootCircular: {
    position: "absolute",
    width: "80vw",
    top: "50%",
    marginLeft: "10vw",
    overflow: "visible",
    display: "flex",
    justifyContent: "center",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  rootLoginScreen: {
    position: "absolute",
    width: "80vw",
    top: "50%",
    height: "120px",
    marginLeft: "10vw",
    overflow: "visible",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    "& > div": {
      position: "absolute",
    },
  },
  largeLoginScreenCircle: {},
  largeLoginScreenSvg: {},
  largeLoginScreenRoot: {},
  smallLoginScreenCircle: {},
  smallLoginScreenSvg: {},
  smallLoginScreenRoot: { marginBottom: "15px" },
  smallestLoginScreenRoot: {
    marginBottom: "15px",
    color: theme.palette.alternative.main,
  },
}));

const Loader = ({ type, size, sizeInner }) => {
  const classes = useStyles();
  switch (type) {
    case "circular":
      return (
        <div className={classes.rootCircular}>
          <CircularProgress color="secondary" size={size} />
        </div>
      );
    case "loginScreen":
      return (
        <div className={classes.rootLoginScreen}>
          <CircularProgress
            color="secondary"
            size={120}
            classes={{
              root: classes.largeLoginScreenRoot,
              svg: classes.largeLoginScreenSvg,
              circle: classes.largeLoginScreenCircle,
            }}
          />
          <CircularProgress
            color="primary"
            size={80}
            thickness={5}
            classes={{
              root: classes.smallLoginScreenRoot,
              svg: classes.smallLoginScreenSvg,
              circle: classes.smallLoginScreenCircle,
            }}
          />
          <CircularProgress
            color="primary"
            size={50}
            thickness={5}
            classes={{
              root: classes.smallestLoginScreenRoot,
              svg: classes.smallestLoginScreenSvg,
              circle: classes.smallestLoginScreenCircle,
            }}
          />
        </div>
      );
    default:
      return (
        <div className={classes.root}>
          <LinearProgress color="secondary" />
        </div>
      );
  }
};

export default Loader;
