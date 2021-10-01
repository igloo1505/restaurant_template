import React, { useState, useEffect, Fragment, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import NotWhatThisWasIntendedForButItsMoreVisible from "@material-ui/icons/Exposure";
import { FaBalanceScale as ScaleIcon } from "react-icons/fa";
import { PrimaryTooltip } from "./tooltip";
import Grow from "@material-ui/core/Grow";
import DisplayItemContent from "./DisplayItemContent";

// TODO fix issue where all objects with index > than removed ingredient in array go through boxShadow animation when removeItem(e)

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
    zIndex: 999,
    marginBottom: "7px",
    minWidth: "150px",
    transition: theme.transitions.create(["box-shadow"], {
      duration: 500,
    }),
    // overflowY: "auto",
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
    width: "100%",
  },
  textyText: {
    display: "block",
    overflowWrap: "break-word",
  },
  "text-subtitle": {
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: 1.66,
    letterSpacing: "0.03333em",
  },
  optionalText: {
    color: "#e0e0e0",
    fontSize: "0.7rem",
    float: "right",
    height: "fit-content",
    // width: "100%",
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
  toolTip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

const superInefficientlyAvoidRepaint = (text, name, index) => {
  let storedData = localStorage.getItem(name);
  if (!storedData) {
    localStorage.setItem(name, JSON.stringify({ [index]: text }));
    return true;
  }
  if (storedData) {
    storedData = JSON.parse(storedData);

    if (Object.values(storedData).indexOf(text) === -1) {
      // storedData[index] = text
      localStorage.setItem(
        name,
        JSON.stringify({ ...storedData, [index]: text })
      );
      return true;
    }
    return false;
  }
  return false;
};

const DisplayItem = ({ item, text, removeItem, name, index }) => {
  let isInitial = superInefficientlyAvoidRepaint(text, name, index);

  const classes = useItemStyles();
  const [shifted, setShifted] = useState(!isInitial);
  useEffect(() => {
    setTimeout(() => setShifted(true), 250);
  }, []);

  if (isInitial) {
    return (
      <Grow
        in={true}
        style={{ transformOrigin: "0 0 0" }}
        {...(true ? { timeout: 350 } : {})}
      >
        <div
          className={clsx(classes.itemWrapperOuter, shifted && "addBoxShadow")}
          // onClick={() => }
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
                onClick={(e) => removeItem(e, item, text)}
              />
            </div>
            <DisplayItemContent
              item={item}
              text={text}
              removeItem={removeItem}
              name={name}
              classes={classes}
            />
            {item?.optional && (
              <PrimaryTooltip title="Optional">
                <div className={classes.optionalText}>
                  <NotWhatThisWasIntendedForButItsMoreVisible />
                </div>
              </PrimaryTooltip>
            )}
          </div>
        </div>
      </Grow>
    );
  }
  if (!isInitial) {
    return (
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
              onClick={(e) => removeItem(e, item, text)}
            />
          </div>
          <DisplayItemContent
            item={item}
            text={text}
            removeItem={removeItem}
            name={name}
            classes={classes}
          />
          {item?.optional && (
            <PrimaryTooltip title="Optional">
              <div className={classes.optionalText}>
                <NotWhatThisWasIntendedForButItsMoreVisible />
              </div>
            </PrimaryTooltip>
          )}
        </div>
      </div>
    );
  }
};

export default DisplayItem;
