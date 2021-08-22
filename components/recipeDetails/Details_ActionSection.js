/* eslint-disable react/display-name */
import React, { Fragment, useState, useEffect, forwardRef } from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import BookmarkedIcon from "@material-ui/icons/BookmarkOutlined";
import NotBookmarkedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import RateMeIcon from "@material-ui/icons/ThumbsUpDown";
import FavoritedIcon from "@material-ui/icons/FavoriteSharp";
import NotFavoritedIcon from "@material-ui/icons/FavoriteBorderSharp";

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    // gap: "0.75rem",
    gap: "2rem",
    paddingBottom: "0.75rem",
    [theme.breakpoints.down(1280)]: {
      paddingBottom: "0.5rem",
    },
  },
  actionIcon: {
    color: theme.palette.secondary.main,
    margin: "0.75rem",
    borderRadius: "50%",
    height: "2.2rem",
    width: "2.2rem",
    minHeight: "2.2rem",
    minWidth: "2.2rem",
    [theme.breakpoints.down(1280)]: {
      height: "1.5rem",
      width: "1.5rem",
      minHeight: "1.5rem",
      minWidth: "1.5rem",
      margin: "0.5rem",
    },
  },
  actionIconContainer: {
    borderRadius: "50%",
    padding: "0.25rem",
    background: "linear-gradient(145deg, #e7f8ff, #c2d1e2)",
    boxShadow: "6px 6px 12px #a6b3c1, -6px -6px 12px #ffffff",
    transition: theme.transitions.create(["box-shadow", "border"], {
      duration: 150,
    }),
    border: "1px solid rgba(255, 255, 255, 0.3)",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "4px 4px 10px #a6b3c1, -4px -4px 10px #ffffff",
      border: "1px solid rgba(255, 255, 255, 0.5)",
      transition: theme.transitions.create(["box-shadow", "border"], {
        duration: 250,
      }),
    },
  },
}));

const actionArray = [
  {
    action: () => {
      console.log("Toggle favorite here.");
    },
    iconTrue: FavoritedIcon,
    iconFalse: NotFavoritedIcon,
  },
  {
    action: () => {
      console.log("Trigger rateMe modal here.");
    },
    iconTrue: RateMeIcon,
  },
];

const Details_ActionSection = ({
  props: { recipe },
  recipes: { myFavorites },
}) => {
  const classes = useStyles();

  return (
    <div className={classes.outerContainer}>
      {actionArray.map((action, i) => (
        <ActionItem action={action} key={`action-${i}`} classes={classes} />
      ))}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  recipes: state.recipes,
  props: props,
});

export default connect(mapStateToProps)(Details_ActionSection);

const ActionItem = ({ action, classes }) => {
  let Action = action.iconTrue;
  return (
    <div>
      <div className={classes.actionIconContainer} onClick={action.action}>
        <Action classes={{ root: classes.actionIcon }} />
      </div>
    </div>
  );
};
