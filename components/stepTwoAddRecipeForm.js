import React, { useState, useEffect, Fragment, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useDispatch, connect } from "react-redux";
import StepTwoFormComponent from "./StepTwoFormComponent";
import StepTwoDisplayComponent from "./StepTwoDisplayComponent";
import * as Types from "../stateManagement/TYPES";
// import Stepper from "@material-ui/core/Stepper";
// import Step from "@material-ui/core/Step";
// import StepLabel from "@material-ui/core/StepLabel";
// import Paper from "@material-ui/core/Paper";
// import Slide from "@material-ui/core/Slide";
// import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateAreas: '"form display"',
    gap: "3rem",
    maxHeight: "100%",
    [theme.breakpoints.down(600)]: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    [theme.breakpoints.down(960)]: {
      gap: "1.5rem",
    },
  },
}));

const StepTwoAddRecipeForm = ({
  alert: {
    subRecipe: { titles: subRecipeTitles, isSubRecipe },
  },
  UI: {
    addRecipe: {
      formData
    }
  },
  ...props
}) => {
  const dispatch = useDispatch();

  const [isShifted, setIsShifted] = useState(
    formData.ingredients.length !== 0
  );
  const [formHeightLimit, setFormHeightLimit] = useState(400);

  const setSubRecipeFormData = (newData) => {
    dispatch({
      type: Types.SET_ADD_RECIPE_FORM_DATA,
      payload: {
        ...formData,
        subRecipes: newData,
      }
    })
  }
  const setIsSubRecipe = (data) => {
    dispatch({
      type: Types.SET_SUB_RECIPE_VALUE,
      payload: data,
    });

  };



  useEffect(() => {
    () => {
      // let lengths = 
    }
    // TODO toggle here based on each specific active subrecipe length rather than only ingredients.
    if (formData?.ingredients.length !== 0) {
      setIsShifted(true);
    }
    if (formData?.ingredients.length === 0) {
      setIsShifted(false);
    }
  }, [formData]);
  const classes = useStyles();

  return (
    <div className={clsx(classes.container)}>
      <StepTwoFormComponent
        {...props}
        isShifted={isShifted}
        setIsShifted={setIsShifted}
        formHeightLimit={formHeightLimit}
        isSubRecipe={isSubRecipe}
        setIsSubRecipe={setIsSubRecipe}
        setSubRecipeFormData={setSubRecipeFormData}
      />
      <StepTwoDisplayComponent
        {...props}
        isShifted={isShifted}
        setIsShifted={setIsShifted}
        formHeightLimit={formHeightLimit}
        setSubRecipeFormData={setSubRecipeFormData}
      />
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  alert: state.alert,
  UI: state.UI,
  props: props,
});

export default connect(mapStateToProps)(StepTwoAddRecipeForm);
