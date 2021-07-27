import React, { Fragment, useEffect, useState } from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import UnitSelectDestructed from "./UnitSelectDestructured";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

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
  textFieldWrapper: {
    padding: "0px 5px 5px 5px",
  },
  textFieldWrapperFocused: {},
  textFieldWrapperShrunk: {},
  inputRoot: {
    color: "#fff",
    paddingLeft: "7px",
    paddingRight: "7px",
    zIndex: 999,
    "&:before": {
      // border: "1px solid green",
      borderBottom: "1px solid #fff",
    },
  },
  inputroot: {
    color: "#fff",
    border: `2px solid ${theme.palette.secondary.main}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:before": {
      borderBottom: "1px solid #fff",
    },
    "&:hover:not(.Mui-disabled):before": {
      // Underline when hovered
      borderBottom: "2px solid #fff",
    },
    "&:after": {
      // borderBottom: `1px solid ${theme.palette.secondary.light}`,
    },
  },
  descriptionInputRoot: {
    // padding: "8px 2px 9px 2px", paddingBottom: "9px",
    border: `2px solid ${theme.palette.secondary.main}`,

    "&:before": {
      borderBottom: "1px solid #fff",
    },
    "&:after": {},
    "&:hover:not(.Mui-disabled):before": {
      borderBottom: "2px solid #fff",
    },
  },
  descriptionInputFocused: {
    "&::before": {
      background:
        "linear-gradient(145deg, #d4560e 0%, #eb6010 7%, #eb6010 80%, #fb6711 100%) !impo" +
        "rtant",
    },
  },
  inputFocused: {
    color: "#fff",
    boxShadow: "2px 2px 2px #cf540e, -2px -2px 2px #ff6c12",
    border: `2px solid ${theme.palette.primary.main}`,
    transition: theme.transitions.create(["box-shadow"], { duration: 250 }),
    "&:hover": {
      border: `2px solid ${theme.palette.primary.light}`,
    },
    "&:hover:not(.Mui-disabled):before": {
      borderBottom: "none",
    },
    "&::before": {
      borderBottom: "none",
      content: '""',
      position: "absolute",
      // background: "linear-gradient(145deg, #d4560e, #fb6711)", background:
      // "linear-gradient(145deg, rgba(212,86,14,1) 0%, rgba(251,103,17,1) 17%)",
      background:
        "linear-gradient(145deg, #d4560e 0%, #eb6010 5%, #eb6010 75%, #fb6711 100%)",
      height: "calc(100% - 0px)",
      width: "calc(100% - 0px)",
      boxShadow: "inset 3px 3px 6px #cc540e, inset -3px -3px 6px #ff6c12",
      // borderRadius: "4px", background: theme.palette.secondary.main, zIndex: -999,
      // boxShadow: "3px 3px 6px #cc540e, -3px -3px 6px #ff6c12", transition:
      // theme.transitions.create(   ["box-shadow", "transform", "border"],   {
      // duration: 250,   } ),
    },
    "&:after": {
      borderBottom: "none",
      width: "calc(100% - 12px)",
      marginLeft: "4px",
      // borderBottom: `2px solid ${theme.palette.primary.light}`,
    },
  },
  inputLabelRoot: {
    color: "#e0e0e0",
    zIndex: 999,
  },
  inputLabelWithValue: {
    color: "#fff",
    // transform: "translate(2px, 2px)"
    transform: "translate(2px, 0px) !important",
    fontSize: "0.7rem",
    "&.Mui-focused": {
      // boxShadow: "2px 0px 2px #cf540e, -2px -2px 2px #ff6c12", padding: "0px 3px
      // 3px 3px",
    },
  },
  descriptionLabelRoot: {
    transform: "translate(10px, 34px)",
    color: "#e0e0e0",
    transition: theme.transitions.create(["box-shadow", "transform"], {
      duration: 250,
    }),
  },
  descriptionInputLabelFocused: {
    transform: "translate(2px, -5px)",
    fontSize: "0.7rem",
    color: "#fff !important",
    zIndex: 100,
    // "&.Mui-focused": { boxShadow: "2px 0px 2px #cf540e, -2px -2px 2px #ff6c12",
    // padding: "0px 3px 3px 3px", },
  },
  inputLabelRequired: {},
  inputLabelFocused: {
    color: "#fff !important",
    transform: "translate(10px, 27px)",
  },
  descriptionInputInput: {
    color: "#fff",
    padding: "5px 8px 8px",
    zIndex: 999,
  },
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
    hasMenuOpen,
    setHasMenuOpen,
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
      title: {
        ...focusState.title,
        focus: true,
      },
    });
  }, []);

  return (
    <Fragment>
      <Typography
        variant="h6"
        gutterBottom
        style={{
          color: "#fff",
        }}
      >
        Let's get some information about your recipe!
      </Typography>
      <Grid
        container
        spacing={3}
        className="addRecipeFormContainer"
        classes={{
          root: classes.gridRoot,
        }}
      >
        <Grid item xs={12} sm={4}>
          <div
            className={clsx(
              classes.textFieldWrapper,
              focusState?.title?.focus && classes.textFieldWrapperFocused,
              Boolean(formData?.title?.length !== 0) &&
                classes.textFieldWrapperShrunk
            )}
          >
            <TextField // required
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
              focused={focusState.title.focus}
              formData={formData}
              InputLabelProps={{
                focused: focusState.title.focus,
                shrink: Boolean(formData?.title?.length !== 0),
                classes: {
                  root: clsx(
                    classes.inputLabelRoot,
                    focusState.title.focus && classes.inputLabelFocused,
                    formData?.title?.length !== 0 && classes.inputLabelWithValue
                  ),
                  required: classes.inputLabelRequired,
                },
              }}
              inputProps={{
                className: "inputListener",
              }}
              InputProps={{
                classes: {
                  root: clsx("inputListener", classes.inputroot),
                  input: classes.inputRoot,
                  focused: classes.inputFocused,
                },
              }}
              classes={{
                root: classes.textFieldRoot,
              }}
            />
          </div>
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
            value={formData.servings}
            classes={{
              root: classes.textFieldRoot,
            }}
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
          <TextField // required
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
              setPlaceHolder(true);
              setShouldShrinkDescription(true);
            }}
            onBlur={() => {
              if (formData.description === "") {
                fauxListener("description", "blur");
                setPlaceHolder(true);
                setShouldShrinkDescription(false);
              }
            }}
            value={formData.description}
            classes={{
              root: classes.textFieldRoot,
            }}
            InputLabelProps={{
              focused: focusState.description.focus,
              shrink: shouldShrinkDescription,
              classes: {
                root: clsx(
                  classes.descriptionLabelRoot,
                  focusState.description.focus &&
                    classes.descriptionInputLabelFocused
                ),
                required: classes.inputLabelRequired,
              },
            }}
            InputProps={{
              classes: {
                root: clsx("inputListener", classes.descriptionInputRoot),
                input: classes.descriptionInputInput,
                focused: clsx(
                  classes.inputFocused,
                  classes.descriptionInputFocused
                ),
              },
            }}
            inputProps={{
              className: "inputListener",
            }}
          />
          <style jsx>
            {`
              input[type=number]: {
                -webkit-appearance: none;
                -moz-appearance: none;
              }
              ::-webkit-textfield-decoration-container: {
                content: none;
              }
            `}
          </style>
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
