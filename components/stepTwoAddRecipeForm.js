import React, { useState, useEffect, Fragment, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import StepTwoFormComponent from "./StepTwoFormComponent";
import StepTwoDisplayComponent from "./StepTwoDisplayComponent";
import gsap from "gsap";
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

const StepTwoAddRecipeForm = (props) => {
  const [isShifted, setIsShifted] = useState(
    props.formData.ingredients.length !== 0
  );
  const [formHeightLimit, setFormHeightLimit] = useState(400);
  const [isSubRecipe, setIsSubRecipe] = useState(false);
  const [subRecipeFormData, setSubRecipeFormData] = useState({
    title: "",
    ingredients: [],
    ingredient: {
      ingredient: "",
      optional: false,
      amount: 1,
      unit: { long: "Cups", short: "cups", key: "Volume" },
    },
  });

  useEffect(() => {
    console.log("props.formData: ", props.formData);
  }, [props.formData]);

  useEffect(() => {
    console.log(
      "subRecipeFormData, isSubRecipe: ",
      subRecipeFormData,
      isSubRecipe
    );
  }, [subRecipeFormData, isSubRecipe]);

  useEffect(() => {
    if (props.formData?.ingredients.length !== 0) {
      setIsShifted(true);
    }
    if (props.formData?.ingredients.length === 0) {
      setIsShifted(false);
    }
  }, [props.formData]);
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
        subRecipeFormData={subRecipeFormData}
        setSubRecipeFormData={setSubRecipeFormData}
      />
      <StepTwoDisplayComponent
        {...props}
        isShifted={isShifted}
        setIsShifted={setIsShifted}
        formHeightLimit={formHeightLimit}
        isSubRecipe={isSubRecipe}
        setIsSubRecipe={setIsSubRecipe}
        subRecipeFormData={subRecipeFormData}
        setSubRecipeFormData={setSubRecipeFormData}
      />
    </div>
  );
};

export default StepTwoAddRecipeForm;
