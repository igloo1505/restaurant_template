import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import Slide from "@material-ui/core/Slide";
import { connect, useDispatch } from "react-redux";

const useClasses = makeStyles((theme) => ({
  outerContainer: {
    marginTop: "2rem",
  },
  aboutMeContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  inspiredByContainer: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  paragraphDiv: {
    textIndent: "1rem",
    // "&:hover": {
    //   cursor: "pointer",
    // },
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "0.75rem",
  },
  iconRoot: {
    fontSize: "1.2rem",
    color: theme.palette.alternativeTwo.main,
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const aboutMe = ({ aboutMe, inspiredBy }) => {
  const classes = useClasses();
  return (
    <Slide in={true} direction="up">
      <div className={classes.outerContainer}>
        {aboutMe && (
          <div className={classes.aboutMeContainer}>
            <div className={classes.titleContainer}>
              <Typography variant="h5">About Me:</Typography>
            </div>
            {aboutMe.split(/\r?\n/).map((t, i) => (
              <div key={`text-${i}`} className={classes.paragraphDiv}>
                {t}
              </div>
            ))}
          </div>
        )}
        {inspiredBy && (
          <div className={classes.inspiredByContainer}>
            <div className={classes.titleContainer}>
              <Typography variant="h5">Who Inspired Me To Cook?</Typography>
            </div>
            {inspiredBy.split(/\r?\n/).map((t, i) => (
              <div key={`text-${i}`} className={classes.paragraphDiv}>
                {t}
              </div>
            ))}
          </div>
        )}
      </div>
    </Slide>
  );
};

export default aboutMe;
