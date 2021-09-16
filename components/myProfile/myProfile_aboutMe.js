import React, { useState, useEffect, forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import { connect, useDispatch } from "react-redux";
import { updateProfileData } from "../../stateManagement/userActions";
import MyProfile_fullScreenDialog from "./myProfile_fullScreenDialog";
import * as Types from "../../stateManagement/TYPES";

const myProfile_aboutMe = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof window !== undefined) {
      document.addEventListener("click", (e) => {
        console.log("Running dispatch to dialog");
        dispatch({
          type: Types.SET_ABOUTME_DIALOG,
          payload: true,
        });
      });
    }
  }, []);
  return (
    <div>
      <MyProfile_fullScreenDialog />
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  profile: state.userProfile,
  props: props,
});

export default connect(mapStateToProps, { updateProfileData })(
  myProfile_aboutMe
);
