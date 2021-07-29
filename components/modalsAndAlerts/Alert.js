import React, { useEffect, Fragment, useState } from "react";
import clsx from "clsx";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import * as Types from "../../stateManagement/TYPES";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Default_Dialog_Content from "../modalContent/Default_Dialog_Content";

const useStyles = makeStyles((theme) => ({
  backdropRoot: {
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  dialogScrollPaper: {},
  dialogContainer: { backgroundColor: "rgba(0,0,0,0.2)" },
  dialogScrollBody: {},
}));

const Alert = ({
  alert: {
    dialog: { isOpen, contentText, title, confirmation, variant },
  },
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  // const [open, setOpen] = useState(false);

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
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        {getDialogContent({
          variant,
          isOpen,
          contentText,
          title,
          confirmation,
        })}
        <DialogActions>
          {confirmation && (
            <Button onClick={() => handleClose(false)} color="primary">
              Disagree
            </Button>
          )}
          <Button onClick={() => handleClose(true)} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps)(Alert);

const getDialogContent = ({
  variant,
  isOpen,
  contentText,
  title,
  confirmation,
}) => {
  if (!variant) {
    return (
      <Default_Dialog_Content
        variant={variant}
        isOpen={isOpen}
        contentText={contentText}
        title={title}
        confirmation={confirmation}
      />
    );
  } else {
    switch (variant) {
      default:
        <Default_Dialog_Content
          variant={variant}
          isOpen={isOpen}
          contentText={contentText}
          title={title}
          confirmation={confirmation}
        />;
    }
  }
};
