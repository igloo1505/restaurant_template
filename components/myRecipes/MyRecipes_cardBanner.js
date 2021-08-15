import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { connect, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  outerContainer: { width: "100%", height: "200px", border: "1px solid red" },
  innerContainer: {},
}));

const MyRecipes_cardBanner = ({
  props: { cardId },
  UI: {
    viewport: { width: deviceWidth },
  },
}) => {
  const classes = useStyles();
  return (
    <div className={classes.outerContainer}>
      <div>Banner</div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  UI: state.UI,
  props: props,
});

export default connect(mapStateToProps)(MyRecipes_cardBanner);
