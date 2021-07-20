import React, { Fragment, useEffect, useState } from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { GridItem } from "./UIComponents";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
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
    // marginTop: "16px",
    padding: "6px 7px",
    // padding: "0px",
    // borderRadius: "5px",
    // background: "linear-gradient(145deg, #d4560e, #fb6711)",
    // boxShadow: "2px 2px 4px #be4e0d, -2px -2px 4px #ff7213",
    "&:before": {
      borderBottom: "1px solid #fff",
    },
    "&:hover": {
      "& > .MuiOutlinedInput-notchedOutline": {
        border: `1px solid #fff`,
      },
    },
  },
  inputInputRoot: {
    color: "#fff",
    padding: "6px 7px",
    "&:hover": {
      "& > .MuiOutlinedInput-notchedOutline": {
        borderColor: "#fff",
        border: `1px solid #fff`,
      },
    },
  },
  inputroot: {
    // borderRadius: "5px",
    border: "5px solid red",
    padding: "0px 0px",
    // background: "linear-gradient(145deg, #d4560e, #fb6711)",
    // boxShadow: "2px 2px 4px #be4e0d, -2px -2px 4px #ff7213",
    // boxShadow: "5px 5px 8px #cc540e,-5px -5px 8px #ff6c12",
    // boxShadow: "3px 3px 6px #cc540e, -3px -3px 6px #ff6c12",

    "&:before": {
      //   borderBottom: `1px solid ${theme.palette.secondary.light}`,
      borderBottom: "1px solid #fff",
    },
    "&:hover:not(.Mui-disabled):before": {
      //   borderBottom: "2px solid #fff",
    },
    "&:after": {
      //   borderBottom: `1px solid ${theme.palette.secondary.light}`,
    },
  },
  inputFocused: {
    color: "#fff",
    // border: `1px solid ${theme.palette.primary.light}`,
    // padding: "2px",
    // boxShadow: "3px 3px 6px #cc540e, -3px -3px 6px #ff6c12",
    boxShadow: "inset 3px 3px 6px #cc540e, inset -3px -3px 6px #ff6c12",
    "&:after": {
      content: '""',
      position: "absolute",
      //   height: "calc(100% - 5px)",
      //   width: "calc(100% - 5px)",
      //   borderRadius: "5px",
      //   border: `1px solid ${theme.palette.primary.light}`,
      // boxShadow: "inset 5px 5px 8px #cc540e, inset -5px -5px 8px #ff6c12",
      //   boxShadow: "inset 3px 3px 6px #cc540e, inset -3px -3px 6px #ff6c12",
      transition: theme.transitions.create(
        ["box-shadow", "transform", "background-color"],
        {
          duration: 500,
        }
      ),
    },
  },
  inputInputNotchedOutline: {
    // border: "0px !important",
    border: "1px solid blue",
  },
  inputLabelRoot: {
    color: "#e0e0e0",
    transform: "translate(14px, 14px)",
    transition: theme.transitions.create(["transform"], {
      duration: 700,
    }),
  },
  inputLabelWithValue: { color: "#fff" },
  inputLabelRequired: {},
  inputLabelFocused: {
    color: "#fff !important",
    padding: "2px",
    // transform: "translate(14px, 11px)",
    transition: theme.transitions.create(["transform"], {
      duration: 700,
    }),
  },
  inputContainerOuter: {
    // boxShadow:
    //   "9px 9px 16px rgba(189, 189, 189, 0.6), -9px -9px 16px rgba(255, 255, 255, 0.5)",
    height: "fit-content",
  },
  inputContainerInner: {
    height: "fit-content",
    marginTop: "16px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px 6px",
    transition: theme.transitions.create(
      ["box-shadow", "transform", "background-color", "border"],
      {
        duration: 500,
      }
    ),
  },

  inputContainerInnerFocused: {
    boxShadow: "5px 5px 8px #cc540e,-5px -5px 8px #ff6c12",
    borderRadius: "4px",
    transition: theme.transitions.create(
      ["box-shadow", "transform", "background-color", "border"],
      {
        duration: 500,
      }
    ),
  },
  inputNotchedOutline: {
    border: "1px solid #e0e0e0",

    transform: "translateY(2.5px)",
    "&:hover": {
      border: "1px solid #fff",
      borderColor: "#fff !important",
      transition: theme.transitions.create(
        ["box-shadow", "transform", "background-color", "border"],
        {
          duration: 500,
        }
      ),
    },
    transition: theme.transitions.create(["border"], {
      duration: 150,
    }),
    transition: theme.transitions.create(
      ["box-shadow", "transform", "background-color"],
      {
        duration: 500,
      }
    ),
  },
  inputNotchedOutlineFocused: {
    boxShadow: "inset 3px 3px 6px #cc540e, inset -3px -3px 6px #ff6c12",
    transition: theme.transitions.create(
      ["box-shadow", "transform", "background-color"],
      {
        duration: 500,
      }
    ),
    transition: theme.transitions.create(["border"], {
      duration: 150,
    }),
    // border: `1px solid ${theme.palette.primary.light} !important`,
    border: `0px !important`,
  },
}));

const NeumorphicTextField = (props) => {
  const classes = useNeumorphicStyles();
  return (
    <div className={classes.neumorphicInput}>
      <div
        className={clsx(
          classes.inputContainerOuter,
          props.focused && classes.inputContainerInnerFocused
        )}
      >
        <div className={classes.inputContainerInner}>
          <TextField
            {...props}
            // color="primary"
            // variant="outlined"
            classes={{
              root: classes.inputRoot,
              focused: classes.inputFocused,
              error: classes.inputError,
              input: classes.inputInput,
              notchedOutline: clsx(
                classes.inputNotchedOutline
                // props.focused && classes.inputNotchedOutlineFocused
              ),
            }}
            InputProps={{
              ...props.InputProps,
              notched: true,
              classes: {
                ...props.InputProps.classes,
                root: classes.inputInputRoot,
                notchedOutline: clsx(
                  classes.inputNotchedOutline,
                  props.focused && classes.inputNotchedOutlineFocused
                ),
              },
            }}
            InputLabelProps={{
              ...props.InputLabelProps,
              classes: {
                root: classes.inputLabelRoot,
                focused: classes.inputLabelFocused,
                shrink: classes.inputLabelShrunk,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NeumorphicTextField;

// <TextField
//   {...props}
//   InputProps={{
//     classes: {
//       root: clsx("inputListener", classes.inputroot),
//       input: classes.inputRoot,
//       focused: classes.inputFocused,
//     },
//   }}
//   classes={{ root: classes.textFieldRoot }}
//   InputLabelProps={{
//     ...props.InputLabelProps,
//     focused: props.focusState.title.focus,
//     shrink: Boolean(props.formData?.title?.length !== 0),
//     classes: {
//       root: clsx(
//         classes.inputLabelRoot,
//         props.focusState?.title?.focus && classes.inputLabelFocused,
//         props.formData?.title?.length !== 0 &&
//           classes.inputLabelWithValue
//       ),
//       required: classes.inputLabelRequired,
//     },
//   }}
// ></TextField>
