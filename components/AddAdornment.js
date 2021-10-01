import React, { useState, useEffect, Fragment, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import * as Types from "../stateManagement/TYPES";
import TextField from "@material-ui/core/TextField";
import Fade from "@material-ui/core/Fade";
import AddIcon from "@material-ui/icons/AddBoxOutlined";
import ReturnIcon from "@material-ui/icons/KeyboardReturn";

const useAdornmentClasses = makeStyles((theme) => ({
  iconRoot: {
    opacity: 0,
    color: "#fff",
    transition: theme.transitions.create(["opacity"], {
      duration: 450,
      delay: 150,
    }),
    "&:hover": {
      cursor: "pointer",
    },
  },
  returnIconRoot: {
    opacity: 0,
    color: "#fff",
    transition: theme.transitions.create(["opacity"], {
      duration: 450,
      delay: 150,
    }),
  },
  iconFocused: { color: "#fff" },
  iconEnabled: {
    opacity: 1,
    transition: theme.transitions.create(["opacity"], {
      duration: 450,
      delay: 150,
    }),
  },
}));
const AddAdornment = (
  formData,
  focusState,
  addMethod,
  shiftPressed,
  name,
  focused,
  text
) => {
  const namesToIgnoreReturn = ["ingredient"];

  const [showIcon, setShowIcon] = useState(false);
  const [shouldIgnoreReturn, setShouldIgnoreReturn] = useState(false);
  useEffect(() => {
    setShouldIgnoreReturn(namesToIgnoreReturn.indexOf(name) !== -1);
  });
  //   const [focused, setFocused] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const classes = useAdornmentClasses();
  useEffect(() => {
    if (!shouldIgnoreReturn) {
      if (!shiftPressed || !enabled) {
        setShowIcon(false);
      }
      if (shiftPressed && enabled) {
        setShowIcon(true);
      }
    }
  }, [shiftPressed]);
  useEffect(() => {
    if (text.length >= 3) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  }, [text]);

  if (!shouldIgnoreReturn && shiftPressed) {
    return (
      <Fragment>
        <Fade in={showIcon} timeout={{ appear: 250, enter: 250, leave: 250 }}>
          <ReturnIcon
            classes={{
              root: clsx(
                classes.returnIconRoot,
                focused && classes.iconFocused,
                enabled && classes.iconEnabled
              ),
            }}
            onClick={addMethod}
          />
        </Fade>
      </Fragment>
    );
  }
  if (shouldIgnoreReturn || (!shouldIgnoreReturn && !shiftPressed)) {
    return (
      <Fragment>
        <Fade
          in={(shouldIgnoreReturn && enabled) || (!shiftPressed && enabled)}
          timeout={{ appear: 250, enter: 450, leave: 250 }}
        >
          <AddIcon
            classes={{
              root: clsx(
                classes.iconRoot,
                focused && classes.iconFocused,
                enabled && classes.iconEnabled
              ),
            }}
            onClick={addMethod}
          />
        </Fade>
      </Fragment>
    );
  }
};

export default AddAdornment;
