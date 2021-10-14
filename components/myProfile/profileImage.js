/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState, useEffect, Fragment, forwardRef } from "react";
import AddPhotoIcon from "@material-ui/icons/AddAPhoto";
import Slide from "@material-ui/core/Slide";
import { connect, useDispatch } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import clsx from "clsx";
import * as Types from "../../stateManagement/TYPES";
import { updateProfileData } from "../../stateManagement/userActions";
import { gsap } from "gsap";

const bShadow = {
  fx: 12,
  fy: 12,
  bx: -12,
  by: -12,
  fos: 14,
  bos: 14,
}

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
    boxShadow: `${bShadow.fx}px ${bShadow.fy}px ${bShadow.fos}px ${theme.palette.grey[500]}, ${bShadow.bx}px ${bShadow.by}px ${bShadow.bos}px ${theme.palette.grey[400]}`,
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

const imageContainerId = "ProfileImageContainer"
const ProfileImage = ({
  self: { profileImgUrl, _id: userId },
  userProfile: { roundedImg: roundedImage },
  updateProfileData,
}) => {
  const classes = useClasses();
  const theme = useTheme();
  // const dispatch = useDispatch()
  const updateProfile = () => {
    updateProfileData({
      roundedImg: !roundedImage,
    });
  };
  return (
    <Slide direction="right" in={true}>
      <div className={classes.outerContainer}
        // onMouseEnter={(e) => {
        //   animateCircularImageHover(e, theme);
        // }}
        onMouseLeave={(e) => {
          animateMouseLeave(theme);
        }}
      // onMouseMove={(e) => {
      //   animateCircularImageHover(e, theme)
      // }} 
      >
        <div
          className={clsx(
            classes.profileImageContainer,
            roundedImage && classes.roundedImage
          )}
          id={imageContainerId}
          onMouseEnter={(e) => {
            animateCircularImageHover(e, theme);
          }}
          // onMouseLeave={(e) => {
          //   animateMouseLeave(theme);
          // }}
          onMouseMove={(e) => {
            animateCircularImageHover(e, theme)
          }}
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




// const bShadow = {
//   fx: 15,
//   fy: 15,
//   fos: 21,
//   bx: 15,
//   by: 15,
//   bos: 21
// }

const animateCircularImageHover = (e, theme) => {
  let rec = document.getElementById(imageContainerId).getBoundingClientRect()
  let em = {
    x: rec.left,
    y: rec.top,
    width: rec.width,
    height: rec.height,
    center: {
      x: rec.left + rec.width / 2,
      y: rec.top + rec.height / 2,
    }
  }
  let m = {
    x: e.pageX,
    y: e.pageY,
  }
  let _r = (em.width / 2 + em.height / 2) / 2
  let factor = 0.7
  let pX = (m.x - em.center.x) / _r
  let pY = (m.y - em.center.y) / _r
  const _nbs = {
    fx: 12 * (1 - pX) * factor,
    fy: 12 * (1 - pY) * factor,
    bx: -12 * (1 + pX) * factor,
    by: -12 * (1 + pY) * factor,
    fos: 14,
    bos: 14
  }

  gsap.to(`#${imageContainerId}`, {
    boxShadow: `${_nbs.fx}px ${_nbs.fy}px ${_nbs.fos}px ${theme.palette.grey[500]}, ${_nbs.bx}px ${_nbs.by}px ${_nbs.bos}px ${theme.palette.grey[400]}`,
    duration: 0.35,
    ease: "back.out(2.0)"
  })
}

const animateMouseLeave = (theme) => {
  gsap.to(`#${imageContainerId}`, {
    boxShadow: `${bShadow.fx}px ${bShadow.fy}px ${bShadow.fos}px ${theme.palette.grey[500]}, ${bShadow.bx}px ${bShadow.by}px ${bShadow.bos}px ${theme.palette.grey[400]}`,
    duration: 2.5,
    ease: "elastic.out(1.2, 0.2)"
  })
}