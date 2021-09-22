import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";

const useClasses = makeStyles((theme) => ({
  reviewContainer: {
    display: "flex",
    flexDirection: "column",
    // flexWrap: "wrap",
    padding: "0.75rem",
    border: "1px solid red",
    borderRadius: "5px",
  },
  innerReviewContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  RatingsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "0.75rem",
    margin: "0.75rem 0rem",
  },
  ratingCommentContainer: {
    // margin: "0.75rem 0rem",
  },
  reviewSubmittedBy: {
    fontSize: "1.1rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const Details_ReviewItem = ({ review, index, array }) => {
  const classes = useClasses();
  const router = useRouter();
  const _reviewRatingIcons = {
    dateFriendly: [],
    dietFriendly: [],
    kidFriendly: [],
    quickSnack: [],
  };

  const getIndividualIcons = (rating) => {
    let arr = [];
    for (var i = 0; i < Math.floor(rating); i++) {
      arr.push(StarIcon);
    }
    if (rating % 1 !== 0) {
      arr.push(StarHalfIcon);
    }
    for (var i = arr.length; i < 5; i++) {
      arr.push(StarBorderIcon);
    }
    console.log("arr: ", arr);
    return arr;
  };

  const [reviewRatingIcons, setReviewRatingIcons] =
    useState(_reviewRatingIcons);

  useEffect(() => {
    let iconArrays = {
      ...reviewRatingIcons,
    };
    Object.keys(_reviewRatingIcons).map((r) => {
      iconArrays[r] = getIndividualIcons(review[r]);
    });
    setReviewRatingIcons(iconArrays);
  }, []);
  const redirectToUserProfile = () => {
    router.push(`/user/${review.submittedBy._id}`);
  };

  return (
    <div className={classes.reviewContainer} id={`recipeReview-${index}`}>
      <Typography
        variant="subtitle2"
        onClick={redirectToUserProfile}
        className={classes.reviewSubmittedBy}
      >
        {review?.submittedBy?.firstName} {review?.submittedBy?.lastName}
      </Typography>
      <div className={classes.innerReviewContainer}>
        <div className={classes.RatingsContainer}>
          {Object.keys(reviewRatingIcons) &&
            Object.keys(reviewRatingIcons).map((review, index, array) => (
              <RatingWithIcons
                reviewKey={review}
                index={index}
                iconArray={reviewRatingIcons[review]}
                key={`review-${index}`}
              />
            ))}
        </div>
        <div className={classes.ratingCommentContainer}>
          <Typography variant="body1">{review?.comment}</Typography>
        </div>
      </div>
    </div>
  );
};

export default Details_ReviewItem;

const useRatingClasses = makeStyles((theme) => ({
  individualRatingContainer: {
    width: "fit-content",
  },
  ratingIcon: {
    color: theme.palette.secondary.main,
  },
  ratingKey: {
    textAlign: "center",
  },
}));

const RatingWithIcons = ({ reviewKey, index, iconArray, key }) => {
  const getReviewKey = (reviewKey) => {
    switch (reviewKey) {
      case "dateFriendly":
        return "For a Date";
      case "dietFriendly":
        return "Diet Friendly";
      case "kidFriendly":
        return "Kid Friendly";
      case "quickSnack":
        return "Quick Snack";
      default:
        break;
    }
  };
  const classes = useRatingClasses();
  return (
    <div className={classes.individualRatingContainer}>
      <Typography variant="subtitle2" classes={{ root: classes.ratingKey }}>
        {getReviewKey(reviewKey)}
      </Typography>
      {iconArray &&
        iconArray.map((Icon, index) => (
          <Icon
            key={`${reviewKey}-icon-${index}`}
            classes={{ root: classes.ratingIcon }}
          />
        ))}
    </div>
  );
};
