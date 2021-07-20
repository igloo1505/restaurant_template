import React, { Fragment, useEffect, useState } from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { GridItem } from "./UIComponents";
import UnitSelectDestructed from "./UnitSelectDestructured";
import NeumorphicTextField from "./NeumorphicTextField";
import { unitObject } from "../util/appWideData";
import NoSsr from "@material-ui/core/NoSsr";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
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
  descriptionInputRoot: {
    "&:before": { borderBottom: "1px solid #fff" },
    "&:after": {},
    "&:hover:not(.Mui-disabled):before": { borderBottom: "2px solid #fff" },
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
  descriptionInputInput: { color: "#fff" },
  gridRoot: {
    // padding: "12px 0px 12px 12px",
    "& > .MuiGrid-item": {
      // padding: "12px 0px 12px 12px",
    },
  },
  gridItemRoot: {},
}));

const StepOneFormComponent = ({
  props: {
    handleFormChange,
    formData,
    setFormData,
    placeHolder,
    setPlaceHolder,
  },
}) => {
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(false);
  const initialFocusState = {
    title: {
      focus: false,
      shrink: false,
    },
    servings: {
      focus: false,
      shrink: false,
    },
    description: {
      focus: false,
      shrink: false,
    },
  };
  const [focusState, setFocusState] = useState(initialFocusState);
  const [shouldShrinkDescription, setShouldShrinkDescription] = useState(false);
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
  useEffect(() => {
    setFocusState({
      ...focusState,
      title: { ...focusState.title, focus: true },
    });
  }, []);

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom style={{ color: "#fff" }}>
        Let's get some information about your recipe!
      </Typography>
      <Grid
        container
        spacing={3}
        className="addRecipeFormContainer"
        classes={{ root: classes.gridRoot }}
      >
        <Grid item xs={12} sm={4}>
          <NeumorphicTextField
            // required
            id="recipeTitleInput"
            name="title"
            onFocus={() => fauxListener("title", "focus")}
            onBlur={() => fauxListener("title", "blur")}
            fullWidth
            autoFocus
            multiline
            label="Recipe's title "
            onChange={handleFormChange}
            value={formData.title}
            focusState={focusState}
            formData={formData}
            InputLabelProps={{
              focused: focusState.title.focus,
              shrink: Boolean(formData?.title?.length !== 0),
              // classes: {
              //   root: clsx(
              //     classes.inputLabelRoot,
              //     focusState.title.focus && classes.inputLabelFocused,
              //     formData?.title?.length !== 0 && classes.inputLabelWithValue
              //   ),
              //   required: classes.inputLabelRequired,
              // },
            }}
            inputProps={{ className: "inputListener" }}
            InputProps={{
              classes: {
                root: clsx("inputListener", classes.inputroot),
                input: classes.inputRoot,
                focused: classes.inputFocused,
              },
            }}
            classes={{ root: classes.textFieldRoot }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="recipeServingInput"
            name="servings"
            onFocus={() => fauxListener("servings", "focus")}
            onBlur={() => fauxListener("servings", "blur")}
            type="number"
            fullWidth
            label="Servings"
            onChange={handleFormChange}
            inputProps={{ className: "inputListener", pattern: "\\d*" }}
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
            value={formData.servings}
            classes={{ root: classes.textFieldRoot }}
            InputLabelProps={{
              focused: focusState.servings.focus,
              shrink: Boolean(formData?.servings?.length !== 0),
              classes: {
                root: clsx(
                  classes.inputLabelRoot,
                  focusState.servings.focus && classes.inputLabelFocused,
                  formData?.servings?.length !== 0 &&
                    classes.inputLabelWithValue
                ),
                required: classes.inputLabelRequired,
              },
            }}
            InputProps={{
              classes: {
                root: clsx("inputListener", classes.inputroot),
                input: classes.inputRoot,
                focused: classes.inputFocused,
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <UnitSelectDestructed
            handleFormChange={handleFormChange}
            focusState={focusState}
            formData={formData}
            setFormData={setFormData}
            classes={classes}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            // required
            id="recipeDescriptionInput"
            name="description"
            onFocus={() => fauxListener("description", "focus")}
            onBlur={() => fauxListener("description", "blur")}
            label="Tell people about it!"
            {...(placeHolder && {
              placeholder:
                "Here's your chance to tell people about the deliciousness in detail.",
            })}
            fullWidth
            multiline
            onChange={handleFormChange}
            onFocus={() => {
              fauxListener("description", "focus");
              setShouldShrinkDescription(true);
              setPlaceHolder(true);
            }}
            onBlur={() => {
              if (formData.description === "") {
                fauxListener("description", "blur");
                setPlaceHolder(true);
                setTimeout(() => setShouldShrinkDescription(false), 300);
              }
            }}
            value={formData.description}
            classes={{ root: classes.textFieldRoot }}
            InputLabelProps={{
              focused: focusState.description.focus,
              shrink: shouldShrinkDescription,
              classes: {
                root: clsx(
                  classes.inputLabelRoot,
                  focusState.description.focus && classes.inputLabelFocused
                ),
                required: classes.inputLabelRequired,
              },
            }}
            InputProps={{
              classes: {
                root: clsx("inputListener", classes.descriptionInputRoot),
                input: classes.descriptionInputInput,
                focused: classes.inputFocused,
              },
            }}
            inputProps={{ className: "inputListener" }}
          />
          <style jsx>{`
            input[type=number]: {
              -webkit-appearance: none;
              -moz-appearance: none;
            }
            ::-webkit-textfield-decoration-container: {
              content: none;
            }
          `}</style>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = (state, props) => ({
  network: state.network,
  user: state.user,
  props: props,
});

export const StepOneForm = connect(mapStateToProps)(StepOneFormComponent);
