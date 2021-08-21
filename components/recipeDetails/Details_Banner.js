/* eslint-disable react/display-name */
import React, { Fragment, useState, useEffect, forwardRef } from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  bannerOuterContainer: {
    width: "40%",
    height: "100%",
    display: "flex",
    float: "right",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Details_Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.bannerOuterContainer}>
      <div>Banner Here</div>
    </div>
  );
};

export default Details_Banner;
