import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStylesUnderNavbar = makeStyles((theme) => ({
  root: {
    position: "absolute",
    width: "100%",
    marginBottom: "20px",
    marginTop: "20px",
    display: "block",
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

const marginHorizontal = "24px";
const marginVertical = "24px";

const useStylesAdjustForDrawer = makeStyles((theme) => ({
  root: {
    display: "block",
    width: "100vw",
    paddingRight: marginHorizontal,
    paddingLeft: marginHorizontal,
    paddingTop: marginVertical,
    transition: theme.transitions.create(["margin-left", "width"], {
      duration: 500,
    }),
  },
  shifted: {
    width: `calc(100vw - ${drawerWidth}px)`,
    display: "block",
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin-left", "width"], {
      duration: 500,
    }),
  },
}));

const AdjustForDrawerContainerComponent = ({
  UI: {
    portalDrawer: { open: drawerIsOpen },
    viewport: { navHeight, width: deviceWidth },
  },
  props: { children, centerAll },
}) => {
  const classes = useStylesAdjustForDrawer();
  const [shifted, setShifted] = useState(deviceWidth > 1920);
  const [styles, setStyles] = useState({});
  useEffect(() => {
    // console.log(centerAll);
    let shouldShift = drawerIsOpen
      ? drawerIsOpen
      : deviceWidth > 1920
      ? true
      : false;
    setShifted(shouldShift);
    getStyles();
  }, [drawerIsOpen, navHeight, deviceWidth]);

  const getStyles = () => {
    setStyles({ marginTop: `${navHeight}px` });
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

const useGridStyles = makeStyles((theme) => ({
  columnTwelve: {
    width: "100%",
    padding: "0px 12px",
    border: "1px solid red",
    display: "inline-block",
  },
  columnSix: {
    width: "50%",
    border: "1px solid red",
  },
}));

const GridItemComponent = ({ columns, children }) => {
  const classes = useGridStyles();
  switch (columns) {
    case 12:
      return <div className={classes.columnTwelve}>{children}</div>;
    default:
      return <div className={classes.columnTwelve}>{children}</div>;
  }
};

export const GridItem = GridItemComponent;
