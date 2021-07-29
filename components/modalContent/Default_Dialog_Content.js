import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

const Default_Dialog_Content = (props) => {
  const { contentText } = props;
  return (
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {contentText}
      </DialogContentText>
    </DialogContent>
  );
};

export default Default_Dialog_Content;
