import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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

const UnderNavbar = ({
  viewport: { navHeight },
  props: { withMargin },
  drawerIsOpen,
}) => {
  const [shifted, setShifted] = useState(false);
  const classes = useStyles();
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
const mapStateToProps = (state, props) => ({
  viewport: state.UI.viewport,
  drawerIsOpen: state.UI.portalDrawer.open,
  props: props,
});

export default connect(mapStateToProps)(UnderNavbar);
