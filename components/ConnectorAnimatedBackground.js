import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  container: {
    height: "50px",
    position: "absolute",
    width: "100%",
    marginLeft: `-50%`,
    // right: "calc(50% + 20px)",
    zIndex: 9999,
    border: "1px solid red",
    backgroundColor: "rgba(0,0,255, 0.3)",
  },
}));
const getOffset = (el) => {
  var x = 0;
  var y = 0;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    x += el.offsetLeft - el.scrollLeft;
    y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return { top: y, left: x };
};

const ConnectorAnimatedBackground = ({ activeStep, children }) => {
  const [dimensions, setDimensions] = useState({});
  useEffect(() => {
    if (typeof window !== "undefined") {
      let ems = document.querySelectorAll(
        "span.MuiStepLabel-iconContainer.MuiStepLabel-alternativeLabel"
      );
      if (ems) {
        // let leftSide = getComputedStyle(ems[0]);
        let left = getOffset(ems[0]).left;
        let top = getOffset(ems[0]).top;
        let topMaybe = ems[0].scrollTop;
        let right = getOffset(ems[2]).left + 60;
        // let rightSide = getComputedStyle(ems[2]);
        console.log("top, topMaybe", top, topMaybe);
        // setDimensions({ top: `calc(${topMaybe}px )` });
      }
    }
  }, []);
  const classes = useStyles();
  return (
    <div className={classes.container} style={dimensions}>
      {children}
    </div>
  );
};

export default ConnectorAnimatedBackground;
