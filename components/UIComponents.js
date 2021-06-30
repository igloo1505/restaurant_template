import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStylesUnderNavbar = makeStyles((theme) => ({
  root: {
    position: "absolute",
    border: "3px solid red",
    width: "100%",
    marginBottom: "20px",
  },
  shifted: {
    width: `calc(100vw - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
  },
}));

const UnderNavbarComponent = ({
  viewport: { navHeight },
  props: { withMargin },
  drawerIsOpen,
}) => {
  const [shifted, setShifted] = useState(false);
  const classes = useStylesUnderNavbar();
  useEffect(() => {
    setShifted(drawerIsOpen);
  }, [drawerIsOpen]);
  let style = {
    height: `${navHeight}px`,
    ...(withMargin && { marginBottom: `${withMargin}px` }),
  };
  return (
    <div
      className={clsx(classes.root, shifted && classes.shifted)}
      style={style}
    ></div>
  );
};
const mapStateToPropsUnderNavbar = (state, props) => ({
  viewport: state.UI.viewport,
  drawerIsOpen: state.UI.portalDrawer.open,
  props: props,
});

export const UnderNavbar = connect(mapStateToPropsUnderNavbar)(
  UnderNavbarComponent
);

const paddingHorizontal = "24px";
const useStylesAdjustForDrawer = makeStyles((theme) => ({
  root: {
    width: "100vw",
    // border: "4px solid red",
    paddingRight: paddingHorizontal,
    paddingLeft: paddingHorizontal,
    transition: "margin-left 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    transition: "width 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  shifted: {
    width: `calc(100vw - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: "margin-left 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    transition: "width 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
}));

const AdjustForDrawerContainerComponent = ({
  UI: {
    portalDrawer: { open: drawerIsOpen },
    viewport: { navHeight },
  },
  props: { children, centerAll },
}) => {
  const classes = useStylesAdjustForDrawer();
  const [shifted, setShifted] = useState(false);
  const [styles, setStyles] = useState({});
  useEffect(() => {
    setShifted(drawerIsOpen);
  }, [drawerIsOpen, navHeight]);
  //   const style = {
  //     position: "absolute",
  //     top: `${navHeight}px`,
  //   };
  const getStyles = () => {
    if (centerAll) {
      setStyles({
        ...styles,
        display: "flex",
        width: "100vw",
        height: `calc(100vh-${navHeight}px)`,
        justifyContent: "center",
        alignItems: "center",
      });
    }
    if (drawerIsOpen) {
      setStyles({
        ...styles,
        transform: `translateX(-${drawerWidth * 0.5}px)`,
      });
    }
  };
  return (
    <div
      className={clsx(classes.root, shifted && classes.shifted)}
      style={styles}
    >
      {children}
    </div>
  );
};

const mapStateToPropsAdjustForDrawer = (state, props) => ({
  UI: state.UI,
  props: props,
});

export const AdjustForDrawerContainer = connect(mapStateToPropsAdjustForDrawer)(
  AdjustForDrawerContainerComponent
);
