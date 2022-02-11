import React, { useState, useEffect, Fragment, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
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

const menuId = "timeUnit-menu";

const useAdornmentClasses = makeStyles((theme) => ({
  // Start menu stuff
  popoverRoot: {
    position: "fixed",
    zIndex: "1303 !important",
    inset: "0px",
    backgroundColor: "transparent",
    // boxShadow: "2px 2px 5px #4386d4, -2px -2px 5px #5fbcff",
    // boxShadow: "20px 20px 60px #2075d9, -20px -20px 60px #2c9fff",
  },
  menuItemInnerWrapper: {
    backgroundColor: "#e0e0e0",
    backgroundColor: theme.palette.primary.light,
    boxShadow: "2px 2px 5px #4386d4, -2px -2px 5px #5fbcff",
    width: "100%",
    height: "100%",
    padding: "0px 3px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "2px 10px",
    transition: theme.transitions.create(["box-shadow"], { duration: 200 }),
    "&:hover": {
      boxShadow: "none",
      transition: theme.transitions.create(["box-shadow"], { duration: 200 }),
    },
  },
  menuItemRoot: {
    padding: "4px 6px",
    width: "100%",
    position: "relative",
    backgroundColor: theme.palette.primary.light,
    color: "#fff",
    border: `1px solid rgba(224, 224, 224, 0.2)`,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      color: "#fff",
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
const timeAdornment = (
  focused,
  shiftPressed,
  name,
  hasMenuOpen,
  setHasMenuOpen,
  setFormData,
  formData
) => {
  const units = [
    { long: "Seconds", short: "secs" },
    { long: "Minutes", short: "mins" },
    { long: "Hours", short: "hrs" },
    { long: "Days", short: "days" },
  ];
  const [menuOpen, setMenuOpen] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(units[1]);
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
    setSelectedUnit(units[index]);
    setFormData({ ...formData, [`${name}Unit`]: units[index] });

    toggleMenu(null);
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
            onClick={toggleMenu}
            id={`time-adornment-${name}`}
          >
            {formData[`${name}Unit`].short}
          </Typography>
          <UnitMenu
            menuOpen={menuOpen}
            units={units}
            classes={classes}
            handleItemClick={handleItemClick}
            toggleMenu={toggleMenu}
            hasMenuOpen={hasMenuOpen}
            setHasMenuOpen={setHasMenuOpen}
          />
        </InputAdornment>
      </Fade>
    </Fragment>
  );
};

export default timeAdornment;

const UnitMenu = forwardRef(
  (
    {
      menuOpen,
      units,
      classes,
      handleItemClick,
      toggleMenu,
      hasMenuOpen,
      setHasMenuOpen,
    },
    ref
  ) => {
    const handleMenuClose = () => {
      toggleMenu(null);
    };
    return (
      <ClientSidePortal selector="#topLevelPortalContainer">
        <Menu
          id={menuId}
          elevation={0}
          anchorEl={menuOpen}
          open={Boolean(menuOpen)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          keepMounted
          onClose={handleMenuClose}
          classes={{ paper: classes.menuRoot, list: classes.menuList }}
          PopoverClasses={{ root: classes.popoverRoot }}
        >
          {units.map((unit, index) => (
            <MenuItemComponent
              unit={unit}
              id={`${menuId}-${index}`}
              key={unit.long}
              handleItemClick={handleItemClick}
              index={index}
              classes={classes}
            />
          ))}
        </Menu>
      </ClientSidePortal>
    );
  }
);

const MenuItemComponent = ({ unit, handleItemClick, index, classes, id }) => {
  return (
    <MenuItem
      onClick={() => handleItemClick(index)}
      classes={{ root: classes.menuItemRoot }}
      id={id}
    >
      <div className={classes.menuItemInnerWrapper}>{unit.long}</div>
    </MenuItem>
  );
};
