import React, { useState, useEffect, Fragment, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { unitObject, getIngredientUnits } from "../util/appWideData";
import ClientSidePortal from "./portalAuthenticated/ClientSidePortal";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useDispatch } from "react-redux";
import * as Types from "../stateManagement/TYPES";
import TextField from "@material-ui/core/TextField";
import Fade from "@material-ui/core/Fade";
import AddIcon from "@material-ui/icons/AddBoxOutlined";
import ReturnIcon from "@material-ui/icons/KeyboardReturn";
const menuId = "ingredientUnit-menu";

const useAdornmentClasses = makeStyles((theme) => ({
  // Start menu stuff
  popoverRoot: {
    position: "fixed",
    zIndex: "1303 !important",
    inset: "0px",
    backgroundColor: "transparent",
  },
  menuItemInnerWrapper: {
    backgroundColor: "#fff",
    color: "#000",
    width: "100%",
    height: "100%",
    padding: "0px 3px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "4px 14px",
    transition: theme.transitions.create(["box-shadow"], { duration: 300 }),
    "&:hover": {
      boxShadow: "none",
      transition: theme.transitions.create(["box-shadow"], { duration: 300 }),
    },
  },
  menuItemInnerWrapperKey: {
    display: "flex",
    justifyContent: "center",
  },
  menuItemRoot: {
    padding: "1px 2px",
    width: "100%",
    position: "relative",
    // backgroundColor: theme.palette.primary.light,
    backgroundColor: "#fff",
    color: "#000",
    border: `1px solid rgba(224, 224, 224, 0.2)`,
    "&:hover": {
      backgroundColor: "#fff",
      backgroundColor: theme.palette.primary.light,
      color: "#000",
    },
  },
  menuItemRootKey: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: `${theme.palette.primary.dark}`,
    color: "#fff",
    "&:hover": {
      backgroundColor: `${theme.palette.primary.dark}`,
    },
  },
  menuList: { padding: "0px" },
  menuRoot: {
    boxShadow: `2px 2px 8px ${theme.palette.grey[500]}, -2px 2px 8px ${theme.palette.grey[400]}`,
  },
  // End menu stuff
  iconRoot: {
    opacity: 1,
    color: "#fff",
    transition: theme.transitions.create(["opacity"], {
      duration: 450,
      delay: 150,
    }),
    "&:hover": {
      cursor: "pointer",
    },
  },

  iconFocused: { color: "#fff" },
  iconEnabled: {
    opacity: 1,
    transition: theme.transitions.create(["opacity"], {
      duration: 450,
      delay: 150,
    }),
  },
  inputAdornmentRoot: {
    color: "#e0e0e0",
    "& > *": {
      color: "#e0e0e0",
      transition: theme.transitions.create(["color"], { duration: 150 }),
    },
    "&:hover": {
      "& > *": {
        color: "#fff",
        color: theme.palette.primary.light,
        cursor: "pointer",
        transition: theme.transitions.create(["color"], { duration: 150 }),
      },
    },
  },
  inputAdornmentRootFocused: {
    color: "#e0e0e0",
    "& > *": {
      color: "#fff",
      transition: theme.transitions.create(["color"], { duration: 150 }),
    },
    "&:hover": {
      "& > *": {
        color: "#fff",
        color: theme.palette.primary.light,
        cursor: "pointer",
        transition: theme.transitions.create(["color"], { duration: 150 }),
      },
    },
  },
  inputAdornmentText: {
    fontSize: 12,
  },
}));

const ingredientAdornment = (
  formData,
  setFormData,
  focused,
  addIngredient,
  name,
  shiftPressed,
  formFieldValue,
  hasMenuOpen,
  setHasMenuOpen
) => {
  const dispatch = useDispatch();
  let unitArray = getIngredientUnits();
  const [menuOpen, setMenuOpen] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(unitArray[1]);
  const classes = useAdornmentClasses();
  const toggleMenu = (e) => {
    if (!e) {
      setMenuOpen(null);
      setHasMenuOpen(false);
    }
    if (!menuOpen) {
      setMenuOpen(e.currentTarget);
      setHasMenuOpen(true);
    }
  };
  const handleItemClick = (index) => {
    //   setSelectedUnit(units[index]);
    //   toggleMenu(null);
  };
  const toggleModal = () => {
    dispatch({
      type: Types.SHOW_ALERT,
      payload: { variant: "ingredientUnits" },
    });
  };
  return (
    <Fragment>
      <Fade in={true} timeout={{ appear: 250, enter: 250, leave: 250 }}>
        <InputAdornment
          position="end"
          classes={{
            root: clsx(
              classes.inputAdornmentRoot,
              focused && classes.inputAdornmentRootFocused
            ),
          }}
        >
          <Typography
            classes={{ root: classes.inputAdornmentText }}
            onClick={toggleModal}
          >
            {formData.ingredient.unit.short}
          </Typography>
        </InputAdornment>
      </Fade>
    </Fragment>
  );
};

export default ingredientAdornment;
