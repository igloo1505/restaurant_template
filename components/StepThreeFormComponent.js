import React, { useState, useEffect, Fragment, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import * as Types from "../stateManagement/TYPES";
import TextField from "@material-ui/core/TextField";
import Fade from "@material-ui/core/Fade";
import AddIcon from "@material-ui/icons/AddBoxOutlined";
import ReturnIcon from "@material-ui/icons/KeyboardReturn";
import AddAdornment from "./AddAdornment";

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
    </div>
  );
};

export default StepThreeFormComponent;

const useAdornmentClasses = makeStyles((theme) => ({
  iconRoot: {
    opacity: 0,
    color: "#fff",
    "&:hover": {
      cursor: "pointer",
    },
  },
  iconFocused: { color: "#fff" },
  iconEnabled: { opacity: 1 },
}));

// const AddAdornment = (formData, focusState, addDirection, shiftPressed) => {
//   const classes = useAdornmentClasses();

//   console.log("formData.direction: ", formData.direction.length);
//   if (shiftPressed) {
//     return (
//       <Fragment>
//         <Fade in={shiftPressed && formData?.direction?.length >= 3}>
//           <ReturnIcon
//             classes={{
//               root: clsx(
//                 classes.iconRoot,
//                 focusState.direction.focus && classes.iconFocused,
//                 formData?.direction?.length >= 3 && classes.iconEnabled
//               ),
//             }}
//             onClick={addDirection}
//           />
//         </Fade>
//       </Fragment>
//     );
//   }
//   if (!shiftPressed) {
//     return (
//       <Fragment>
//         <Fade in={!shiftPressed && formData?.direction?.length >= 3}>
//           <AddIcon
//             classes={{
//               root: clsx(
//                 classes.iconRoot,
//                 focusState.direction.focus && classes.iconFocused,
//                 formData?.direction?.length >= 3 && classes.iconEnabled
//               ),
//             }}
//             onClick={addDirection}
//           />
//         </Fade>
//       </Fragment>
//     );
//   }
// };
