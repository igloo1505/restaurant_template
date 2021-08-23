/* eslint-disable react/prop-types */
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
import { handleFavorite } from "../../stateManagement/recipeActions";

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    // gap: "0.75rem",
    gap: "2rem",
    marginTop: "1rem",
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

const Details_ActionSection = ({
  props: { recipe },
  recipes: { myFavorites },
  handleFavorite,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const actionArray = [
    {
      name: "favorite",
      action: (fav) => {
        handleFavorite({
          recipeId: recipe._id,
          method: isFavorited ? "remove" : "add",
        });
      },
      iconTrue: FavoritedIcon,
      iconFalse: NotFavoritedIcon,
    },
    {
      name: "rateMe",
      action: () => {
        console.log("Trigger rateMe modal here.");
      },
      iconTrue: RateMeIcon,
    },
  ];
  const classes = useStyles();
  useEffect(() => {
    setIsFavorited(Boolean(myFavorites?.includes(recipe._id)));
  }, [myFavorites]);
  return (
    <div className={classes.outerContainer}>
      {actionArray.map((action, i) => (
        <ActionItem
          action={action}
          key={`action-${i}`}
          classes={classes}
          isFavorited={isFavorited}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  recipes: state.recipes,
  props: props,
});

export default connect(mapStateToProps, { handleFavorite })(
  Details_ActionSection
);

const ActionItem = ({ action, classes, isFavorited }) => {
  const [Icon, setIcon] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    let Action;
    if (action.name === "rateMe") {
      Action = action.iconTrue;
    }
    if (action.name === "favorite") {
      Action = isFavorited ? action.iconTrue : action.iconFalse;
      console.log("isFavorited: ", isFavorited);
    }
    setIcon(Action);
  }, [isFavorited]);
  return (
    <div>
      <div
        className={classes.actionIconContainer}
        onClick={() => action.action()}
      >
        {Icon && <Icon classes={{ root: classes.actionIcon }} />}
      </div>
    </div>
  );
};
