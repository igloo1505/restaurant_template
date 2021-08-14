import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";
// import Accordion from "@material-ui/core/Accordion";
// import AccordionSummary from "@material-ui/core/AccordionSummary";
// import AccordionDetails from "@material-ui/core/AccordionDetails";
// import Typography from "@material-ui/core/Typography";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import FormGroup from "@material-ui/core/FormGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

const useInputClasses = makeStyles((theme) => ({
  root: {
    // border: "2px solid transparent",
    border: `2px solid ${theme.palette.primary.dark}`,
    padding: "2px",
    borderRadius: "4px",
    transition: theme.transitions.create(["border", "padding"], {
      duration: 250,
    }),
  },
  input: { zIndex: 999, color: "#000" },
  focused: {
    color: "#fff",
    backgroundColor: "#ecf0f3",
    boxShadow: "inset 2px 2px 4px #a3a6a8, inset -2px -2px 4px #ffffff",
    border: `4px solid ${theme.palette.primary.main}`,
    padding: "0px",
    transition: theme.transitions.create(["border", "padding"], {
      duration: 250,
    }),
    "&:hover": {
      border: `4px solid ${theme.palette.primary.dark}`,
    },
    "&:hover:not(.Mui-disabled):before": {},
    "&::before": {
      content: '""',
      position: "absolute",

      height: "calc(100% - 0px)",
      width: "calc(100% - 0px)",
    },
  },
  notchedOutline: {
    border: "0",
  },
}));
const useInputLabelClasses = makeStyles((theme) => ({
  root: {
    padding: "2px 5px",
    backgroundColor: "transparent",
  },
  focused: {},
  shrink: {
    transform: "translate(2px, -18px) scale(0.75) !important",
  },
}));
const useTextFieldClasses = makeStyles((theme) => ({
  textFieldRoot: {
    // border: `2px solid ${theme.palette.primary.dark}`,
    // borderRadius: "4px",
    // boxShadow: "7px 7px 15px #d9d9d9, -7px -7px 15px #ffffff",
  },
  textFieldRootFocused: { boxShadow: "none", backgroundColor: "#fff" },
  textFieldContainer: { marginTop: "2rem" },
}));
const MyRecipes_searchBar = () => {
  const [focusState, setFocusState] = useState({
    focused: false,
    shrink: false,
  });
  const [filterStringValue, setFilterStringValue] = useState("");
  const inputClasses = useInputClasses();
  const classes = useTextFieldClasses();
  const inputLabelClasses = useInputLabelClasses();
  const handleChange = (e) => {
    let y = 3;
    setFilterStringValue(e.target.value);
  };
  return (
    <div className={classes.textFieldContainer}>
      <TextField
        fullWidth
        id="searchInput"
        label="Filter recipes"
        type="search"
        variant="outlined"
        value={filterStringValue}
        classes={{
          root: clsx(
            classes.textFieldRoot,
            focusState.focused && classes.textFieldRootFocused
          ),
        }}
        onChange={handleChange}
        onFocus={() => setFocusState({ ...focusState, focused: true })}
        onBlur={() => setFocusState({ ...focusState, focused: false })}
        notched
        InputProps={{
          classes: inputClasses,
          endAdornment: <EndAdornment focusState={focusState} />,
          // notched: true,
        }}
        // inputProps={{ notched: true }}
        InputLabelProps={{
          classes: inputLabelClasses,
          focused: focusState.focus,
          shrink: filterStringValue.length > 0,
        }}
      />
    </div>
  );
};

export default MyRecipes_searchBar;

const useIconStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.primary.dark,
    marginRight: "6px",
    marginLeft: "2px",
  },
  iconFocused: { color: theme.palette.primary.light },
}));
const EndAdornment = ({ focusState }) => {
  const classes = useIconStyles();
  return (
    <SearchIcon
      className={clsx(classes.icon, focusState.focused && classes.iconFocused)}
    />
  );
};
