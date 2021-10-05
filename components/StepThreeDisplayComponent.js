import React, { useState, useEffect, Fragment, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import DisplayItem from "./formDisplayItem";
import { connect, useDispatch } from 'react-redux';
import * as Types from '../stateManagement/TYPES';

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
  props: {

    isShifted,
    setIsShifted,
  },
  UI: {
    addRecipe: {
      formData
    }
  }
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const setFormData = (newFormData) => {
    dispatch({
      type: Types.SET_ADD_RECIPE_FORM_DATA,
      payload: newFormData
    })
  }
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
      {formData?.directions.map((item, index, array) => (
        <DisplayItem
          text={item}
          item={item}
          index={index}
          array={array}
          name="directions"
          removeItem={removeItem}
          key={`${item}-${index}`}
        />
      ))}
    </div>
  );
};


const mapStateToProps = (state, props) => ({
  UI: state.UI,
  user: state.user,
  alert: state.alert,
  props: props
});

export default connect(mapStateToProps)(StepThreeDisplayComponent)
