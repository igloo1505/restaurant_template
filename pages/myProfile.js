/* eslint-disable react/display-name */
import React, { useState, useEffect, forwardRef } from "react";
import { connect, useDispatch } from "react-redux";
import { wrapper } from "../stateManagement/store";
import Cookies from "cookies";
import mongoose from "mongoose";
import User from "../models/User";
import { AdjustForDrawerContainer } from "../components/UIComponents";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { connectDB } from "../util/connectDB";
import * as Types from "../stateManagement/TYPES";
import { autoLoginOnFirstRequest } from "../util/autoLoginOnFirstRequest";
import ProfileImage from "../components/myProfile/profileImage";
import MyProfile_primaryInfo from "../components/myProfile/myProfile_primaryInfo";
import MyProfile_aboutMe from "../components/myProfile/myProfile_aboutMe";

const useProfileStyles = makeStyles((theme) => ({
  myProfileContainer: {
    width: "min(1080px, 90vw)",
    marginLeft: "50%",
    transform: "translateX(-50%)",
    height: "100%",
  },
  myProfileTopContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    // justifyContent: "space-between",
  },
  aboutMeContainer: {
    margin: "1rem",
  },
}));

const myProfile = ({
  props: { hasUser },
  user: {
    loggedIn,
    self: { _id },
  },
}) => {
  const classes = useProfileStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    if (hasUser && Boolean(!loggedIn || !_id)) {
      dispatch({
        type: Types.AUTO_LOGIN_SUCCESS,
        payload: hasUser,
      });
    }
  }, [hasUser]);
  return (
    <AdjustForDrawerContainer centerAll={false}>
      <div className={classes.myProfileContainer}>
        <div className={classes.myProfileTopContainer}>
          <ProfileImage />
          <MyProfile_primaryInfo />
        </div>
        <div className={classes.aboutMeContainer}>
          <MyProfile_aboutMe />
        </div>
      </div>
    </AdjustForDrawerContainer>
  );
};

const mapStateToProps = (state, props) => ({
  user: state.user,
  props: props,
});

export default connect(mapStateToProps)(myProfile);

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      let state = store.getState();
      console.log("req: ", req);
      // TODO add auth to this route to make sure only user that owns this profile can access this page.
      let cookies = new Cookies(req, res);
      let hasUser = false;
      let token = cookies.get("token") || state?.user?.self?.token;
      let userId = cookies.get("userId") || state?.user?.self?._id;
      let rememberMe = cookies.get("rememberMe");
      console.log("rememberMe: ", rememberMe);
      console.log("userId: ", userId);

      let isInState = Boolean(
        state?.user?.self?._id && state?.user?.self?.token
      );
      if (Boolean(!userId || !token) && !isInState) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
      if (Boolean(userId && token) && !isInState) {
        console.log("userId && token: ", userId, token, rememberMe);
        if (rememberMe) {
          hasUser = await autoLoginOnFirstRequest(req, res);
          if (!hasUser) {
            return {
              redirect: {
                destination: "/",
                permanent: false,
              },
            };
          }
          console.log("hasUser: ", hasUser);
        }
        return {
          props: {
            hasUser: hasUser,
          },
        };
      }
    }
);
