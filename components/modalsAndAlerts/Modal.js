import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React, { Fragment } from "react";
import { connect, useDispatch } from "react-redux";
import * as Types from "../../stateManagement/TYPES";
import Default_Dialog_Content from "../modalContent/Default_Dialog_Content";
import Modal_confirmDeleteRecipe from "../myRecipes/Modal_confirmDeleteRecipe";
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
    // paddingBottom: "0px",
  },
  warningIcon: {
    width: "30px",
    height: "30px",
    position: "absolute",
    right: "10px",
    top: "10px",
  },
}));

const Alert = ({
  alert: {
    dialog: { isOpen, contentText, title, variant },
  },
}) => {
  const theme = useTheme();
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
        >
          {title}
          {variant === "deleteRecipe" && (
            <FcHighPriority className={classes.warningIcon} />
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

const GetDialogContent = ({
  variant,
  isOpen,
  contentText,
  title,

  handleClick,
  ...rest
}) => {
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
