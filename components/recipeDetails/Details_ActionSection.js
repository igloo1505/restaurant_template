/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { Fragment, useState, useEffect, forwardRef } from "react";
import { connect, useDispatch } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import * as Types from "../../stateManagement/TYPES";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
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
  actionIconDisabled: {
    // color: theme.palette.secondary.main,
    color: "rgba(235, 96, 16, 0.6)",
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
  actionIconContainerDisabled: {
    borderRadius: "50%",
    padding: "0.25rem",
    // background: "linear-gradient(145deg, #e7f8ff, #c2d1e2)",
    backgroundColor: "#a6b3c1",
    boxShadow: "4px 4px 12px #a6b3c1, -4px -4px 12px #ffffff",
    transition: theme.transitions.create(["box-shadow", "border"], {
      duration: 150,
    }),
    border: "none",
    // padding: "calc(0.25rem + 1px)",
    "&:hover": {
      cursor: "default",
      boxShadow: "4px 4px 10px #a6b3c1, -4px -4px 10px #ffffff",
      border: "none",
      // border: "1px solid rgba(255, 255, 255, 0.5)",
      transition: theme.transitions.create(["box-shadow", "border"], {
        duration: 250,
      }),
    },
  },
}));

const Details_ActionSection = ({
  props: { recipe },
  user: {
    loggedIn,
    self: { _id: userId },
  },
  recipes: { myFavorites },
  handleFavorite,
}) => {
  const dispatch = useDispatch();
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
      protected: true,
    },
    {
      name: "rateMe",
      action: () => {
        dispatch({ type: Types.SHOW_RECIPE_REVIEW_MODAL, payload: recipe });
      },
      iconTrue: RateMeIcon,
      protected: true,
    },
  ];
  const classes = useStyles();
  useEffect(() => {
    let isIncluded = myFavorites?.includes(recipe._id);
    setIsFavorited(isIncluded);
  }, [myFavorites]);

  return (
    <div className={classes.outerContainer}>
      {actionArray.map((action, i) => (
        <ActionItem
          action={action}
          key={`action-${i}`}
          classes={classes}
          isFavorited={isFavorited}
          loggedIn={loggedIn}
          userId={userId}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  recipes: state.recipes,
  user: state.user,
  props: props,
});

export default connect(mapStateToProps, { handleFavorite })(
  Details_ActionSection
);

const ActionItem = ({ action, classes, isFavorited, loggedIn, userId }) => {
  const [Icon, setIcon] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [toolTipOpen, setTooltipOpen] = useState(false);
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
  useEffect(() => {
    let shouldDisable = Boolean(loggedIn && userId);
    console.log("shouldDisable: ", shouldDisable);
    setDisabled(!shouldDisable);
  }, [loggedIn, userId]);

  const handleTooltipClose = () => {};

  const triggerToolTip = () => {
    setTooltipOpen(true);
    setTimeout(() => {
      setTooltipOpen(false);
    }, 1500);
  };

  return (
    <div>
      {Icon && (
        <div
          className={clsx(
            classes.actionIconContainer,
            disabled && classes.actionIconContainerDisabled
          )}
          onClick={() => {
            if (!disabled) {
              action.action();
            }
          }}
        >
          {action.protected ? (
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={handleTooltipClose}
              open={toolTipOpen}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title="You must be signed in to do that."
            >
              <Icon
                classes={{
                  root: clsx(
                    classes.actionIcon,
                    disabled && classes.actionIconDisabled
                  ),
                }}
                onClick={() => disabled && triggerToolTip()}
              />
            </Tooltip>
          ) : (
            <Icon
              classes={{
                root: clsx(
                  classes.actionIcon,
                  disabled && classes.actionIconDisabled
                ),
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};
