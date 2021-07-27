import React, { useState, useEffect, Fragment, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import * as Types from "../stateManagement/TYPES";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import AddIcon from "@material-ui/icons/AddBoxOutlined";
import ReturnIcon from "@material-ui/icons/KeyboardReturn";
import AddAdornment from "./AddAdornment";
import TimeAdornment from "./timeUnitAdornment";

const timeSectionBreakpoint = "xl";

const getHasSentAlert = () => {
  let value = localStorage.getItem("hasSentAlert-directions");
  return value ? value : false;
};

const shiftKeys = ["ShiftRight", "ShiftLeft"];
const useStyles = makeStyles((theme) => ({
  outerContainer: {
    gridArea: "form",
    transform: "translateX(50%)",
    backgroundColor: theme.palette.secondary.main,
    zIndex: 1,
    transition: theme.transitions.create(["transform"], {
      duration: 500,
    }),
  },
  outerContainerShifted: {
    transform: "translateX(0%)",
    marginRight: "10px",
    transition: theme.transitions.create(["transform"], {
      duration: 500,
    }),
  },
  textFieldRoot: {
    minWidth: "100%",
    alignSelf: "stretch",
    color: "#fff",
    "& > div": {
      minWidth: "100%",
      width: "100%",
    },
  },
  inputRoot: {
    color: "#fff",
    // paddingLeft: "5px",
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
    // boxShadow: "inset 3px 3px 6px #cc540e, inset -3px -3px 6px #ff6c12",
    // borderRadius: "4px",
    transition: theme.transitions.create(["box-shadow"], {
      duration: 250,
    }),
    "&:after": {
      borderBottom: `2px solid ${theme.palette.primary.light}`,
    },
  },
  inputLabelRoot: { color: "#e0e0e0" },
  inputLabelWithValue: {
    color: "#fff",
  },
  inputLabelFocused: {
    color: "#fff !important",
  },
  timeInputsContainer_outer: {
    marginTop: "16px",
    width: "100%",

    // display: "flex",
    // [theme.breakpoints.up(timeSectionBreakpoint)]: {
    //   flexDirection: "row",
    // },
  },
  timeInputsContainer_insideTypography: {
    // marginTop: "16px",
    width: "100%",
    display: "flex",
    [theme.breakpoints.up(timeSectionBreakpoint)]: {
      flexDirection: "row",
    },
  },
  // timeInputsContainer_inner: {
  //   width: "100%",
  //   [theme.breakpoints.up(timeSectionBreakpoint)]: {
  //     width: "45%",
  //   },
  // },
  timeInputsContainer_inner_left: {
    width: "100%",
    [theme.breakpoints.up(timeSectionBreakpoint)]: {
      width: "45%",
      marginRight: "5%",
    },
  },
  timeInputsContainer_inner_right: {
    width: "100%",
    [theme.breakpoints.up(timeSectionBreakpoint)]: {
      width: "45%",
      marginLeft: "5%",
    },
  },
  typographyRoot: {
    color: "#e0e0e0",
  },
  typographyRootFocused: {
    color: "#fff",
  },
}));
const StepThreeFormComponent = ({
  isShifted,
  setIsShifted,
  formHeightLimit,
  formData,
  setFormData,
}) => {
  const dispatch = useDispatch();
  const name = "direction";
  const classes = useStyles();
  const [hasSentAlert, setHasSentAlert] = useState(getHasSentAlert());
  const [shiftPressed, setShiftPressed] = useState(false);
  const [focusState, setFocusState] = useState({
    direction: {
      shrink: Boolean(formData?.direction?.length !== 0),
      focus: false,
    },
    prepTime: {
      shrink: Boolean(formData?.prepTime?.length !== 0),
      focus: false,
    },
    cookTime: {
      shrink: Boolean(formData?.cookTime?.length !== 0),
      focus: false,
    },
  });
  const addDirection = () => {
    if (formData.direction.length !== 0) {
      setFormData({
        ...formData,
        directions: [...formData.directions, formData.direction],
        direction: "",
      });
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (!hasSentAlert && e.target.value.length >= 3) {
      if (localStorage) {
        localStorage.setItem("hasSentAlert-directions", true);
        setHasSentAlert(true);
      }
      dispatch({
        type: Types.SHOW_SNACKBAR,
        payload: {
          message:
            "To add a direction with multiple lines, hold SHIFT while pressing ENTER.",
          variant: "info",
          vertical: "bottom",
          horizontal: "left",
          hideIn: 6000,
        },
      });
    }
  };
  const fauxListener = (title, type) => {
    if (type === "blur") {
      setFocusState({
        ...focusState,
        [title]: {
          shrink: Boolean(formData?.[title]?.length !== 0),
          focus: false,
        },
      });
    }
    if (type === "focus") {
      setFocusState({
        ...focusState,
        [title]: {
          shrink: Boolean(formData?.[title]?.length !== 0),
          focus: true,
        },
      });
    }
  };
  const keyObserver = (e) => {
    if (!e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      if (!e.shiftKey && formData?.direction?.length !== 0) {
        addDirection();
      }
    }
    if (shiftKeys.indexOf(e.code) !== -1) {
      setShiftPressed(true);
    }
  };
  return (
    <div
      className={clsx(
        classes.outerContainer,
        isShifted && classes.outerContainerShifted
      )}
    >
      <TextField
        name={name}
        id="recipeDirectionInput"
        label="Direction"
        fullWidth
        autoFocus
        multiline
        onFocus={() => fauxListener("direction", "focus")}
        onBlur={() => fauxListener("direction", "blur")}
        onChange={handleChange}
        onKeyDown={keyObserver}
        onKeyUp={(e) => {
          console.log("e", e);
          if (shiftKeys.indexOf(e.code) !== -1) {
            setShiftPressed(false);
          }
        }}
        value={formData.direction}
        focused={focusState.direction.focus}
        InputLabelProps={{
          focused: focusState.direction.focus,
          shrink: Boolean(formData?.direction?.length !== 0),
          classes: {
            root: clsx(
              classes.inputLabelRoot,
              focusState.direction.focus && classes.inputLabelFocused,
              formData?.direction?.length !== 0 && classes.inputLabelWithValue
            ),
            required: classes.inputLabelRequired,
          },
        }}
        InputProps={{
          endAdornment: AddAdornment(
            formData,
            focusState,
            addDirection,
            shiftPressed,
            name,
            focusState.direction.focus,
            formData?.direction
          ),
          classes: {
            root: clsx("inputListener", classes.inputroot),
            input: classes.inputRoot,
            focused: classes.inputFocused,
          },
        }}
      />

      <div className={clsx(classes.timeInputsContainer_outer)}>
        <Typography
          align="center"
          classes={{
            root: clsx(
              classes.typographyRoot,
              focusState.prepTime.focus && classes.typographyRootFocused,
              focusState.cookTime.focus && classes.typographyRootFocused
            ),
          }}
        >
          Total Time
        </Typography>
        <div className={clsx(classes.timeInputsContainer_insideTypography)}>
          <div
            className={clsx(
              classes.timeInputsContainer_inner,
              classes.timeInputsContainer_inner_left
            )}
          >
            <TextField
              name="prepTime"
              id="recipePrepTimeInput"
              label="Prep Time"
              fullWidth
              onFocus={() => fauxListener("prepTime", "focus")}
              onBlur={() => fauxListener("prepTime", "blur")}
              onChange={handleChange}
              onKeyDown={keyObserver}
              onKeyUp={(e) => {
                console.log("e", e);
                if (shiftKeys.indexOf(e.code) !== -1 && shiftPressed) {
                  setShiftPressed(false);
                }
              }}
              value={formData.prepTime}
              focused={focusState.prepTime.focus}
              InputLabelProps={{
                focused: focusState.prepTime.focus,
                shrink: Boolean(formData?.prepTime?.length !== 0),
                classes: {
                  root: clsx(
                    classes.inputLabelRoot,
                    focusState.prepTime.focus && classes.inputLabelFocused,
                    formData?.prepTime?.length !== 0 &&
                      classes.inputLabelWithValue
                  ),
                  required: classes.inputLabelRequired,
                },
              }}
              InputProps={{
                endAdornment: TimeAdornment(
                  formData,
                  focusState,
                  addDirection,
                  shiftPressed,
                  "prepTime",
                  focusState.prepTime.focus,
                  formData?.prepTime
                ),
                classes: {
                  root: clsx("inputListener", classes.inputroot),
                  input: classes.inputRoot,
                  focused: classes.inputFocused,
                },
              }}
              inputProps={{
                className: "inputListener",
                pattern: "\\d*",
              }}
              onKeyDown={(e) => {
                // All of this to avoid Safari's shadow user agent
                let allowed = false;
                let regex = /^\d+$/;
                if (regex.test(e.key) || e.code.slice(0, 3) !== "Key") {
                  allowed = true;
                }
                if (!allowed) {
                  e.preventDefault();
                }
              }}
            />
          </div>
          <div
            className={clsx(
              classes.timeInputsContainer_inner,
              classes.timeInputsContainer_inner_right
            )}
          >
            <TextField
              name="cookTime"
              id="recipeCookTimeInput"
              label="Cook Time"
              fullWidth
              onFocus={() => fauxListener("cookTime", "focus")}
              onBlur={() => fauxListener("cookTime", "blur")}
              onChange={handleChange}
              onKeyDown={keyObserver}
              onKeyUp={(e) => {
                if (shiftKeys.indexOf(e.code) !== -1 && shiftPressed) {
                  setShiftPressed(false);
                }
              }}
              value={formData.cookTime}
              focused={focusState.cookTime.focus}
              InputLabelProps={{
                focused: focusState.cookTime.focus,
                shrink: Boolean(formData?.cookTime?.length !== 0),
                classes: {
                  root: clsx(
                    classes.inputLabelRoot,
                    focusState.cookTime.focus && classes.inputLabelFocused,
                    formData?.cookTime?.length !== 0 &&
                      classes.inputLabelWithValue
                  ),
                  required: classes.inputLabelRequired,
                },
              }}
              InputProps={{
                endAdornment: TimeAdornment(
                  formData,
                  focusState,
                  addDirection,
                  shiftPressed,
                  "cookTime",
                  focusState.cookTime.focus,
                  formData?.cookTime
                ),
                classes: {
                  root: clsx("inputListener", classes.inputroot),
                  input: classes.inputRoot,
                  focused: classes.inputFocused,
                },
              }}
              inputProps={{
                className: "inputListener",
                pattern: "\\d*",
              }}
              onKeyDown={(e) => {
                // All of this to avoid Safari's shadow user agent
                let allowed = false;
                let regex = /^\d+$/;
                if (regex.test(e.key) || e.code.slice(0, 3) !== "Key") {
                  allowed = true;
                }
                if (!allowed) {
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepThreeFormComponent;
