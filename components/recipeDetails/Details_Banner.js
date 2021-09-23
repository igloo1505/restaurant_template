/* eslint-disable react/display-name */
import React, { Fragment, useState, useEffect, forwardRef } from "react";
import { connect, useDispatch } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { getFormattedTimeIndividual } from "../../util/getFormattedTime";
import { handleBookmark } from "../../stateManagement/recipeActions";
import BookmarkedIcon from "@material-ui/icons/Bookmark";
// import BookmarkedIcon from "@material-ui/icons/BookmarkOutlined";
import NotBookmarkedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import Details_ActionSection from "./Details_ActionSection";
import styles from "./DetailsBanner.module.scss";

const Details_Banner = ({
  recipe,
  recipes: { myBookmarks },
  user: {
    loggedIn,
    self: { _id: userId },
  },
  UI: {
    viewport: { width: deviceWidth, height: deviceHeight },
  },
  handleBookmark,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    let shouldDisable = Boolean(loggedIn && userId);
    setDisabled(!shouldDisable);
  }, [loggedIn, userId]);
  useEffect(() => {
    console.log("myBookmarks: ", myBookmarks);
    let shouldSet = true;
    if (myBookmarks) {
      myBookmarks.forEach((bookmark) => {
        if (bookmark._id === recipe._id) {
          shouldSet = false;
          return setIsBookmarked(true);
        }
      });
      shouldSet && setIsBookmarked(false);
    }
  }, [myBookmarks]);

  const [detailsHeight, setDetailsHeight] = useState({});
  const [minutesPadding, setMinutesPadding] = useState({
    prepTime: { paddingLeft: "0.5rem" },
    cookTime: { paddingLeft: "0.5rem" },
  });
  useEffect(() => {
    if (deviceWidth > 850) {
      let parentHeight = document
        .getElementById("recipe-banner")
        .getBoundingClientRect().height;
      let _padding = 0.75;
      setDetailsHeight({
        height: `${parentHeight - (16 + 32 * _padding)}px`,
      });
    }
  }, [deviceWidth]);
  const formattedTime = getFormattedTimeIndividual(recipe);

  useEffect(() => {
    let newPadding = {
      prepTime: {},
      cookTime: {},
    };
    // if (!formattedTime?.prepTime?.hours) {
    //   newPadding.prepTime = {
    //     paddingLeft: "2.75rem",
    //   };
    // }
    // if (!formattedTime?.cookTime?.hours) {
    //   newPadding.cookTime = {
    //     paddingLeft: "2.75rem",
    //   };
    // }
    if (formattedTime?.prepTime?.hours) {
      newPadding.prepTime = {
        paddingLeft: "0.5rem",
      };
    }
    if (formattedTime?.cookTime?.hours) {
      newPadding.cookTime = {
        paddingLeft: "0.5rem",
      };
    }
    console.log("newPadding: ", newPadding);
    setMinutesPadding(newPadding);
  }, []);

  const { title } = recipe;

  const handleBookmarkClick = (e) => {
    if (loggedIn && userId) {
      handleBookmark({
        recipeId: recipe._id,
        method: isBookmarked ? "remove" : "add",
      });
    }
  };

  return (
    <div
      className={clsx(
        styles.bannerOuterContainer,
        !recipe.imgUrl && styles.bannerOuterContainerNoImage
      )}
      id="recipe-banner"
    >
      <div
        className={clsx(
          !disabled && styles.bookmarkIconContainer,
          disabled && styles.bookmarkIconContainerDisabled
        )}
      >
        {isBookmarked ? (
          <BookmarkedIcon
            classes={{
              root: clsx(
                styles.bookmarkedIcon,
                disabled && styles.bookmarkIconDisabled
              ),
            }}
            onClick={handleBookmarkClick}
          />
        ) : (
          <NotBookmarkedIcon
            classes={{
              root: clsx(
                styles.notBookmarkedIcon,
                disabled && styles.bookmarkIconDisabled
              ),
            }}
            onClick={handleBookmarkClick}
          />
        )}
      </div>
      <div className={styles.rightBannerColumn}>
        <div className={styles.titleContainer}>
          <Typography variant="h3" classes={{ root: styles.titleText }}>
            {title}
          </Typography>
        </div>
        <Details_ActionSection recipe={recipe} />
      </div>
      <div className={styles.detailsContainer} style={detailsHeight}>
        {recipe?.servings?.amount && (
          <div className={styles.servingsContainer}>
            <Typography
              variant="subtitle1"
              classes={{ root: styles.bannerLabel }}
            >
              Makes About:
            </Typography>
            <Typography variant="body1" classes={{ root: styles.bannerDetail }}>
              {`${recipe.servings.amount} ${recipe.servings.unit}`}
            </Typography>
          </div>
        )}

        <div className={clsx(styles.individualTimeWrapper)}>
          <Typography
            variant="subtitle1"
            classes={{ root: styles.bannerLabel }}
          >
            Prep Time:{" "}
          </Typography>
          <div>
            {formattedTime?.prepTime?.hours && (
              <Typography
                variant="body1"
                classes={{
                  root: clsx(
                    styles.bannerDetail,
                    !recipe?.time?.prepTime && styles.hide
                  ),
                }}
              >
                {formattedTime?.prepTime?.hours}
                {formattedTime?.prepTime?.hours <= 1 ? " Hour," : " Hours,"}
              </Typography>
            )}
            {formattedTime?.prepTime?.minutes && (
              <Typography
                variant="body1"
                classes={{ root: styles.bannerDetail }}
                style={minutesPadding.prepTime}
              >
                {formattedTime?.prepTime?.minutes}
                {formattedTime?.prepTime?.minutes <= 1 ? " minute" : " minutes"}
              </Typography>
            )}
          </div>
          {Boolean(
            !formattedTime?.prepTime?.minutes && !formattedTime?.prepTime?.hours
          ) && (
            <Typography
              variant="body1"
              classes={{ root: styles.bannerDetailNoContent }}
            >
              -- : --
            </Typography>
          )}
        </div>
        <div className={clsx(styles.individualTimeWrapper)}>
          <Typography
            variant="subtitle1"
            classes={{ root: styles.bannerLabel }}
          >
            Cook Time:{" "}
          </Typography>
          <div>
            {formattedTime?.cookTime?.hours && (
              <Typography
                variant="body1"
                classes={{
                  root: clsx(
                    styles.bannerDetail,
                    !recipe?.time?.cookTime && styles.hide
                  ),
                }}
              >
                {formattedTime?.cookTime?.hours}
                {formattedTime?.cookTime?.hours === 0 ? " Hour," : " Hours,"}
              </Typography>
            )}
            {formattedTime?.cookTime?.minutes && (
              <Typography
                variant="body1"
                classes={{
                  root: styles.bannerDetail,
                }}
                style={minutesPadding.cookTime}
              >
                {formattedTime?.cookTime?.minutes}
                {formattedTime?.cookTime?.minutes === 0
                  ? " minute"
                  : " minutes"}
              </Typography>
            )}
            {Boolean(
              !formattedTime?.cookTime?.minutes &&
                !formattedTime?.cookTime?.hours
            ) && (
              <Typography
                variant="body1"
                classes={{ root: styles.bannerDetailNoContent }}
              >
                -- : --
              </Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  UI: state.UI,
  user: state.user,
  recipes: state.recipes,
});

export default connect(mapStateToProps, { handleBookmark })(Details_Banner);
