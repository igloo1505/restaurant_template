/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState, useEffect, Fragment, forwardRef } from "react";
import AddPhotoIcon from "@material-ui/icons/AddAPhoto";
import Slide from "@material-ui/core/Slide";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import * as Types from "../../stateManagement/TYPES";

const useClasses = makeStyles((theme) => ({
  profileImageContainer: {
    height: "200px",
    width: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    // border: `1px solid ${theme.palette.secondary.light}`,
    // background: "linear-gradient(145deg, #f0f0f0, #cacaca)",
    // boxShadow: "6px 6px 54px #783108, -6px -6px 54px #ff8f18",
    // background: "linear-gradient(145deg, #d4560e, #fb6711)",
    background: "linear-gradient(145deg, #fb6711, #d4560e)",
    boxShadow: `4px 4px 24px ${theme.palette.grey[400]}, -4px -4px 24px ${theme.palette.grey[300]}`,
    // boxShadow: "20px 20px 60px #bebebe, -20px -20px 60px #ffffff",
  },
}));

const ProfileImage = ({ self: { profileImgUrl, _id: userId } }, ref) => {
  const classes = useClasses();
  return (
    <Slide direction="right" in={true}>
      <div>
        <div className={classes.profileImageContainer}>
          {profileImgUrl ? (
            <UserProfileImage userId={userId} imgUrl={profileImgUrl} />
          ) : (
            <UserNoImage userId={userId} />
          )}
        </div>
      </div>
    </Slide>
  );
};

const mapStateToProps = (state, props) => ({
  self: state.user.self,
  props: props,
});

export default connect(mapStateToProps)(ProfileImage);

const useImageClasses = makeStyles((theme) => ({
  image: {
    width: "90%",
    height: "90%",
    borderRadius: "50%",
  },
  imageRounded: {
    borderRadius: "50%",
  },
}));

const UserProfileImage = ({ imgUrl }) => {
  const imageClasses = useImageClasses();
  return (
    <Fragment>
      <img
        src={imgUrl}
        alt={"Profile Image"}
        className={clsx(
          imageClasses.image
          // fadeIn && imageClasses.imageIn
        )}
      />
    </Fragment>
  );
};

const useNoImageClasses = makeStyles((theme) => ({
  noImageContainer: {
    width: "40%",
    height: "40%",
    maxHeight: "50px",
    maxWidth: "50px",
    color: "#fff",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const UserNoImage = ({ userId }) => {
  const classes = useNoImageClasses();
  const dispatch = useDispatch();
  const launchAddImageModal = () => {
    dispatch({
      type: Types.SHOW_ADD_PROFILE_IMAGE_MODAL,
      payload: {
        userId: userId,
      },
    });
  };
  return (
    <Fragment>
      <AddPhotoIcon
        className={classes.noImageContainer}
        onClick={launchAddImageModal}
      />
    </Fragment>
  );
};
