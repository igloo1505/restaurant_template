import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import * as Types from "../../stateManagement/TYPES";

const useClasses = makeStyles((theme) => ({
  reviewContainer: {
    display: "flex",
    flexDirection: "column",
    // flexWrap: "wrap",
    padding: "0.75rem",
    border: "1px solid red",
    borderRadius: "5px",
    position: "relative",
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
    width: "fit-content",
    "&:hover": {
      cursor: "pointer",
    },
  },
  deleteIcon: {
    position: "absolute",
    top: "5px",
    right: "5px",
    color: theme.palette.error.dark,
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const Details_ReviewItem = ({
  props: { review, index, array, recipeId },
  user: {
    loggedIn,
    self: { _id: userId },
  },
}) => {
  const [isOwnReview, setIsOwnReview] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsOwnReview(userId === review?.submittedBy?._id);
  }, [loggedIn, userId]);
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

  const handleDeleteIconClick = () => {
    if (isOwnReview) {
      let modalPayload = {
        isOpen: true,
        title: "Delete Review?",
        variant: "deleteReview",
        relevantId: { reviewId: review._id, recipeId: recipeId },
        titleColor: "error",
      };
      dispatch({
        type: Types.SHOW_DELETE_REVIEW_MODAL,
        payload: modalPayload,
      });
    }
  };

  return (
    <div className={classes.reviewContainer} id={`recipeReview-${index}`}>
      {isOwnReview && (
        <DeleteIcon
          classes={{ root: classes.deleteIcon }}
          onClick={handleDeleteIconClick}
        />
      )}
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

const mapStateToProps = (state, props) => ({
  user: state.user,
  props: props,
});

export default connect(mapStateToProps)(Details_ReviewItem);

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

const RatingWithIcons = ({ reviewKey, index, iconArray }) => {
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
