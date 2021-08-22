import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    display: "flex",
    width: "40%",
    minWidth: "40%",
  },
}));

const Details_Gallery = () => {
  const classes = useStyles();
  return (
    <div className={classes.outerContainer}>
      <div>Gallery Here</div>
    </div>
  );
};

export default Details_Gallery;
