import React, { useState, useEffect, Fragment } from "react";
import AddPhotoIcon from "@material-ui/icons/AddAPhoto";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
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

const profileImage = ({ self: { profileImgUrl, _id: userId } }) => {
  const classes = useClasses();
  return (
    <div>
      <div className={classes.profileImageContainer}>
        {profileImgUrl ? (
          <UserProfileImage userId={userId} />
        ) : (
          <UserNoImage userId={userId} />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  self: state.user.self,
  props: props,
});

export default connect(mapStateToProps)(profileImage);

const UserProfileImage = () => {
  return <div> user image here</div>;
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
