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
    borderRadius: "50% !important",
  },
  profileImageContainer: {
    height: "200px",
    width: "200px",
    minHeight: "200px",
    minWidth: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(145deg, #fb6711, #d4560e)",
    borderRadius: "4px",
    // width: "100%",
    // paddingTop: "100%",
    transition: theme.transitions.create(["border-radius"], {
      duration: 500,
    }),
  },
  outerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: "1rem",
  },
  addBoxShadow: {
    boxShadow: `4px 4px 12px ${theme.palette.grey[400]}, -4px -4px 12px ${theme.palette.grey[300]}`,
    // boxShadow: `6px 6px 12px ${theme.palette.grey[400]}, -6px 6px 12px ${theme.palette.grey[300]}`,
  },
}));

const userImage = ({ roundedImg, profileImgUrl }) => {
  const classes = useClasses();
  const [addBoxShadow, setAddBoxShadow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAddBoxShadow(true);
    }, 300);
  }, []);

  return (
    <Slide in={true} direction="right">
      <div>
        <div
          className={clsx(
            classes.profileImageContainer,
            roundedImg && classes.roundedImage,
            addBoxShadow && classes.addBoxShadow
          )}
        >
          <img
            src={profileImgUrl}
            alt={"Profile Image"}
            className={clsx(
              classes.image,
              roundedImg && classes.roundedImage
              // fadeIn && imageClasses.imageIn
            )}
          />
        </div>
      </div>
    </Slide>
  );
};

export default userImage;
