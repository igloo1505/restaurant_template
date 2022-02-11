import React, { useState, useEffect, Fragment, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import * as Types from '../stateManagement/TYPES';
import { connect, useDispatch } from 'react-redux';
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
    height: "fit-content",
    overflowY: "auto",
    overflowX: "hidden",
    minWidth: "200px",
    width: '100%',
    display: 'flex',
    // gridColumnGap: '10px',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    // gridAutoRows: "minmax(50px, auto)",

    "$:nth-child(3n+1)": { order: 1 },
    "$:nth-child(3n+2)": { order: 2 },
    "$:nth-child(3n)": { order: 3 },
    "&:before": {
      content: "",
      flexBasis: "100%",
      width: 0,
      order: 2,
    },
    "&:after": {
      content: "",
      flexBasis: "100%",
      width: 0,
      order: 2,
    },
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
  formHeightLimit,
  UI: {
    addRecipe: {
      formData
    }
  },
  alert: {
    subRecipe: {
      isSubRecipe
    },
  },
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const setFormData = (newFormData) => {
    dispatch({
      type: Types.SET_ADD_RECIPE_FORM_DATA,
      payload: newFormData,
    })
  }
  const setSubRecipeFormData = (newFormData) => {
    dispatch({
      type: Types.SET_ADD_RECIPE_FORM_DATA,
      payload: {
        ...formData,
        subRecipes: newFormData
      },
    })
  }
  useEffect(() => {
    let totalLength = isSubRecipe < 0 ? formData.ingredients.length : formData.subRecipes?.[isSubRecipe]?.ingredients.length
    let _t = 0.15 - totalLength * 0.02
    console.log('totalLength: ', totalLength, _t);
    console.log('_t: ', _t);
    // staggerDisplayItemEntrance(_t);
    // staggerDisplayItemEntrance(0.15);
  }, [isSubRecipe, formData.ingredients, formData.subRecipes]);
  useEffect(() => {
    let totalLength = isSubRecipe < 0 ? formData.ingredients.length : formData.subRecipes?.[isSubRecipe]?.ingredients.length
    console.log('totalLength: ', totalLength);
    let _t = 0.15 - totalLength * 0.02
    if (_t <= 0 || totalLength < 5) {
      _t = 0.15
    }
    console.log('_t: ', _t);
    // staggerDisplayItemEntrance(_t);
    staggerDisplayItemEntrance(_t);
  }, [isSubRecipe]);
  const removeItem = (e, item, index) => {
    let data = {};
    let storedData = localStorage.getItem("ingredients");
    storedData = JSON.parse(storedData);
    storedData = Object.values(storedData).filter((s) => s !== item.text);
    storedData.forEach((s, i) => (data[i] = s));
    localStorage.setItem("ingredients", JSON.stringify(data));
    let filteredIngredients =
      isSubRecipe >= 0
        ? formData?.subRecipes?.[isSubRecipe].ingredients.filter(
          (i) => i.ingredient !== item.ingredient
        )
        : formData?.ingredients.filter((i) => i.text !== item.text);
    if (filteredIngredients.length < 2) {
      dispatch({
        type: Types.SET_ALLOW_SUB_RECIPE,
        payload: false
      })
    }
    if (isSubRecipe >= 0) {
      dispatch({
        type: Types.SET_ADD_RECIPE_FORM_DATA,
        payload: {
          ...formData,
          subRecipes: [
            ...formData?.subRecipes.slice(0, isSubRecipe),
            {
              ...formData?.subRecipes?.[isSubRecipe],
              ingredients: filteredIngredients,
            },
            ...formData?.subRecipes.slice(isSubRecipe + 1),
          ],
        }
      })
    }
    if (isSubRecipe < 0) {
      setFormData({
        ...formData,
        ingredients: filteredIngredients,
      });
    }
  };

  console.log('isSubRecipe: ', isSubRecipe);
  return (
    <div
      className={clsx(
        classes.container,
        !isShifted && classes.transformContainer
      )}
    // style={{
    //   maxHeight: `${formHeightLimit}px`,
    // }}
    >
      {isSubRecipe >= 0 &&
        formData?.subRecipes?.[isSubRecipe]?.ingredients.map((item, index, a) => (
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

const mapStateToProps = (state, props) => ({
  UI: state.UI,
  alert: state.alert,
  props: props
});

export default connect(mapStateToProps)(StepTwoDisplayComponent)

export const staggerDisplayItemEntrance = (stagger) => {
  let _stagger = stagger || 0.15
  gsap.fromTo(".formDisplayItem", {
    stagger: _stagger,
    scaleY: 0.0001,
    duration: 0.5,
    ease: "elastic.out(1, 0.7)",
  },
    {
      stagger: _stagger,
      scaleY: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.7)",
    }
  );
};