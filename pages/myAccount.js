import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
  UnderNavbar,
  AdjustForDrawerContainer,
} from "../components/UIComponents";
import { makeStyles } from "@material-ui/core/styles";
import { Adjust } from "@material-ui/icons";
// import { deleteRecipe } from "../stateManagement/recipeActions";
// import * as Types from "../stateManagement/TYPES";
const useStyles = makeStyles((theme) => ({
  outerContainerMyRecipe: {
    backgroundColor: "green",
    height: "100%",
    width: "100%",
  },
}));
const myAccount = ({ user, recipes, props }) => {
  return (
    <AdjustForDrawerContainer>
      <div style={{ color: "#000" }}>My account here</div>
    </AdjustForDrawerContainer>
  );
};

const mapStateToProps = (state, props) => ({
  user: state.user,
  recipes: state.recipes,
  props: props,
});

export default connect(mapStateToProps)(myAccount);
