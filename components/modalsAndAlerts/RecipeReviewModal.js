import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { deleteRecipe } from "../../stateManagement/recipeActions";
import * as Types from "../../stateManagement/TYPES";
import clsx from "clsx";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import Grow from "@material-ui/core/Grow";
import TextField from "@material-ui/core/TextField";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import { addRecipeImage } from "../../stateManagement/recipeActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import { submitRecipeReview } from "../../stateManagement/recipeActions";

const commentClasses = makeStyles((theme) => ({
  root: {
    padding: "1rem",
  },
}));

const useStyles = makeStyles((theme) => ({
  reviewTextSection: {
    display: "flex",
    // padding: "1rem",
    flexDirection: "column",
    // justifyContent: ""
  },
  dialogContentRoot: {
    overflow: "hidden",
  },
  fieldSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem 0px",
    [theme.breakpoints.down(700)]: {
      flexDirection: "column",
    },
  },
  dialogTextRoot: {
    marginBottom: "0px",
  },
  dialogTextRootFocused: {
    marginBottom: "0px",
    color: theme.palette.primary.main,
  },
  gridRoot: {
    display: "grid",
    // gridTemplateColumns: "repeat(auto-fit, minmax((calc()), 1fr))",
    gridTemplateColumns: "1fr 1fr",
    gridColumnGap: "0.75rem",
    minWidth: "min(600px, 75vw)",
    [theme.breakpoints.down(1280)]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  dialogActionsRoot: {
    padding: "1rem",
  },
}));

const dialogClasses = makeStyles((theme) => ({
  root: {
    // width: "70vw",
  },
  paper: {
    minWidth: "min(600px, 70vw)",
    maxWidth: "80vw",
  },
}));

const RecipeReviewModal = ({
  thisModal: { isOpen, relevantRecipe },
  recipes: { myRecipes, recipeImageUpload },
  user: {
    self: { _id: userId, loggedIn, token },
  },
  submitRecipeReview,
}) => {
  const [formData, setFormData] = useState({
    kidFriendly: 0,
    dateFriendly: 0,
    quickSnack: 0,
    dietFriendly: 0,
    comment: "",
  });
  const [descriptionFocused, setDescriptionFocused] = useState(false);
  const [allowHover, setAllowHover] = useState({
    kidFriendly: false,
    dateFriendly: false,
    quickSnack: false,
    dietFriendly: false,
  });
  const dispatch = useDispatch();
  const classes = useStyles();

  const closeModal = () => {
    dispatch({ type: Types.HIDE_RECIPE_REVIEW_MODAL });
    setTimeout(() => {
      dispatch({ type: Types.RESET_ALERT });
    }, 1000);
  };

  const handleSubmitReview = () => {
    if (!userId || !relevantId) {
      return;
    }
    let _review = {
      ...formData,
      submittedBy: userId,
      recipeId: relevantId,
    };
    submitRecipeReview(_review);
  };

  return (
    <div className={classes.outerContainer}>
      <Dialog
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="form-dialog-title"
        classes={dialogClasses()}
      >
        <DialogTitle id="form-dialog-title">
          {relevantRecipe?.title} Review:
        </DialogTitle>
        <DialogContent classes={{ root: classes.dialogContentRoot }}>
          <div className={classes.gridRoot}>
            <div className={classes.fieldSection}>
              <DialogContentText classes={{ root: classes.dialogTextRoot }}>
                Make this for the kids?
              </DialogContentText>
              <RatingComponent
                name="kidFriendly"
                formData={formData}
                setFormData={setFormData}
                allowHover={allowHover}
                setAllowHover={setAllowHover}
              />
            </div>
            <div className={classes.fieldSection}>
              <DialogContentText classes={{ root: classes.dialogTextRoot }}>
                For a quick snack?
              </DialogContentText>
              <RatingComponent
                name="quickSnack"
                formData={formData}
                setFormData={setFormData}
                allowHover={allowHover}
                setAllowHover={setAllowHover}
              />
            </div>
            <div className={classes.fieldSection}>
              <DialogContentText classes={{ root: classes.dialogTextRoot }}>
                What about for a date?
              </DialogContentText>
              <RatingComponent
                name="dateFriendly"
                formData={formData}
                setFormData={setFormData}
                allowHover={allowHover}
                setAllowHover={setAllowHover}
              />
            </div>
            <div className={classes.fieldSection}>
              <DialogContentText classes={{ root: classes.dialogTextRoot }}>
                Would you eat this while on a diet?
              </DialogContentText>
              <RatingComponent
                name="dietFriendly"
                formData={formData}
                setFormData={setFormData}
                allowHover={allowHover}
                setAllowHover={setAllowHover}
              />
            </div>
          </div>
          <div className={classes.reviewTextSection}>
            <DialogContentText
              classes={{
                root: clsx(
                  classes.dialogTextRoot,
                  descriptionFocused && classes.dialogTextRootFocused
                ),
              }}
            >
              Add a Review:
            </DialogContentText>
            <TextField
              //   margin="dense"
              type="text"
              value={formData.comment}
              fullWidth
              onKeyDown={(e) => {
                if (e.key !== "Backspace" && formData.comment.length >= 200) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              onFocus={() => setDescriptionFocused(true)}
              onBlur={() => setDescriptionFocused(false)}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  comment: e.target.value,
                });
              }}
              classes={commentClasses()}
            />
          </div>
        </DialogContent>
        <DialogActions classes={{ root: classes.dialogActionsRoot }}>
          <Button onClick={closeModal} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSubmitReview}
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  user: state.user,
  thisModal: state.alert.recipeReviewModal,
  recipes: state.recipes,
  props: props,
});

export default connect(mapStateToProps, { submitRecipeReview })(
  RecipeReviewModal
);

const useRatingClasses = makeStyles((theme) => ({
  iconRoot: {
    color: theme.palette.secondary.main,
    fontSize: "1rem",
    height: "2.5rem",
    width: "2.5rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
  ratingContainer: {
    padding: "0.75rem",
    borderRadius: "16px",
    boxShadow: "none",
    minWidth: "200px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    transition: theme.transitions.create(["box-shadow"], {
      duration: 250,
    }),
  },
  isEditing: {
    boxShadow: "4px 4px 18px #d9d9d9, -4px -4px 18px #ffffff",
    transition: theme.transitions.create(["box-shadow"], {
      duration: 250,
    }),
  },
}));
const RatingComponent = ({
  name,
  formData,
  setFormData,
  allowHover,
  setAllowHover,
}) => {
  const ratingContainerId = `${name}-ratings-container`;
  const ratingClasses = useRatingClasses();
  const ratings = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  };

  const [selectedRating, setSelectedRating] = useState(ratings);

  //TODO Don't forget to add touch methods to toggle half star

  const handleDivClick = () => {
    if (allowHover[name]) {
      let ratingsValue = Object.values(selectedRating).reduce(
        (prev, curr) => prev + curr,
        0
      );
      setFormData({
        ...formData,
        [name]: ratingsValue,
      });
    }
    let newAllowHover = {};
    Object.keys(allowHover).map((al) => {
      newAllowHover[al] = false;
    });
    newAllowHover[name] = !allowHover[name];
    setAllowHover(newAllowHover);
  };

  return (
    <div
      id={ratingContainerId}
      className={clsx(
        ratingClasses.ratingContainer,
        allowHover[name] && ratingClasses.isEditing
      )}
      onClick={() => handleDivClick()}
      onTouchStart={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {Object.keys(selectedRating).map((_r, index) => (
        <RatingIcon
          index={index}
          name={name}
          key={`${name}-${index}`}
          ratings={ratings}
          ratingClasses={ratingClasses}
          setSelectedRating={setSelectedRating}
          selectedRating={selectedRating}
          allowHover={allowHover}
          formData={formData}
          setFormData={setFormData}
        />
      ))}
    </div>
  );
};

const _RatingIcon = ({
  props: {
    index,
    name,
    ratings,
    ratingClasses,
    setSelectedRating,
    selectedRating,
    allowHover,
    formData,
    setFormData,
  },
  viewport: { width: deviceWidth },
}) => {
  const starIconId = `${name}-icon-${index}`;
  const [clientRect, setClientRect] = useState({});
  useEffect(() => {
    if (typeof window !== undefined) {
      let em = document.getElementById(starIconId).getBoundingClientRect();

      setClientRect(em);
    }
  }, [deviceWidth]);

  const handleMouseMove = (e) => {
    console.log("e: ", e);
    if (allowHover[name]) {
      let rValue = 0;
      let mouseXValue = e.pageX;
      const midwayPoint = clientRect.width / 2 + clientRect.x;
      if (mouseXValue < midwayPoint && mouseXValue > clientRect.left) {
        rValue = 0.5;
      }
      if (mouseXValue < clientRect.left) {
        rValue = 0;
      }
      if (mouseXValue > midwayPoint) {
        rValue = 1;
      }

      let newRatings = {};
      Object.keys(selectedRating).map((sr, _index) => {
        if (_index < index) {
          newRatings[_index] = 1;
        }
        if (_index > index) {
          newRatings[_index] = 0;
        }
        if (_index === index) {
          newRatings[_index] = rValue;
        }
      });
      setSelectedRating(newRatings);
      let formValue = Object.values(newRatings).reduce(
        (prev, curr) => prev + curr,
        0
      );
      setFormData({
        ...formData,
        [name]: formValue,
      });
    }
  };

  switch (selectedRating[index]) {
    case 0.5:
      return (
        <StarHalfIcon
          id={starIconId}
          classes={{ root: ratingClasses.iconRoot }}
          onMouseMove={handleMouseMove}
          onTouchStart={(e) => console.log("E", e)}
        />
      );
    case 1:
      return (
        <StarIcon
          id={starIconId}
          classes={{ root: ratingClasses.iconRoot }}
          onMouseMove={handleMouseMove}
          onTouchStart={(e) => console.log("E", e)}
        />
      );
    case 0:
    default:
      return (
        <StarBorderIcon
          id={starIconId}
          classes={{ root: ratingClasses.iconRoot }}
          onMouseMove={handleMouseMove}
          onTouchStart={(e) => console.log("E", e)}
        />
      );
  }
};

const _mapStateToProps = (state, props) => ({
  viewport: state.UI.viewport,
  props: props,
});

const RatingIcon = connect(_mapStateToProps)(_RatingIcon);

// getBoudingClientRect
// bottom: 647.5
// height: 40
// left: 725.5
// right: 765.5
// top: 607.5
// width: 40
// x: 725.5
// y: 607.5
