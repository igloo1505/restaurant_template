/* eslint-disable react/display-name */
import React, { useState, useEffect, forwardRef } from "react";
import { connect, useDispatch } from "react-redux";
import { wrapper } from "../stateManagement/store";
import Cookies from "cookies";
import mongoose from "mongoose";
import Recipe from "../models/Recipe";
import User from "../models/User";
// import Ingredient from "../models/Ingredient";
import {
  UnderNavbar,
  AdjustForDrawerContainer,
} from "../components/UIComponents";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import MyRecipes_leftSection from "../components/myRecipes/MyRecipes_leftSection";
import MyRecipes_rightSection from "../components/myRecipes/MyRecipes_rightSection";
import { connectDB } from "../util/connectDB";
import * as Types from "../stateManagement/TYPES";
// mongoose.set("bufferCommands", false);
// import { deleteRecipe } from "../stateManagement/recipeActions";
// import * as Types from "../stateManagement/TYPES";

const editRecipe = () => {
  return (
    <div>
      <AdjustForDrawerContainer>
        <div>Welp...</div>
      </AdjustForDrawerContainer>
    </div>
  );
};

export default editRecipe;
