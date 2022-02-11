import React, { useState, useEffect, Fragment, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import StepThreeDisplayComponent from "./StepThreeDisplayComponent";
import { connect, useDispatch } from 'react-redux';
import StepThreeFormComponent from "./StepThreeFormComponent";


// TODO: add snackbar to keyword "degrees" and suggest replacing with U+00B0 || &deg;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateAreas: '"form display"',
    maxHeight: "100%",
    [theme.breakpoints.down(600)]: {
      display: "flex",
      flexDirection: "column",
      gap: "2.5rem",
    },
  },
}));
const StepThreeForm = ({ props: { ...props }, UI: { addRecipe: { formData } } }) => {
  const classes = useStyles();
  const [isShifted, setIsShifted] = useState(
    formData.directions.length !== 0
  );

  useEffect(() => {
    if (formData?.directions.length !== 0) {
      setIsShifted(true);
    }
    if (formData?.directions.length === 0) {
      setIsShifted(false);
    }
  }, [formData]);
  return (
    <div className={classes.container}>
      <StepThreeFormComponent
        {...props}
        isShifted={isShifted}
        setIsShifted={setIsShifted}
      />
      <StepThreeDisplayComponent
        {...props}
        isShifted={isShifted}
        setIsShifted={setIsShifted}
      />
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  UI: state.UI,
  alert: state.alert,
  props: props
});

export default connect(mapStateToProps)(StepThreeForm)
