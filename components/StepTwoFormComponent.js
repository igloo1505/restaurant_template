import React, { useState, useEffect, Fragment, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import AddIcon from "@material-ui/icons/AddBoxOutlined";
import CheckedIcon from "@material-ui/icons/DoneOutlined";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  container: {
    marginRight: "10px",
    transform: "translateX(0%)",
    transition: theme.transitions.create(["transform"], {
      duration: 500,
    }),
  },
  transformContainer: {
    transform: "translateX(50%)",
    zIndex: 100,
    // backgroundColor: theme.palette.secondary.main,
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
    // transform: "translate(2px, 0px) !important",
    // fontSize: "0.7rem",
  },
  inputLabelFocused: {
    color: "#fff !important",
    // transform: "translate(8px, 24px)",
  },
  checkBoxRoot: {
    color: "#e0e0e0",
    padding: "0px 1px",
    margin: "9px 8px",
    borderRadius: "4px",
    transition: theme.transitions.create(["box-shadow"], {
      duration: 300,
    }),
  },
  checkBoxChecked: {
    background: "#eb6010",
    // boxShadow: "2px 2px 2px #a7440b, -2px -2px 2px #ff7c15",
    boxShadow: "2px 2px 2px #cf540e, -2px -2px 2px #ff6c12",
    borderRadius: "4px",

    transition: theme.transitions.create(["box-shadow"], {
      duration: 300,
    }),
  },
  checkboxDisabled: {},
  checkboxLabel: { color: "#fff" },
  checkBoxContainer: { paddingTop: "10px", float: "right" },
}));

// Props
// formData={formData}
//   handleFormChange={handleFormChange}
//   setFormData={setFormData}

const StepTwoFormComponent = ({
  formData,
  handleFormChange,
  setFormData,
  isShifted,
}) => {
  const [focusState, setFocusState] = useState({
    ingredient: {
      shrink: Boolean(formData?.ingredient?.text?.length !== 0),
      focus: false,
    },
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: { ...formData[e.target.name], text: e.target.value },
    });
  };
  const addIngredient = (e) => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, formData.ingredient],
      ingredient: {
        text: "",
        optional: false,
      },
    });
  };
  const classes = useStyles();
  const fauxListener = (title, type) => {
    console.log(focusState);
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
      if (formData?.ingredient.text?.length !== 0) {
        addIngredient();
      }
    }
  };
  const handleChangeBoolean = (e) => {
    console.log("event", e);
    setFormData({
      ...formData,
      [e.target.name]: {
        ...formData[e.target.name],
        optional: !formData[e.target.name].optional,
      },
    });
  };
  return (
    <div
      className={clsx(
        classes.container,
        !isShifted && classes.transformContainer
      )}
    >
      <TextField
        id="recipeIngredientInput"
        name="ingredient"
        onFocus={() => fauxListener("ingredient", "focus")}
        onBlur={() => fauxListener("ingredient", "blur")}
        fullWidth
        autoFocus
        multiline
        label="Ingredient"
        onChange={handleChange}
        onKeyDown={keyObserver}
        value={formData.ingredient.text}
        focused={focusState.ingredient.focus}
        InputLabelProps={{
          focused: focusState.ingredient.focus,
          shrink: Boolean(formData?.ingredient?.text?.length !== 0),
          classes: {
            root: clsx(
              classes.inputLabelRoot,
              focusState.ingredient.focus && classes.inputLabelFocused,
              formData?.ingredient?.text?.length !== 0 &&
                classes.inputLabelWithValue
            ),
            required: classes.inputLabelRequired,
          },
        }}
        //   inputProps={{ className: "inputListener" }}
        InputProps={{
          endAdornment: AddIngredientAdornment(
            formData,
            focusState,
            addIngredient
          ),
          classes: {
            root: clsx("inputListener", classes.inputroot),
            input: classes.inputRoot,
            focused: classes.inputFocused,
          },
        }}
        //   classes={{ root: classes.textFieldRoot }}
      />
      <FormControlLabel
        style={{ backgroundColor: "transparent" }}
        classes={{
          label: classes.checkboxLabel,
          root: classes.checkBoxContainer,
        }}
        control={
          <Checkbox
            value={formData.ingredient.optional}
            checked={formData.ingredient.optional}
            name="ingredient"
            onChange={handleChangeBoolean}
            color="primary"
            // disabled={Object.keys(validated).every((x) => x === true)}
            checkedIcon={<CheckedIcon style={{ color: "#fff" }} />}
            classes={{
              root: classes.checkBoxRoot,
              checked: classes.checkBoxChecked,
              disabled: classes.checkboxDisabled,
            }}
          />
        }
        label="Optional"
      />
    </div>
  );
};

export default StepTwoFormComponent;

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

const AddIngredientAdornment = (formData, focusState, addIngredient) => {
  const classes = useAdornmentClasses();
  return (
    <Fragment>
      <AddIcon
        classes={{
          root: clsx(
            classes.iconRoot,
            focusState.ingredient.focus && classes.iconFocused,
            formData?.ingredient?.text?.length !== 0 && classes.iconEnabled
          ),
        }}
        onClick={addIngredient}
      />
    </Fragment>
  );
};
