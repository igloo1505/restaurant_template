import React, { useState, useEffect, Fragment, useLayoutEffect } from "react";
import { connect } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { unitObject } from "../util/appWideData";

const useStyles = makeStyles((theme) => ({
  keyRoot: {
    gridTemplateColumns: "1fr min-content 1fr",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      // borderRadius: "5px",
      justifyContent: "center",
      color: "#fff",
      "& hr": {
        backgroundColor: "#fff",
      },
    },
    "& hr": {
      // border: "5px solid green",
      "&:hover": {
        color: "#fff",
        borderBottomColor: "#fff",
        backgroundColor: "#fff",
      },
    },
  },
  menuItemKeyRoot: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    fontSize: "0.7rem !important",
    fontWeight: 900,
    letterSpacing: "0.15rem",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  menuItemRoot: {
    fontSize: "1rem",
    "&:hover": {
      backgroundColor: "rgba(38, 138, 255, 0.3)",
    },
    "&:focus": {
      backgroundColor: "rgba(38, 138, 255, 0.3)",
    },
  },
  listItemRoot: {
    fontSize: "1rem",
  },
  noMargin: {
    marginTop: 0,
  },
  menuPaper: {
    paddingTop: 0,
    top: "80px !important",
    // maxHeight: "500px",
  },
  menuList: {
    paddingTop: 0,
    overflow: "-moz-scrollbars-none",
    scrollbarWidth: "none",
    /* this will hide the scrollbar in internet explorers */
    "-ms-overflow-style": "none",
    "&::-webkit-scrollbar": {
      width: "0 !important",
      display: "none",
    },
  },
  selectInputRoot: {
    backgroundColor: "transparent",
    color: "#fff",
    paddingLeft: "5px",
  },
  selectInputRootFocused: {
    // backgroundColor: `${theme.palette.secondary.light} !important`,
    backgroundColor: "transparent !important",
    boxShadow: "inset 3px 3px 6px #cc540e, inset -3px -3px 6px #ff6c12",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    // transform: "translateX(10px)",
    transition: theme.transitions.create(["box-shadow"], {
      duration: 250,
    }),
  },
  inputLabelRoot: { color: "#e0e0e0" },
  inputLabelFocused: { color: "#fff !important" },
  wrapper: {
    "& > div.MuiInput-underline": {
      "&:before": { borderBottom: "1px solid #fff" },
      "&:after": {
        borderBottom: `2px solid ${theme.palette.primary.light}`,
      },
      "&:hover:not(.Mui-disabled):before": { borderBottom: "2px solid #fff" },
      // border: "1px solid red",
    },
  },
  inputIcon: { color: "#fff" },
  // inputIconFocused: { color: theme.palette.alternative.main },
}));

const UnitSelect = ({ props: { handleFormChange, formData, setFormData } }) => {
  const classes = useStyles();
  const handleChange = (e) => {
    setFormData({ ...formData, servingUnit: e.target.value });
  };
  let [unitKeys, setUnitKeys] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [focused, setFocus] = useState(false);
  useLayoutEffect(() => {
    let unitkeys = [];
    Object.keys(unitObject).map((k) => {
      unitkeys.push({ key: true, text: k });
      unitObject[k].map((u) => {
        unitkeys.push({ key: false, text: u });
      });
    });
    setUnitKeys(unitkeys);
  }, []);

  return (
    <FormControl fullWidth className={classes.wrapper}>
      <InputLabel
        id="unit-select-input-label"
        focused={focused}
        shrink={focused || formData.servingUnit !== ""}
        classes={{
          root: clsx(
            classes.inputLabelRoot,
            focused && classes.inputLabelFocused
          ),
        }}
      >
        Unit
      </InputLabel>
      <Select
        labelId="unit-select-input-label"
        fullWidth
        id="unit-select-input"
        value={formData.servingUnit}
        onChange={handleChange}
        MenuProps={{
          classes: { paper: classes.menuPaper, list: classes.menuList },
        }}
        classes={{
          root: clsx(
            classes.selectInputRoot,
            focused && classes.selectInputRootFocused
          ),
          icon: clsx(classes.inputIcon, focused && classes.inputIconFocused),
        }}
        // input={InputComponent}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      >
        {unitKeys.map((k) => (
          <MenuItem
            key={k.text}
            value={k.text}
            classes={{
              root: clsx(
                !k.key && classes.menuItemRoot,
                k.key && classes.menuItemKeyRoot
              ),
            }}
            ListItemClasses={{
              root: clsx(
                classes.listItemRoot,
                k.key && classes.listItemKeyRoot
              ),
            }}
            onClick={(e) => {
              console.log(e);
            }}
          >
            {k.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const mapStateToProps = (state, props) => ({
  props: props,
});

export default connect(mapStateToProps)(UnitSelect);

export const InputComponent = () => {
  return (
    <Fragment>
      <TextField type="select" />
    </Fragment>
  );
};
