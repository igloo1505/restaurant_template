import React, { useState, useEffect, Fragment, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import * as Types from "../stateManagement/TYPES";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/AddBoxOutlined";
import CheckedIcon from "@material-ui/icons/DoneOutlined";
import TextField from "@material-ui/core/TextField";
import ReturnIcon from "@material-ui/icons/KeyboardReturn";
import Fade from "@material-ui/core/Fade";
import AddAdornment from "./AddAdornment";
import ingredientAdornment from "./ingredientUnitAdornment";
import UnitSelectCompact from "./UnitSelectCompact";
import { getIngredientUnits } from "../util/appWideData";
import { validateStepTwo } from "../util/addRecipeFormValidate";

const unitContainerBreakpoint = "xl";

const getHasSentAlert = () => {
  let value = localStorage.getItem("hasSentAlert-ingredients");
  return value ? value : false;
};
const useStyles = makeStyles((theme) => ({
  container: {
    marginRight: "10px",
    transform: "translateX(0%)",
    transition: theme.transitions.create(["transform"], {
      duration: 500,
    }),
    minWidth: "300px",
    position: "relative",
    [theme.breakpoints.down(960)]: {
      minWidth: "min(200px, 25vw)",
    },
    [theme.breakpoints.down(600)]: {
      minWidth: "unset",
      padding: "1rem 0.75rem 1rem 0.75rem",
      borderRadius: "20px",
      margin: "0.75rem 0px 0px ",
      // boxShadow: "3px 3px 12px #783108, -3px -3px 12px #ff8f18",
      // boxShadow: "3px 3px 10px #bb5820, -3px -3px 10px #ff8830",
      boxShadow: "5px 5px 10px #c14f0d, -5px -5px 10px #ff7113",
      backgroundColor: theme.palette.secondary.dark,
      border: `1px solid ${theme.palette.secondary.light}`,
    },
  },
  transformContainer: {
    // transform: "translateX(50%)",
    transform: "translateX(calc(50% + 1.5rem))",
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
      transition: "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
  },
  inputrootSelect: {
    paddingRight: "30px !important",
    "&:before": {
      borderBottom: "1px solid #fff",
    },
    "&:hover:not(.Mui-disabled):before": {
      borderBottom: "2px solid #fff",
    },
    "&:after": {
      borderBottom: `2px solid ${theme.palette.primary.light}`,
      transition: "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
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
      transition: "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
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
    background: theme.palette.secondary.main,
    boxShadow: "2px 2px 2px #cf540e, -2px -2px 2px #ff6c12",
    borderRadius: "4px",
    transition: theme.transitions.create(["box-shadow"], {
      duration: 300,
    }),
    [theme.breakpoints.down(600)]: {
      background: theme.palette.secondary.dark,
      boxShadow: "2px 2px 2px #c34f0d, -2px -2px 2px #e55d0f",
    },
  },
  checkboxDisabled: {},
  checkboxLabel: { color: "#fff" },
  checkBoxContainer: {
    float: "right",
  },
  unitAndAmountContainer: {
    width: "100%",
    display: "grid",
    gridColumnGap: "10px",
    gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
    [theme.breakpoints.up(unitContainerBreakpoint)]: {
      display: "flex",
      flexDirection: "row",
    },
  },
  amountContainer: {
    [theme.breakpoints.up(unitContainerBreakpoint)]: {
      // width: "50%",
      width: "calc(50% - 5px)",
      marginRight: "5px",
    },
  },
  unitContainer: {
    [theme.breakpoints.up(unitContainerBreakpoint)]: {
      width: "calc(50% - 5px)",
      marginLeft: "5px",
    },
  },
  typographyRoot: {
    margin: "12px 4px 7px 4px",
    color: "#e0e0e0",
    transition: theme.transitions.create(["color"], {
      duration: 500,
    }),
  },
  typographyRootFocused: {
    color: "#fff",
    transition: theme.transitions.create(["color"], {
      duration: 500,
    }),
  },
  bottomContainer: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addSecondItemButtonContainer: {},
  addSecondItemButton: {
    backgroundColor: theme.palette.info.main,
    // position: "absolute",
    // bottom: 0,
    // left: 0,
    // scale: 0.1,
    // opacity: 0.1,
    "&:hover": {
      backgroundColor: theme.palette.info.main,
      boxShadow: "2px 2px 6px #cc540e, -2px -2px 6px #ff6c12",
      transition: theme.transitions.create(["box-shadow"], {
        duration: 350,
      }),
    },
  },
  addSecondItemButtonLabel: {
    color: "#fff",
  },
}));

const StepTwoFormComponent = ({
  formData,
  handleFormChange,
  setFormData,
  isShifted,
  hasMenuOpen,
  setHasMenuOpen,
  addSecondItemButton,
  setAddSecondItemButton,
  handleAddSecondItem,
}) => {
  const name = "ingredient";
  const [hasSentAlert, setHasSentAlert] = useState(getHasSentAlert());
  const [shiftPressed, setShiftPressed] = useState(false);
  // useEffect(() => {
  //   let x = getHasSentAlert();
  //   if (x !== hasSentAlert) {
  //     setHasSentAlert(x);
  //   }
  // }, []);
  const dispatch = useDispatch();
  const [focusState, setFocusState] = useState({
    ingredient: {
      shrink: Boolean(formData?.ingredient?.text?.length !== 0),
      focus: false,
    },
    amount: {
      shrink: Boolean(formData?.ingredient?.amount?.length !== 0),
      focus: false,
    },
    unit: {
      shrink: Boolean(formData?.ingredient?.unit?.length !== 0),
      focus: false,
    },
  });
  const sendAddIngredientNotification = () => {
    if (!hasSentAlert) {
      if (localStorage) {
        localStorage.setItem("hasSentAlert-ingredients", true);
        setHasSentAlert(true);
      }
      dispatch({
        type: Types.SHOW_SNACKBAR,
        payload: {
          message: "To add an ingredient, click the + icon or press ENTER.",
          variant: "info",
          vertical: "bottom",
          horizontal: "left",
          hideIn: 10000,
        },
      });
    }
  };

  const handleChange = (e) => {
    if (e.target.value.length === 3) {
      sendAddIngredientNotification();
    }

    console.log("formData: ", formData);
    if (formData.ingredients.length > 2) {
      setAddSecondItemButton(true);
    }
    if (e.target.name === "amount") {
      return setFormData({
        ...formData,
        ingredient: { ...formData.ingredient, amount: e.target.value },
      });
    }
    // };
    setFormData({
      ...formData,
      [e.target.name]: { ...formData[e.target.name], text: e.target.value },
    });
  };
  // Go back and change this to use users last used unit
  const addIngredient = (unit) => {
    if (formData.ingredients.length >= 1) {
      setAddSecondItemButton(true);
    }
    setFormData({
      ...formData,
      ingredients: [
        ...formData.ingredients,
        { ...formData.ingredient, unit: unit },
      ],
      ingredient: {
        text: "",
        optional: false,
        amount: 1,
        unit: { long: "cups", short: "cups" },
      },
    });
  };
  const classes = useStyles();
  const fauxListener = (title, type) => {
    console.log(focusState);

    if (title !== "unit") {
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
    }
  };
  const checkUnit = () => {
    let unit = formData.ingredient?.unit?.long?.toLowerCase();
    let units = getIngredientUnits().filter((u) => !u.isKey);
    let indexOf = units.map((u) => u.long.toLowerCase()).indexOf(unit);

    console.log(units, indexOf);
    return indexOf !== -1 ? units[indexOf] : false;
    // return
  };
  const keyObserver = (e) => {
    console.log("e: ", e);
    if (!e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      let validated = {
        text: Boolean(formData.ingredient.text.length >= 3),
        amount: Boolean(
          typeof parseFloat(formData.ingredient.amount) === "number"
        ),
        unit: checkUnit(),
      };
      if (Object.values(validated).every((i) => i)) {
        addIngredient(validated.unit);
      }
    }
    if (e.shiftKey) {
      setShiftPressed(true);
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
        name={name}
        onFocus={() => fauxListener("ingredient", "focus")}
        onBlur={() => fauxListener("ingredient", "blur")}
        fullWidth
        autoFocus
        multiline
        label="Ingredient"
        onChange={handleChange}
        onKeyDown={keyObserver}
        onKeyUp={(e) => {
          if (!e.shiftKey) {
            setShiftPressed(false);
          }
        }}
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
        InputProps={{
          // endAdornment: ingredientAdornment(
          //   formData,
          //   setFormData,
          //   focusState.ingredient.focus,
          //   addIngredient,
          //   name,
          //   shiftPressed,
          //   formData?.ingredient?.text,
          //   hasMenuOpen,
          //   setHasMenuOpen
          // ),
          classes: {
            root: clsx("inputListener", classes.inputroot),
            input: classes.inputRoot,
            focused: classes.inputFocused,
          },
        }}
      />
      <Typography
        align="center"
        classes={{
          root: clsx(
            classes.typographyRoot,
            focusState.amount.focus && classes.typographyRootFocused,
            focusState.unit.focus && classes.typographyRootFocused
          ),
        }}
      >
        How Much?
      </Typography>
      <div className={clsx(classes.unitAndAmountContainer)}>
        <div className={clsx(classes.amountContainer)}>
          <TextField
            name="amount"
            id="recipeIngredientAmountInput"
            label="Amount"
            fullWidth
            onFocus={() => fauxListener("amount", "focus")}
            onBlur={() => fauxListener("amount", "blur")}
            onChange={handleChange}
            value={formData.ingredient.amount}
            focused={focusState.amount.focus}
            InputLabelProps={{
              focused: focusState.amount.focus,
              shrink: Boolean(formData?.ingredient.amount?.length !== 0),
              classes: {
                root: clsx(
                  classes.inputLabelRoot,
                  focusState.amount.focus && classes.inputLabelFocused,
                  formData?.ingredient.amount?.length !== 0 &&
                    classes.inputLabelWithValue
                ),
                required: classes.inputLabelRequired,
              },
            }}
            inputProps={{
              className: "inputListener",
              pattern: "\\d*",
            }}
            InputProps={{
              classes: {
                root: clsx("inputListener", classes.inputroot),
                input: classes.inputRoot,
                focused: classes.inputFocused,
              },
            }}
            onKeyDown={(e) => {
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
        <div className={clsx(classes.unitContainer)}>
          <UnitSelectCompact
            name="unit"
            id="recipeIngredientUnitInput"
            label="Unit"
            fullWidth
            focusState={focusState}
            setFocusState={setFocusState}
            // Each item id format to send whole object to state
            // `unit-${index}`
            selectedUnit={formData.ingredient.unit}
            addIngredient={addIngredient}
            focused={focusState.unit.focus}
            setFormData={setFormData}
            formData={formData}
            InputLabelProps={{
              focused: focusState.unit.focus,
              shrink: Boolean(formData?.ingredient.unit.long?.length !== 0),
              classes: {
                root: clsx(
                  classes.inputLabelRoot,
                  focusState.unit.focus && classes.inputLabelFocused,
                  formData?.ingredient.unit.long?.length !== 0 &&
                    classes.inputLabelWithValue
                ),
                required: classes.inputLabelRequired,
              },
            }}
            inputProps={{
              className: "inputListener",
            }}
            InputProps={{
              classes: {
                root: clsx("inputListener", classes.inputrootSelect),
                input: classes.inputRoot,
                focused: classes.inputFocused,
              },
            }}
            // onKeyDown={keyObserver}
            onKeyUp={(e) => {
              if (!e.shiftKey) {
                setShiftPressed(false);
              }
            }}
          />
        </div>
      </div>
      <div className={classes.bottomContainer}>
        <div className={classes.addSecondItemButtonContainer}>
          {addSecondItemButton && (
            <Button
              onClick={handleAddSecondItem}
              classes={{
                root: clsx(
                  classes.addSecondItemButton,
                  hasMenuOpen && "hideButtons",
                  "addSecondItemButtonAnimate"
                ),
                label: clsx(
                  classes.addSecondItemButtonLabel,
                  hasMenuOpen && "hideButtons"
                ),
              }}
            >
              Add Second Item
            </Button>
          )}
        </div>
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
    </div>
  );
};

export default StepTwoFormComponent;
