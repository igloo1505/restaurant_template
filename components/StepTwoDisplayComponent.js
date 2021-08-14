import React, { useState, useEffect, Fragment, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { FaBalanceScale as ScaleIcon } from "react-icons/fa";
import Tooltip from "@material-ui/core/Tooltip";
import DisplayItem from "./formDisplayItem";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Paper from "@material-ui/core/Paper";
// import Collapse from "@material-ui/core/Collapse";
// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
// import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  container: {
    opacity: 1,
    gridArea: "display",
    marginLeft: "10px",
    transform: "translateX(0%)",
    maxHeight: "100%",
    overflowY: "auto",
    transition: theme.transitions.create(["transform"], {
      duration: 500,
    }),
  },
  transformContainer: {
    transform: "translateX(-50%)",
    zIndex: -100,
    opacity: 0,
    // backgroundColor: theme.palette.secondary.main,
    transition: theme.transitions.create(["transform"], {
      duration: 500,
    }),
  },
}));

const StepTwoDisplayComponent = ({
  isShifted,
  formData,
  setFormData,
  formHeightLimit,
}) => {
  const classes = useStyles();
  const removeItem = (e, item) => {
    let data = {};
    let storedData = localStorage.getItem("ingredients");
    storedData = JSON.parse(storedData);
    storedData = Object.values(storedData).filter((s) => s !== item.text);
    storedData.forEach((s, i) => (data[i] = s));
    localStorage.setItem("ingredients", JSON.stringify(data));
    console.log("storedData: ", data);
    setFormData({
      ...formData,
      ingredients: formData?.ingredients.filter((i) => i.text !== item.text),
    });
  };

  return (
    <div
      className={clsx(
        classes.container,
        !isShifted && classes.transformContainer
      )}
      style={{
        maxHeight: `${formHeightLimit}px`,
      }}
    >
      {formData?.ingredients.map((item, index, a) => (
        <DisplayItem
          item={item}
          text={item.text}
          index={index}
          array={a}
          name="ingredients"
          key={`${item.text}-${index}`}
          removeItem={removeItem}
        />
      ))}
    </div>
  );
};

export default StepTwoDisplayComponent;
