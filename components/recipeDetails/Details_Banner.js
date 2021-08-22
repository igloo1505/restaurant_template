/* eslint-disable react/display-name */
import React, { Fragment, useState, useEffect, forwardRef } from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { getFormattedTimeIndividual } from "../../util/getFormattedTime";
import BookmarkedIcon from "@material-ui/icons/BookmarkOutlined";
import NotBookmarkedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import Details_ActionSection from "./Details_ActionSection";
import styles from "./DetailsBanner.module.scss";

const Details_Banner = ({
  recipe,
  recipes: { myBookmarks },
  UI: {
    viewport: { width: deviceWidth, height: deviceHeight },
  },
}) => {
  const [detailsHeight, setDetailsHeight] = useState({});
  useEffect(() => {
    let parentHeight = document
      .getElementById("recipe-banner")
      .getBoundingClientRect().height;
    let _padding = 0.75;

    console.log(
      "`${parentHeight - (16 + 32 * _padding)}px`: ",
      `${parentHeight - (16 + 32 * _padding)}px`
    );
    setDetailsHeight({
      height: `${parentHeight - (16 + 32 * _padding)}px`,
    });
  }, [deviceWidth]);
  const formattedTime = getFormattedTimeIndividual(recipe);
  if (new Regex(/teest/gi).test(recipe.name)) {
    console.log("true: ", true);
  }
  console.log("formattedTime: ", formattedTime);
  const { title } = recipe;

  const handleFavoriteIconClick = (e) => {
    console.log("Add to favorites here", recipe);
  };

  return (
    <div className={styles.bannerOuterContainer} id="recipe-banner">
      {Boolean(myBookmarks && myBookmarks.includes(recipe._id)) ? (
        <BookmarkedIcon
          classes={{ root: styles.bookmarkedIcon }}
          onClick={handleFavoriteIconClick}
        />
      ) : (
        <NotBookmarkedIcon
          classes={{ root: styles.notBookmarkedIcon }}
          onClick={handleFavoriteIconClick}
        />
      )}
      <div className={styles.titleContainer}>
        <Typography variant="h3" classes={{ root: styles.titleText }}>
          {title}
        </Typography>
        {typeof window !== undefined && (
          <Typography variant="caption">
            {`
          delete later 
          width: ${deviceWidth}px
          height: ${deviceHeight}px
          `}
          </Typography>
        )}
      </div>
      <div className={styles.detailsContainer} style={detailsHeight}>
        {recipe?.servings?.amount && (
          <div className={styles.servingsContainer}>
            <Typography
              variant="subtitle"
              classes={{ root: styles.bannerLabel }}
            >
              Makes About:
            </Typography>
            <Typography variant="body" classes={{ root: styles.bannerDetail }}>
              {`${recipe.servings.amount} ${recipe.servings.unit}`}
            </Typography>
          </div>
        )}
        {recipe?.time?.prepTime && (
          <div className={styles.individualTimeWrapper}>
            <Typography
              variant="subtitle"
              classes={{ root: styles.bannerLabel }}
            >
              Prep Time:{" "}
            </Typography>
            {formattedTime.prepTime.hours && (
              <Typography
                variant="body"
                classes={{ root: styles.bannerDetail }}
              >
                {formattedTime.prepTime.hours}
                {formattedTime.prepTime.hours === 0 ? " Hour," : " Hours,"}
              </Typography>
            )}
            {formattedTime.prepTime.minutes && (
              <Typography
                variant="body"
                classes={{ root: styles.bannerDetail }}
              >
                {formattedTime.prepTime.minutes}
                {formattedTime.prepTime.minutes === 0 ? " minute" : " minutes"}
              </Typography>
            )}
          </div>
        )}
        {recipe?.time?.cookTime && (
          <div className={styles.individualTimeWrapper}>
            <Typography
              variant="subtitle"
              classes={{ root: styles.bannerLabel }}
            >
              Cook Time:{" "}
            </Typography>
            {formattedTime.cookTime.hours && (
              <Typography
                variant="body"
                classes={{ root: styles.bannerDetail }}
              >
                {formattedTime.cookTime.hours}
                {formattedTime.cookTime.hours === 0 ? " Hour," : " Hours,"}
              </Typography>
            )}
            {formattedTime.cookTime.minutes && (
              <Typography
                variant="body"
                classes={{ root: styles.bannerDetail }}
              >
                {formattedTime.cookTime.minutes}
                {formattedTime.cookTime.minutes === 0 ? " minute" : " minutes"}
              </Typography>
            )}
          </div>
        )}
      </div>
      <Details_ActionSection recipe={recipe} />
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  UI: state.UI,
  user: state.user,
  recipes: state.recipes,
});

export default connect(mapStateToProps)(Details_Banner);
