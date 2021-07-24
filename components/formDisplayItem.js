import React, { useState, useEffect, Fragment, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { FaBalanceScale as ScaleIcon } from "react-icons/fa";
import Tooltip from "@material-ui/core/Tooltip";
import Grow from "@material-ui/core/Grow";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    fontSize: 11,
    boxShadow: "6px 6px 54px #5e2606, -6px -6px 54px #ff9a1a",
  },
}))(Tooltip);

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

const DisplayItem = ({ item, text, removeItem }) => {
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
  const handleRemoveItem = (e, item, text) => {
    // setShifted(false);
    // setTimeout(() => removeItem(e, item, text), 500);
    removeItem(e, item, text);
  };
  return (
    <Grow
      in={true}
      style={{ transformOrigin: "0 0 0" }}
      {...(true ? { timeout: 750 } : {})}
    >
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
              onClick={(e) => handleRemoveItem(e, item, text)}
            />
          </div>
          <div className={classes.text}>
            {text.split(/\r?\n/).map((i) => (
              <span className={classes.textyText}>{i}</span>
            ))}
          </div>
          {item?.optional && (
            <LightTooltip title="Optional">
              <div className={classes.optionalText}>
                <ScaleIcon />
              </div>
            </LightTooltip>
          )}
        </div>
      </div>
    </Grow>
  );
};

export default DisplayItem;
