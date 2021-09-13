/* eslint-disable react/display-name */
import React, { useState, useEffect, forwardRef } from "react";
import { connect, useDispatch } from "react-redux";
import { wrapper } from "../stateManagement/store";
import Cookies from "cookies";
import mongoose from "mongoose";
import User from "../models/User";
import { AdjustForDrawerContainer } from "../components/UIComponents";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import clsx from "clsx";
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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      let state = store.getState();
      console.log("req: ", req);
      let cookies = new Cookies(req, res);
      let hasUser = false;
      let token = cookies.get("token") || state?.user?.self?.token;
      let userId = cookies.get("userId") || state?.user?.self?._id;
      let rememberMe = cookies.get("rememberMe");
      console.log("rememberMe: ", rememberMe);
      console.log("userId: ", userId);
      state.user.self._id;
      if (!userId || !token) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
      if (userId && token) {
        console.log("userId && token: ", userId, token, rememberMe);
        // connectDB().then(async (client) => {
        if (rememberMe) {
          hasUser = await autoLoginOnFirstRequest(req, res);
          console.log("hasUser: ", hasUser);
        }
        // console.log("client: ", client);
        // console.log("ingredients: ", ingredients);
        // let recipes = await mongoose
        //   .connect(process.env.MONGO_URI, {
        //     useNewUrlParser: true,
        //     useCreateIndex: true,
        //     useFindAndModify: false,
        //     useUnifiedTopology: true,
        //   })
        //   .then(async () => {
        //     let _user = await User.findById(userId)
        //     console.log("recipes: ", _recipes);
        //     // BUG An apparently pretty well known issue with mongo and getServerSideProps causing serialization errors. Come back to this and see if can figure out a hack later.
        //     // });
        //     return _recipes;
        //   });
        return {
          props: {
            hasUser: hasUser,
          },
        };
      }
    }
);
