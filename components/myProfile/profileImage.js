/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState, useEffect, Fragment, forwardRef } from "react";
import AddPhotoIcon from "@material-ui/icons/AddAPhoto";
import Slide from "@material-ui/core/Slide";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import clsx from "clsx";
import * as Types from "../../stateManagement/TYPES";
import { updateProfileData } from "../../stateManagement/userActions";

const useClasses = makeStyles((theme) => ({
  profileImageContainer: {
    height: "200px",
    width: "200px",
    minHeight: "200px",
    minWidth: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(145deg, #fb6711, #d4560e)",
    boxShadow: `4px 4px 24px ${theme.palette.grey[400]}, -4px -4px 24px ${theme.palette.grey[300]}`,
    borderRadius: "4px",
    // width: "100%",
    // paddingTop: "100%",
    transition: theme.transitions.create(["border-radius"], {
      duration: 500,
    }),
  },
  roundedImage: {
    borderRadius: "50%",
  },
  outerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: "1rem",
  },
}));

const ProfileImage = ({
  self: { profileImgUrl, _id: userId },
  userProfile: { roundedImg: roundedImage },
  updateProfileData,
}) => {
  const classes = useClasses();
  // const dispatch = useDispatch()
  const updateProfile = () => {
    updateProfileData({
      roundedImg: !roundedImage,
    });
  };
  return (
    <Slide direction="right" in={true}>
      <div className={classes.outerContainer}>
        <div
          className={clsx(
            classes.profileImageContainer,
            roundedImage && classes.roundedImage
          )}
        >
          {profileImgUrl ? (
            <UserProfileImage
              userId={userId}
              imgUrl={profileImgUrl}
              roundedImage={roundedImage}
            />
          ) : (
            <UserNoImage userId={userId} />
          )}
        </div>
        {profileImgUrl && (
          <FormControlLabel
            control={
              <Switch
                checked={roundedImage}
                onChange={updateProfile}
                name="roundedImage"
              />
            }
            label="Rounded Image"
          />
        )}
      </div>
    </Slide>
  );
};

const mapStateToProps = (state, props) => ({
  self: state.user.self,
  userProfile: state.userProfile,
  props: props,
});

export default connect(mapStateToProps, { updateProfileData })(ProfileImage);

const useImageClasses = makeStyles((theme) => ({
  image: {
    width: "90%",
    height: "90%",
    // borderRadius: "50%",
    borderRadius: "4px",
    transition: theme.transitions.create(["border-radius"], {
      duration: 500,
    }),
  },
  roundedImage: {
    borderRadius: "50%",
  },
}));

const UserProfileImage = ({ imgUrl, roundedImage }) => {
  const imageClasses = useImageClasses();
  return (
    <Fragment>
      <img
        src={imgUrl}
        alt={"Profile Image"}
        className={clsx(
          imageClasses.image,
          roundedImage && imageClasses.roundedImage
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
