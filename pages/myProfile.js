/* eslint-disable react/display-name */
import React, { useState, useEffect, forwardRef } from "react";
import { connect, useDispatch } from "react-redux";
import { wrapper } from "../stateManagement/store";
import Cookies from "cookies";
import mongoose from "mongoose";
import Recipe from "../models/Recipe";
import User from "../models/User";
import { AdjustForDrawerContainer } from "../components/UIComponents";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import MyRecipes_leftSection from "../components/myRecipes/MyRecipes_leftSection";
import MyRecipes_rightSection from "../components/myRecipes/MyRecipes_rightSection";
import { connectDB } from "../util/connectDB";
import * as Types from "../stateManagement/TYPES";
import { autoLoginOnFirstRequest } from "../util/autoLoginOnFirstRequest";
import ProfileImage from "../components/myProfile/profileImage";

const useProfileStyles = makeStyles((theme) => ({
  myProfileContainer: {
    width: "min(1080px, 90vw)",
    marginLeft: "50%",
    transform: "translateX(-50%)",
    height: "100%",
  },
}));

const myProfile = () => {
  const classes = useProfileStyles();
  return (
    <AdjustForDrawerContainer centerAll={false}>
      <div className={classes.myProfileContainer}>
        <ProfileImage />
        <div>Profile page here</div>
      </div>
    </AdjustForDrawerContainer>
  );
};

export default myProfile;
