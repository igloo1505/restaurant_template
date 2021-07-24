import React, { useState, useEffect, Fragment, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/AddBoxOutlined";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import AddIcon from "@material-ui/icons/AddBoxOutlined";
// import CheckedIcon from "@material-ui/icons/DoneOutlined";
// import Paper from "@material-ui/core/Paper";
// import Slide from "@material-ui/core/Slide";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";

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
  const classes = useStyles();
  const [focusState, setFocusState] = useState({
    direction: {
      shrink: Boolean(formData?.direction?.text?.length !== 0),
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
      if (!e.shiftKey && formData?.direction.text?.length !== 0) {
        addDirection();
      }
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
        name="direction"
        id="recipeDirectionInput"
        label="Direction"
        fullWidth
        autoFocus
        multiline
        onFocus={() => fauxListener("direction", "focus")}
        onBlur={() => fauxListener("direction", "blur")}
        onChange={handleChange}
        onKeyDown={keyObserver}
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
          endAdornment: AddAdornment(formData, focusState, addDirection),
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

const AddAdornment = (formData, focusState, addDirection) => {
  const classes = useAdornmentClasses();
  return (
    <Fragment>
      <AddIcon
        classes={{
          root: clsx(
            classes.iconRoot,
            focusState.direction.focus && classes.iconFocused,
            formData?.direction?.length !== 0 && classes.iconEnabled
          ),
        }}
        onClick={addDirection}
      />
    </Fragment>
  );
};
