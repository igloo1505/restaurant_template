import React, { useState, useEffect, Fragment, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import StepThreeDisplayComponent from "./StepThreeDisplayComponent";
import StepThreeFormComponent from "./StepThreeFormComponent";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateAreas: '"form display"',
    maxHeight: "100%",
  },
}));
const StepThreeForm = (props) => {
  const classes = useStyles();
  const [isShifted, setIsShifted] = useState(
    props.formData.directions.length !== 0
  );
  const [formHeightLimit, setFormHeightLimit] = useState(400);
  useEffect(() => {
    if (props.formData?.directions.length !== 0) {
      setIsShifted(true);
    }
    if (props.formData?.directions.length === 0) {
      setIsShifted(false);
    }
  }, [props.formData]);
  return (
    <div className={classes.container}>
      <StepThreeFormComponent
        {...props}
        isShifted={isShifted}
        setIsShifted={setIsShifted}
        formHeightLimit={formHeightLimit}
      />
      <StepThreeDisplayComponent
        {...props}
        isShifted={isShifted}
        setIsShifted={setIsShifted}
      />
    </div>
  );
};

export default StepThreeForm;
