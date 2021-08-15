import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { connect, useDispatch } from "react-redux";
import AddPhotoIcon from "@material-ui/icons/AddAPhoto";

const useStyles = makeStyles((theme) => ({
  outerContainer: { width: "100%", height: "200px" },
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
    background: "#ecf0f3",
    boxShadow: "12px 12px 24px #c9cccf, -12px -12px 24px #ffffff",
    transition: theme.transitions.create(["box-shadow"], { duration: 350 }),
    "&:hover": {
      cursor: "pointer",
      boxShadow: "9px 9px 18px #c9cccf, -9px -9px 18px #ffffff",
    },
  },
}));

const MyRecipes_cardBanner = ({
  props: { cardId, recipe },
  UI: {
    viewport: { width: deviceWidth },
  },
}) => {
  const classes = useStyles();
  return (
    <div className={classes.outerContainer}>
      {recipe.imgUrl ? (
        <BannerImage classes={classes} recipe={recipe} />
      ) : (
        <BannerAddImage classes={classes} recipe={recipe} />
      )}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  UI: state.UI,
  props: props,
});

export default connect(mapStateToProps)(MyRecipes_cardBanner);

const BannerAddImage = ({ classes, recipe }) => {
  const [addBoxShadow, setAddBoxShadow] = useState(true);
  return (
    <div className={classes.addImageBanner}>
      <div
        className={clsx(
          classes.addImageIconWrapper,
          addBoxShadow && classes.addBoxShadow
        )}
      >
        <AddPhotoIcon className={classes.addPhotoIcon} />
      </div>
    </div>
  );
};
const BannerImage = ({ classes, recipe }) => {
  return <div></div>;
};
