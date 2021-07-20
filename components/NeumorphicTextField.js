import React, { Fragment, useEffect, useState } from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { GridItem } from "./UIComponents";
import UnitSelectDestructed from "./UnitSelectDestructured";
import { unitObject } from "../util/appWideData";
import NoSsr from "@material-ui/core/NoSsr";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const useNeumorphicStyles = makeStyles((theme) => ({
  textFieldRoot: {
    minWidth: "100%",
    alignSelf: "stretch",
    // color: "#fff",
    "& > div": {
      minWidth: "100%",
      width: "100%",
    },
  },
  inputRoot: {
    color: "#fff",
    "&:before": {
      borderBottom: "1px solid #fff",
    },
  },
  inputroot: {
    "&:before": {
      borderBottom: "1px solid #fff",
    },
    "&:hover:not(.Mui-disabled):before": {
      borderBottom: "2px solid #fff",
    },
    "&:after": {
      borderBottom: `1px solid ${theme.palette.secondary.light}`,
    },
  },
  inputFocused: {
    color: "#fff",
    "&:after": {
      // borderBottom: "2px solid #fff",
      borderBottom: `2px solid ${theme.palette.primary.light}`,
    },
  },
  inputLabelRoot: { color: "#e0e0e0" },
  inputLabelWithValue: { color: "#fff" },
  inputLabelRequired: {},
  inputLabelFocused: {
    color: "#fff !important",
  },
}));

const NeumorphicTextField = (props) => {
  const classes = useNeumorphicStyles();
  return (
    <TextField
      {...props}
      InputProps={{
        classes: {
          root: clsx("inputListener", classes.inputroot),
          input: classes.inputRoot,
          focused: classes.inputFocused,
        },
      }}
      classes={{ root: classes.textFieldRoot }}
      //   onBlur={props.onBlur}
      //   onFocus={props.onFocus}
      InputLabelProps={{
        ...props.InputLabelProps,
        focused: props.focusState.title.focus,
        shrink: Boolean(props.formData?.title?.length !== 0),
        classes: {
          root: clsx(
            classes.inputLabelRoot,
            props.focusState?.title?.focus && classes.inputLabelFocused,
            props.formData?.title?.length !== 0 && classes.inputLabelWithValue
          ),
          required: classes.inputLabelRequired,
        },
      }}
    ></TextField>
  );
};

export default NeumorphicTextField;
