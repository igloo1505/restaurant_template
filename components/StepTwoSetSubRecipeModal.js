/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import * as Types from "../stateManagement/TYPES";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CancelIcon from "@material-ui/icons/CancelRounded";

const useClasses = makeStyles((theme) => ({
  outerContainer: {
    minWidth: "400px",
    minHeight: "150px",
    padding: "0.75rem 0.75rem 0.75rem 0.75rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "0.75rem",
    gap: "0.75rem",
  },
  currentSubRecipes: {
    display: "flex",
    flexDirection: "row",
    gap: "0.75rem",
  },
  currentSubRecipeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "0.75rem 0.75rem 0.75rem 0.5rem",
    gap: "0.35rem",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "5px",
    color: "#fff",
    "&:hover": {
      cursor: "pointer",
    },
  },
  iconRoot: {
    width: "0.85rem",
    height: "0.85rem",
  },
  itemTextRoot: {
    color: "#fff",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
}));

const Modal_setSubRecipeTitle = ({
  alert: {
    subRecipe: { title, titles },
  },
}) => {
  const classes = useClasses();
  const dispatch = useDispatch();
  const [focusState, setFocusState] = useState({
    shrink: false,
    focused: false,
  });
  const handleChange = (e) => {
    dispatch({
      type: Types.SET_SUB_RECIPE_TITLE,
      payload: e.target.value,
    });
    setFocusState({
      ...focusState,
      shrink: Boolean(e.target.value.length !== 0),
    });
  };
  const handleSubmit = () => {
    dispatch({
      type: Types.SUBMIT_SUB_RECIPE_TITLE,
    });
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
          label="Recipe Title"
          value={title}
          name="title"
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
          InputLabelProps={{
            focused: focusState.focused,
            shrink: focusState.shrink,
          }}
          onFocus={() => {
            setFocusState({
              shrink: Boolean(title.length !== 0),
              focused: true,
            });
          }}
          onBlur={() => {
            setFocusState({
              shrink: Boolean(title.length !== 0),
              focused: false,
            });
          }}
        />
        <div className={classes.currentSubRecipes}>
          {titles.map((title, index) => {
            return (
              <div key={index} className={classes.currentSubRecipeContainer}>
                <CancelIcon
                  classes={{ root: classes.iconRoot }}
                  onClick={() => handleRemoveSubRecipe(index)}
                />
                <Typography
                  variant="body1"
                  classes={{ root: classes.itemTextRoot }}
                >
                  {title}
                </Typography>
              </div>
            );
          })}
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <Button color="primary" onClick={handleSubmit}>
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
