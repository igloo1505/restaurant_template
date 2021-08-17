import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import getConfig from "next/config";
import Image from "next/image";
import Grow from "@material-ui/core/Grow";
import clsx from "clsx";
import { connect, useDispatch } from "react-redux";
import * as Types from "../../stateManagement/TYPES";
import AddPhotoIcon from "@material-ui/icons/AddAPhoto";

const useStyles = makeStyles((theme) => ({
  outerContainer: { width: "100%", height: "200px", maxHeight: "200px" },
  innerContainer: {},
  addPhotoIcon: {
    color: theme.palette.secondary.dark,
    height: "30px",
    minHeight: "30px",
    width: "30px",
    minWidth: "30px",
    "& > path": {
      height: "30px",
      padding: "10px",
      minHeight: "30px",
      width: "30px",
      minWidth: "30px",
    },
  },
  addImageIconWrapper: {
    // border: "1px solid red",
    padding: "16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
    height: "80px",
    width: "80px",
  },
  addImageBanner: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  addBoxShadow: {
    borderRadius: "30px",
    background: "linear-gradient(145deg, #fdffff, #d4d8db)",
    boxShadow: "12px 12px 24px #a8aaad, -12px -12px 24px #ffffff",
    transition: theme.transitions.create(["box-shadow"], { duration: 350 }),
    "&:hover": {
      cursor: "pointer",
      boxShadow: "9px 9px 18px #a8aaad, -9px -9px 18px #ffffff",
    },
  },
}));

const MyRecipes_cardBanner = ({
  props: { cardId, recipe, bannerIn, setBannerIn },
  UI: {
    viewport: { width: deviceWidth },
  },
}) => {
  const dispatch = useDispatch();
  const triggerAddImageModal = () => {
    dispatch({
      type: Types.SHOW_ADD_IMAGE_MODAL,
      payload: { recipeId: recipe._id },
    });
  };
  const classes = useStyles();
  return (
    <div className={classes.outerContainer}>
      {recipe.imgUrl ? (
        <BannerImage classes={classes} url={recipe.imgUrl} recipe={recipe} />
      ) : (
        <BannerAddImage
          classes={classes}
          recipe={recipe}
          triggerAddImageModal={triggerAddImageModal}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  UI: state.UI,
  props: props,
});

export default connect(mapStateToProps)(MyRecipes_cardBanner);

const BannerAddImage = ({ classes, recipe, triggerAddImageModal }) => {
  const [addBoxShadow, setAddBoxShadow] = useState(true);
  return (
    <div className={classes.addImageBanner}>
      <div
        className={clsx(
          classes.addImageIconWrapper,
          addBoxShadow && classes.addBoxShadow
        )}
        onClick={triggerAddImageModal}
      >
        <AddPhotoIcon className={classes.addPhotoIcon} />
      </div>
    </div>
  );
};
const useImageClasses = makeStyles((theme) => ({
  outerContainer: {
    maxWidth: "100%",
    maxHeight: "100%",
    // objectFit: "contain",
    // objectFit: "cover",
    objectFit: "contain",
    overflow: "hidden",
  },
  innerContainer: {
    maxWidth: "100%",
    maxHeight: "100%",
    // objectFit: "contain",
    objectFit: "cover",
    overflow: "hidden",
  },
  image: {
    maxWidth: "100%",
    width: "100%",
    maxHeight: "200px",
    // opacity: 0,
    // textAlign: "center",
    // objectFit: "contain",
    objectFit: "cover",
    overflow: "hidden",
    // transform: "translateY(-50%)",
    verticalAlign: "middle",
    // transition: theme.transitions.create(["opacity"], { duration: 1000 }),
  },
  imageIn: {
    opacity: 1,
    // transition: theme.transitions.create(["opacity"], { duration: 1000 }),
  },
}));

const BannerImage = ({ classes, recipe, url }) => {
  const { publicRuntimeConfig } = getConfig();
  // console.log("rootUrl: ", publicRuntimeConfig.rootUrl, url);
  const [fadeIn, setFadeIn] = useState(true);
  // TODO needs major image optimization work.
  // useEffect(() => {
  //   // TODO definitely remove delay after debugged.
  //   // setTimeout(() => {
  //   setFadeIn(true);
  //   // }, 300);
  // }, []);
  const imageClasses = useImageClasses();
  return (
    <div className={imageClasses.outerContainer}>
      <div className={imageClasses.innerContainer}>
        <img
          src={url}
          alt={"Recipe Image"}
          className={clsx(imageClasses.image, fadeIn && imageClasses.imageIn)}
        />
      </div>
    </div>
  );
};
