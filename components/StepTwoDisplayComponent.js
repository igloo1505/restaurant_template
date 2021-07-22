import React, { useState, useEffect, Fragment, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  container: {
    opacity: 1,
    marginLeft: "10px",
    transform: "translateX(0%)",
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

const StepTwoDisplayComponent = ({ isShifted, formData, setFormData }) => {
  const classes = useStyles();
  const removeItem = (e, item) => {
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
    >
      {formData?.ingredients.map((item) => (
        <DisplayItem item={item} removeItem={removeItem} />
      ))}
    </div>
  );
};

export default StepTwoDisplayComponent;

const useItemStyles = makeStyles((theme) => ({
  itemWrapperInner: {
    width: "calc(100% - 8px)",
    height: "calc(100% - 8px)",
    padding: "4px 6px",
    display: "flex",
    margin: "2px 4px",
    boxShadow: "3px 3px 6px #cc540e, -3px -3px 6px #ff6c12",
    transform: "scaleX(0)",
    // border: "1px solid blue",
    // "&::before": {
    //   content: '""',
    //   position: "absolute",
    //   height: "calc(100% - 4px)",
    //   width: "calc(100% - 4px)",
    //   // borderRadius: "50%",
    //   // boxShadow: "inset 5px 5px 8px #cc540e, inset -5px -5px 8px #ff6c12",
    //   boxShadow: "inset 3px 3px 6px #cc540e, inset -3px -3px 6px #ff6c12",
    //   transition: theme.transitions.create(
    //     ["box-shadow", "transform", "background-color"],
    //     {
    //       duration: 500,
    //     }
    //   ),
    // },
  },
  itemWrapperInnerShifted: { transform: "scaleX(1)" },
  itemWrapperOuter: {
    // border: "1px solid red",
    // boxShadow: "5px 5px 8px #cc540e,-5px -5px 8px #ff6c12",
    padding: "1px 0px",
    marginBottom: "7px",
    transition: theme.transitions.create(["box-shadow"], {
      duration: 500,
    }),
    "&.addBoxShadow": {
      boxShadow: "2px 2px 2px #cf540e, -2px -2px 2px #ff6c12",
      transition: theme.transitions.create(["box-shadow"], {
        duration: 500,
      }),
    },
  },
  text: {
    padding: "4px 6px",
    color: "#fff",
  },
  icon: { display: "flex", alignItems: "center" },
  iconRoot: {
    color: "#fff",
    width: "14px",
    height: "14px",
    padding: "2px",
    marginRight: "8px",
    transition: theme.transitions.create(["box-shadow"], {
      duration: 500,
    }),
    "&.addBoxShadow": {
      boxShadow: "2px 2px 4px #cc540e, -2px -2px 4px #ff6c12",
      transition: theme.transitions.create(["box-shadow"], {
        duration: 500,
      }),
      "&:hover": {
        cursor: "pointer",
        boxShadow: "0px 0px 6px #eb6010, -0px -0px 6px #eb6010",
        transition: theme.transitions.create(["box-shadow"], {
          duration: 500,
        }),
      },
    },
  },
}));

const DisplayItem = ({ item, removeItem }) => {
  const classes = useItemStyles();
  const [shifted, setShifted] = useState(false);
  useEffect(() => {
    setTimeout(() => setShifted(true), 250);
  }, []);
  const timeouts = {
    appear: 30000,
    enter: 15000,
    exit: 15000,
  };
  return (
    <Collapse in={true} timeout={timeouts}>
      <div
        className={clsx(classes.itemWrapperOuter, shifted && "addBoxShadow")}
      >
        <div
          className={clsx(
            classes.itemWrapperInner,
            shifted && classes.itemWrapperInnerShifted
          )}
        >
          <div className={clsx(classes.icon, shifted && "addBoxShadow")}>
            <CloseIcon
              classes={{
                root: clsx(classes.iconRoot, shifted && "addBoxShadow"),
              }}
              fontSize="small"
              onClick={(e) => removeItem(e, item)}
            />
          </div>
          <div className={classes.text}>{item.text}</div>
        </div>
      </div>
    </Collapse>
  );
};
