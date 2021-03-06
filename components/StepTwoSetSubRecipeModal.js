/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import * as Types from "../stateManagement/TYPES";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CancelIcon from "@material-ui/icons/ClearSharp";

const useClasses = makeStyles((theme) => ({
  outerContainer: {
    minWidth: "400px",
    minHeight: "150px",
    padding: "0.75rem 0.75rem 0.75rem 0.75rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  inputRoot: {

  },
  inputInput: {
    fontSize: "2rem",
  },
  inputLabelRoot: {
    fontSize: "1.7rem",
  },
  inputLabelShrink: {
    fontSize: "1rem",
  },
  textFieldRoot: {
    maxWidth: "100% !important",
    minWidth: "190px",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "1.5rem",
  },
  currentSubRecipes: {
    width: "calc(100% - 1.5rem)",
    display: "grid",
    gap: "0.75rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(calc(50% - 1.5rem), 1fr))",
  },
  currentSubRecipeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.75rem 0.5rem",
    gap: "0.5rem",
    // maxWidth: "fit-content",
    width: "auto",
    // backgroundColor: theme.palette.secondary.light,
    borderRadius: "5px",
    border: `3px solid ${theme.palette.secondary.light}`,
    boxShadow: `5px 5px 3px ${theme.palette.grey[400]}, -5px 5px 3px ${theme.palette.grey[300]}`,
    background: "linear-gradient(145deg, #fb6711, #d4560e)",
    transition: theme.transitions.create(["box-shadow"], {
      duration: 450,
    }),
    "&:hover": {
      cursor: "pointer",
      boxShadow: `3px 3px 9px ${theme.palette.grey[400]}, -3px 3px 9px ${theme.palette.grey[300]}`,
    },
  },
  currentSubRecipeContainerSelected: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // padding: "0.75rem 0.75rem 0.75rem 0.5rem",
    padding: "0.75rem 0.5rem",
    gap: "0.35rem",
    boxShadow: "inset 5px 5px 3px #c5510d, inset -5px -5px 3px #ff6f13",
    borderRadius: "5px",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "inset 5px 5px 5px #cf540e, inset -5px -5px 5px #ff6c12",
      backgroundColor: theme.palette.secondary.main,
    },
  },
  buttonLabel: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.grey[200],
    padding: "1rem 0.5rem",
    // gap: "0.25rem",
    textTransform: "none",
  },
  buttonLabelSelected: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    gap: "0.25rem",
  },
  typographyContainer: {

  },
  iconRoot: {
    width: "1rem",
    height: "1rem",
    color: "#ffff",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  itemTextRoot: {
    color: theme.palette.grey[200],
    // color: "#fff",
    fontWeight: "bold",
  },
  itemTextRootSelected: {
    // color: theme.palette.secondary.main,
    color: "#ffffff",
    fontWeight: "bold",
  },
  buttonRoot: {
    padding: "0.5rem 0.8rem",
    // fontSize: "1.1rem",
  },
  buttonContainer: {
    margin: "0.75rem 0.75rem 0rem 0rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: "0.75rem"
  },
}));

const Modal_setSubRecipeTitle = ({
  alert: {
    subRecipe: { title, titles, currentSubRecipeIndex },
  },
}) => {
  const classes = useClasses();
  const dispatch = useDispatch();

  const [_titles, set_titles] = useState([]);
  useEffect(() => {
    set_titles(titles);
  }, [titles]);

  const [focusState, setFocusState] = useState({
    shrink: false,
    focused: false,
    error: false,
  });

  const handleChange = (e) => {
    let _error = Boolean(e.target.value.length >= 40);

    setFocusState({
      ...focusState,
      shrink: Boolean(e.target.value.length !== 0),
      error: _error,
    });
    dispatch({
      type: Types.SET_SUB_RECIPE_TITLE,
      payload: e.target.value,
    });
  };

  const toggleSubRecipeIndex = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === "Tab") {
      e.preventDefault();
      e.stopPropagation();
      dispatch({
        type: Types.LOOP_THROUGH_SUB_RECIPES,
        payload: "leftKey",
      });
    }

  };

  const closeNoSubmit = (e) => {
    dispatch({
      type: Types.CLOSE_SUB_RECIPE_MODAL,
    });
  }

  const handleSubmit = () => {
    if (title.length >= 3) {
      dispatch({
        type: Types.SUBMIT_SUB_RECIPE_TITLE,
      });
    } else {
      dispatch({
        type: Types.CLOSE_SUB_RECIPE_MODAL,
      });
    }
  };
  const handleRemoveSubRecipe = (index) => {
    dispatch({
      type: Types.REMOVE_SUB_RECIPE_INDEX,
      payload: index,
    });
  };

  return (
    <div className={classes.outerContainer}>
      <div className={classes.innerContainer}>
        <TextField
          label={focusState.error ? "Too Long!" : focusState.shrink ? "Add sub-title" : "Dressing? Secret Sauce?"}
          value={title}
          name="title"
          error={focusState.error}
          autoFocus
          onKeyDown={toggleSubRecipeIndex}
          onChange={handleChange}
          classes={{ root: classes.textFieldRoot }}
          fullWidth
          InputProps={{
            classes: {
              root: classes.inputRoot,
              input: classes.inputInput,
            }
          }}
          InputLabelProps={{
            focused: focusState.focused,
            shrink: focusState.shrink,
            classes: {
              root: classes.inputLabelRoot,
              shrink: classes.inputLabelShrink,
            }
          }}
          onFocus={() => {
            setFocusState({
              ...focusState,
              shrink: Boolean(title.length !== 0),
              focused: true,
            });
          }}
          onBlur={() => {
            setFocusState({
              ...focusState,
              shrink: Boolean(title.length !== 0),
              focused: false,
            });
          }}
        />
        <div className={classes.currentSubRecipes}>
          {_titles.length > 0 &&
            (
              <SubRecipeButton
                index={-1}
                classes={classes}
                handleRemoveSubRecipe={handleRemoveSubRecipe}
                currentSubRecipeIndex={currentSubRecipeIndex}
                title={"Main"}
              />
            )
          }
          {_titles.map((title, index) => {
            return (
              <SubRecipeButton
                index={index}
                key={index}
                classes={classes}
                handleRemoveSubRecipe={handleRemoveSubRecipe}
                currentSubRecipeIndex={currentSubRecipeIndex}
                title={title}
              />
            );
          })}
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <Button classes={{ root: classes.buttonRoot }} onClick={closeNoSubmit} variant="contained" color="warning" >
          Close
        </Button>
        <Button classes={{ root: classes.buttonRoot }} color="primary" onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  alert: state.alert,
  props: props,
});

export default connect(mapStateToProps)(Modal_setSubRecipeTitle);

const _SubRecipeButton = ({
  index,
  classes,
  handleRemoveSubRecipe,
  currentSubRecipeIndex,
  title,
  alert: {
    subRecipe: { isSubRecipe },
  },
}) => {
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState(
    Boolean(index === currentSubRecipeIndex)
  );
  useEffect(() => {
    console.log('isSubRecipe: ', isSubRecipe);
    setIsSelected(Boolean(index === isSubRecipe));
  }, [index, currentSubRecipeIndex, isSubRecipe]);
  const handleItemClick = (e) => {
    dispatch({
      type: Types.SET_SUB_RECIPE_VALUE,
      payload: index,
    });
  };
  return (
    <Button
      key={index}
      color="secondary"
      variant="contained"
      classes={{
        root: clsx(
          classes.currentSubRecipeContainer,
          isSelected && classes.currentSubRecipeContainerSelected
        ),
        label: clsx(
          classes.buttonLabel,
          isSelected && classes.buttonLabelSelected
        ),
      }}
      onClick={handleItemClick}
    >
      <div className={classes.typographyContainer}>
        <Typography
          variant="body1"
          classes={{
            root: clsx(
              classes.itemTextRoot,
              index === currentSubRecipeIndex && classes.itemTextRootSelected
            ),
          }}
        >
          {title}
        </Typography>
      </div>
    </Button>
  );
};

const _mapStateToProps = (state, props) => ({
  alert: state.alert,
  props: props,
});

const SubRecipeButton = connect(_mapStateToProps)(_SubRecipeButton);
