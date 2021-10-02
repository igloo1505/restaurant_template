import React, { useState, useEffect, Fragment, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { FaBalanceScale as ScaleIcon } from "react-icons/fa";
import Tooltip from "@material-ui/core/Tooltip";
import { gsap } from 'gsap'
import DisplayItem from "./formDisplayItem";


const useStyles = makeStyles((theme) => ({
  container: {
    opacity: 1,
    gridArea: "display",
    // marginLeft: "10px",
    transform: "translateX(0%)",
    maxHeight: "100%",
    overflowY: "auto",
    overflowX: "hidden",
    minWidth: "200px",
    transition: theme.transitions.create(["transform"], {
      duration: 500,
    }),
  },
  transformContainer: {
    // transform: "translateX(-50%)",
    transform: "translateX(calc(-50% - 1.5rem))",
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
  setAddSecondItemButton,
  isSubRecipe,
  setIsSubRecipe,
  subRecipeFormData,
  setSubRecipeFormData,
}) => {
  const classes = useStyles();
  useEffect(() => {
    staggerDisplayItemEntrance();
  }, [isSubRecipe])
  const removeItem = (e, item, index) => {
    let data = {};
    let storedData = localStorage.getItem("ingredients");
    storedData = JSON.parse(storedData);
    storedData = Object.values(storedData).filter((s) => s !== item.text);
    storedData.forEach((s, i) => (data[i] = s));
    localStorage.setItem("ingredients", JSON.stringify(data));
    console.log("item", item);
    console.log("array", subRecipeFormData[isSubRecipe].ingredients);
    let filteredIngredients =
      isSubRecipe >= 0
        ? subRecipeFormData[isSubRecipe].ingredients.filter(
            (i) => i.ingredient !== item.ingredient
          )
        : formData?.ingredients.filter((i) => i.text !== item.text);
    if (filteredIngredients.length < 2) {
      setAddSecondItemButton(false);
    }
    if (isSubRecipe >= 0) {
      setSubRecipeFormData((prevState) => {
        console.log("filteredIngredients: ", filteredIngredients);
        return [
          ...prevState.slice(0, isSubRecipe),
          {
            ...prevState[isSubRecipe],
            ingredients: filteredIngredients,
          },
          ...prevState.slice(isSubRecipe + 1),
        ];
      });
    }
    if (isSubRecipe < 0) {
      setFormData({
        ...formData,
        ingredients: filteredIngredients,
      });
    }
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
      {isSubRecipe >= 0 &&
        subRecipeFormData[isSubRecipe]?.ingredients.map((item, index, a) => (
          <DisplayItem
            item={item}
            text={item.ingredient}
            index={index}
            array={a}
            name="ingredients-subRecipe"
            key={`${item.text}-${index}`}
            removeItem={removeItem}
          />
        ))}
      {isSubRecipe < 0 &&
        formData?.ingredients.map((item, index, a) => (
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

export const staggerDisplayItemEntrance = () => {
  gsap.fromTo(".formDisplayItem", {
    stagger: 0.15,
    scaleY: 0.0001,
    duration: 0.5,
    ease: "elastic.out(1, 0.7)",
  },
  {
    stagger: 0.15,
    scaleY: 1,
    duration: 0.5,
    ease: "elastic.out(1, 0.7)",
  }
  );
};