import React, { useState, useEffect, Fragment, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import DisplayItem from "./formDisplayItem";

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    gridArea: "display",
    zIndex: 0,
    transform: "translateX(-50%)",
    transition: theme.transitions.create(["transform"], {
      duration: 500,
    }),
  },
  outerContainerShifted: {
    transform: "translateX(0%)",
    marginLeft: "10px",
    transition: theme.transitions.create(["transform"], {
      duration: 500,
    }),
  },
}));

const StepThreeDisplayComponent = ({
  isShifted,
  setIsShifted,
  formHeightLimit,
  formData,
  setFormData,
}) => {
  const classes = useStyles();
  const removeItem = (e, item, text) => {
    setFormData({
      ...formData,
      directions: formData.directions.filter((d) => d !== text),
    });
  };

  return (
    <div
      className={clsx(
        classes.outerContainer,
        isShifted && classes.outerContainerShifted
      )}
    >
      {formData?.directions.map((item) => (
        <DisplayItem text={item} removeItem={removeItem} />
      ))}
    </div>
  );
};

export default StepThreeDisplayComponent;
