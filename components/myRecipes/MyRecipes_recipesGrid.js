import React, { forwardRef, useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { connect } from "react-redux";
import MyRecipes_recipeCard from "./MyRecipes_recipeCard";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    width: "calc(100% - 16px)",
    // paddingTop: "16px",
    display: "grid",
    gridColumnGap: "10px",
    gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
    marginBottom: "2rem",
    marginRight: "1rem",
    [theme.breakpoints.down(960)]: {
      width: "80vw",
      gridGap: "1rem",
      display: "grid",
      flexDirection: "column",
    },
    [theme.breakpoints.down(600)]: {
      // gridTemplateColumns: "repeat(auto-fill, minmax(100%, 1fr))",
      gridTemplateColumns: "1fr",
      width: "90vw",
      marginLeft: "5vw",
      gridGap: "1rem",
      display: "grid",
      flexDirection: "column",
    },
  },
  shiftForDrawer: {
    [theme.breakpoints.down(960)]: {
      width: "calc(80vw - 240px)",
    },
  },
}));

const MyRecipes_recipesGrid = ({
  recipes: { myRecipes },
  UI: {
    mainDrawer: { open: drawerIsOpen },
  },
  user,
  props,
}) => {
  const [shiftForDrawer, setShiftForDrawer] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    setShiftForDrawer(drawerIsOpen);
    console.log("drawerIsOpen: ", drawerIsOpen);
  }, [drawerIsOpen]);
  return (
    <div
      className={clsx(
        classes.gridContainer,
        shiftForDrawer && classes.shiftForDrawer
      )}
    >
      {myRecipes &&
        myRecipes.map((rec, i) => (
          <MyRecipes_recipeCard recipe={rec} index={i} key={rec._id} />
        ))}
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    recipes: state.recipes,
    user: state.user,
    UI: state.UI,
    props: props,
  };
};

export default connect(mapStateToProps)(MyRecipes_recipesGrid);
