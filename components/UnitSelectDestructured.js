import React, { useState, useEffect, Fragment, useLayoutEffect } from "react";
import { connect } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Divider from "@material-ui/core/Divider";
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
    backgroundColor: "rgba(235,96,17, 1)",
    color: "#fff",
    fontSize: "0.7rem !important",
    fontWeight: 900,
    letterSpacing: "0.15rem",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    "&:hover": {
      backgroundColor: "rgba(235,96,17, 0.8)",
    },
    "&:focus": {
      backgroundColor: "rgba(235,96,17, 0.8)",
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
    // maxHeight: "500px",
  },
  menuList: {
    paddingTop: 0,
  },
}));

const UnitSelect = ({
  props: { handleFormChange, focusState, formData, setFormData },
}) => {
  const classes = useStyles();
  const handleChange = (e) => {
    setFormData({ ...formData, servingUnit: e.target.value });
  };
  let [unitKeys, setUnitKeys] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [focused, setFocused] = useState(false);
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
    <Fragment>
      <InputLabel
        id="unit-select-input-label"
        focused={focused}
        shrink={focused || formData.servingUnit !== ""}
      >
        Unit
      </InputLabel>
      <Select
        labelId="unit-select-input-label"
        fullWidth
        id="unit-select-input"
        defaultValue="Select"
        value={formData.servingUnit}
        onChange={handleChange}
        MenuProps={{
          classes: { paper: classes.menuPaper, list: classes.menuList },
        }}
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
    </Fragment>
  );
};

const mapStateToProps = (state, props) => ({
  props: props,
});

export default connect(mapStateToProps)(UnitSelect);
