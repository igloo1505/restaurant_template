import React, { Fragment, useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { connect, useDispatch } from "react-redux";
import * as Types from "../../stateManagement/TYPES";
import Default_Dialog_Content from "../modalContent/Default_Dialog_Content";
import Modal_confirmDeleteRecipe from "../myRecipes/Modal_confirmDeleteRecipe";
import ConfirmDeleteReviewModal from "../recipeDetails/ConfirmDeleteReviewModal";
import Modal_addProfileImage from "../myProfile/Modal_addProfileImage";
import Modal_editLocation from "../myProfile/Modal_editLocation";
import Modal_setSkill from "../myProfile/Modal_setSkill";
import Modal_addRecipeImage from "../myRecipes/Modal_addRecipeImage";
import StepTwoSetSubRecipeModal from "../StepTwoSetSubRecipeModal";
import { FcHighPriority } from "react-icons/fc";

const useStyles = makeStyles((theme) => ({
  backdropRoot: {
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  dialogScrollPaper: {},
  dialogContainer: { backgroundColor: "rgba(0,0,0,0.2)" },
  dialogScrollBody: {},
  title: {
    fontSize: "1.1rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.palette.primary.dark,
    borderBottom: `1px solid ${theme.palette.primary.light}`,
    color: "#fff",
    // paddingBottom: "0px",
  },
  warningIcon: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    background: "linear-gradient(145deg, #ff4242, #d83838)",
    boxShadow: "3px 3px 6px #b42f2f, -3px -3px 6px #ff4e4e",
  },
}));

const Alert = ({
  alert: {
    dialog: { isOpen, contentText, title, variant },
  },
}) => {
  const [titleStyles, setTitleStyles] = useState({});
  const theme = useTheme();
  useEffect(() => {
    let color = {
      dark: theme.palette.primary.dark,
      light: theme.palette.primary.light,
    };
    switch (variant) {
      case "deleteRecipe":
        color = {
          dark: theme.palette.error.main,
          light: theme.palette.error.light,
        };
      default:
        theme.palette;
    }
    setTitleStyles({ backgroundColor: color.dark });
  }, [variant]);
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleClose = () => {
    dispatch({ type: Types.HIDE_ALERT });
  };
  return (
    <Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{
          root: classes.backdropRoot,
          scrollPaper: classes.dialogScrollPaper,
          container: classes.dialogContainer,
          scrollBody: classes.dialogScrollBody,
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          classes={{ root: classes.title }}
          disableTypography
          style={titleStyles}
        >
          {title}
          {variant === "deleteRecipe" && (
            <ErrorOutlineIcon className={classes.warningIcon} />
          )}
        </DialogTitle>
        <GetDialogContent
          variant={variant}
          isOpen={isOpen}
          contentText={contentText}
          title={title}
        />
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps)(Alert);

const GetDialogContent = ({ variant, isOpen, contentText, title }) => {
  if (!variant) {
    return (
      <Default_Dialog_Content
        variant={variant}
        isOpen={isOpen}
        contentText={contentText}
        title={title}
      />
    );
  } else {
    switch (variant) {
      case "deleteRecipe":
        return (
          <Modal_confirmDeleteRecipe
            variant={variant}
            isOpen={isOpen}
            contentText={contentText}
            title={title}
          />
        );
      case "deleteReview":
        return (
          <ConfirmDeleteReviewModal
            variant={variant}
            isOpen={isOpen}
            contentText={contentText}
            title={title}
          />
        );
      case "addRecipeImage":
        return (
          <Modal_addRecipeImage
            variant={variant}
            isOpen={isOpen}
            contentText={contentText}
            title={title}
          />
        );
      case "setSubRecipeTitle":
        return (
          <StepTwoSetSubRecipeModal
            variant={variant}
            isOpen={isOpen}
            contentText={contentText}
            title={title}
          />
        );
      case "addProfileImage":
        return (
          <Modal_addProfileImage
            variant={variant}
            isOpen={isOpen}
            contentText={contentText}
            title={title}
          />
        );
      case "editLocation":
        return (
          <Modal_editLocation
            variant={variant}
            isOpen={isOpen}
            contentText={contentText}
            title={title}
          />
        );
      case "editSkillLevel":
        return (
          <Modal_setSkill
            variant={variant}
            isOpen={isOpen}
            contentText={contentText}
            title={title}
          />
        );
      default:
        <Default_Dialog_Content
          variant={variant}
          isOpen={isOpen}
          contentText={contentText}
          title={title}
        />;
    }
  }
};
