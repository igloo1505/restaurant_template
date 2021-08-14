import React, { useEffect, useState, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import MUIMenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Menu from "@material-ui/core/Menu";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import {
  getIngredientUnits,
  filterData,
  validateUnit,
} from "../util/appWideData";
import { Fragment } from "react";

const menuLimit = 10;

const useStyles = makeStyles((theme) => ({
  margin: { width: "100%" },
  autoCompleteRoot: {
    width: "100%",
    "& label": {
      color: "#e0e0e0",
    },
  },
  autoCompleteRootFocused: {
    width: "100%",
    "& label": {
      color: "#fff !important",
    },
  },
  autoCompletePopper: {},
  autoCompleteListbox: { width: "100%" },
  autoCompletePaper: { width: "100%" },
  endAdornment: {
    color: "white",
    "& > *": {
      color: "#fff",
    },
  },
  option: {
    // padding: "4px 18px",
    display: "flex",
    width: "100%",
    height: "100%",
    padding: "6px 16px",
    justifyContent: "center",
    alignItems: "center",
    // padding: "0px",
    "& span": {
      fontSize: "0.7rem",
      // Go back to this for smaller screen sizes.
      // whiteSpace: "nowrap",
      whiteSpace: "break-spaces",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    "&[data-focus='true']": {
      backgroundColor: "rgba(81, 161, 255, 0.4)",
      "& span": {
        borderBottom: "1px solid #fff",
      },
    },
  },
  autoCompleteOption: {
    opacity: "1 !important",
    padding: "0px",
    "&:hover": {
      backgroundColor: "rgba(81, 161, 255, 0.4)",
    },
    '&[data-focus="true"]': {
      backgroundColor: "rgba(81, 161, 255, 0.4)",
    },
  },
  optionKey: {
    "&[data-focus='true']": {
      backgroundColor: "#fff",
      "& span": {
        borderBottom: "1px solid #fff",
      },
    },
  },
  optionWithValue: {
    // padding: "4px 7px",
    // margin: "4px 7px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& span": {
      padding: "0px",
      fontSize: "0.7rem",
      // whiteSpace: "nowrap",
      whiteSpace: "break-spaces",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  togglePadding: {
    padding: "4px 16px",
  },
  clearIndicator: {
    display: "none",
  },
  strikethroughContainerThing: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: theme.palette.primary.main,
  },
  strikethroughUpper: {
    height: "calc(50% - 1px)",
    width: "100%",
    backgroundColor: "#fff",
  },
  strikethroughLower: {
    height: "calc(50% - 1px)",
    // height: "100%",
    width: "100%",
    backgroundColor: "#fff",
  },
  textContainer: { width: "fit-content", padding: "0px 5px" },
  keyContainer: {
    opacity: "1 !important",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    "& span": {
      fontSize: "0.7rem",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
}));

const UnitSelectCompact = (props) => {
  const {
    InputLabelProps,
    focused,
    label,
    selectedUnit,
    setFormData,
    formData,
    focusState,
    setFocusState,
    addIngredient,
  } = props;
  const [unitHelper, setUnitHelper] = useState("");
  useEffect(() => {
    if (formData.ingredient?.unit?.long) {
      setUnitHelper(formData.ingredient.unit.long);
    }
  }, [formData]);

  const [options, setOptions] = useState([]);
  const theme = useTheme();
  const classes = useStyles();
  useEffect(() => {
    let options = getIngredientUnits("_initial_");
    setOptions(options);
  }, []);
  const defaultProps = {
    options: options,
    getOptionLabel: (option) => option.long,
  };
  const getParts = (option) => {
    let parts = [];
    let flags = "gi";
    let isUpper =
      unitHelper.toLowerCase() !== unitHelper.toUpperCase() &&
      unitHelper.length < 2;
    if (isUpper) {
      flags = "g";
    }
    let regex = new RegExp(unitHelper, flags);
    let unitHelperHelper = unitHelper;
    let str = option.long;
    // Add in extra character if next character is white space.
    let matches = str.split(regex);
    matches.forEach((m) => {
      if (m.charAt(0) === " ") {
        unitHelperHelper = `${unitHelperHelper} `;
      }
      if (m[m.length - 1] === " ") {
        console.log("reached here@");
        unitHelperHelper = ` ${unitHelperHelper}`;
      }
    });
    console.log("matches: ", matches);
    // let _matches = str.split(_regex);
    // let matches_ = str.split(regex_);

    // if (_matches.length === matches.length) {
    //   matches = _matches;
    // }
    // if (matches_.length === matches.length) {
    //   matches = matches_;
    // }
    if (matches.length === option.long.length) {
      matches = [];
      console.log("stop here");
    }
    matches.forEach((m, i, a) => {
      let o = {
        text: m,
        match: false,
      };
      parts.push(o);
      if (i !== a.length - 1) {
        let position = option.long.search(regex);
        console.log("position: ", position);
        console.log(unitHelper.slice(position, position + unitHelper.length));
        parts.push({
          text: option.long.slice(position, position + unitHelper.length),
          match: true,
        });
      }
    });
    if (matches.length === 0) {
      parts.push({ text: option.long, match: false });
    }
    return parts;
  };
  // const submitUnitChange = () => {
  //   let validated = validateUnit(unitHelper);
  //   console.log("validated: ", validated);
  //   let _unit = getIngredientUnits().filter(
  //     (u) => u.long.toLowerCase() === e.target.value.toLowerCase()
  //   );
  //   if (_unit) {
  //     setFormData({
  //       ...formData,
  //       ingredient: { ...formData.ingredient, unit: _unit },
  //     });
  //   }
  // };

  const handleKeyPress = (e) => {
    if (typeof window !== "undefined") {
      if (e.code === "Enter") {
        let regex = new RegExp(e.target.value, "gi");
        let daUnit = filterData(regex)[0];
        if (
          daUnit &&
          formData.ingredient.text.length >= 3 &&
          typeof parseFloat(formData.ingredient.amount) === "number"
        ) {
          addIngredient(daUnit);
        }
      }
    }
  };

  const handleChange = (e) => {
    console.log("EEEE", e.target.id, e.target.value);

    if (typeof e.target?.value === "string") {
      let _unit = getIngredientUnits().filter(
        (u) => u.long.toLowerCase() === e.target.value.trim().toLowerCase()
      );
      if (_unit) {
        setFormData({
          ...formData,
          ingredient: { ...formData.ingredient, unit: _unit },
        });
      }
      setUnitHelper(e.target.value);
      let filtered = filterData(e.target.value);
      if (e.target.value.length > 0) {
        setOptions(filtered);
      }
      if (e.target.value.length === 0) {
        setOptions(getIngredientUnits("_initial_"));
      }
    }
  };
  const handleItemClick = (e, option) => {
    // let _string = "";
    // if (typeof value === "string") {
    //   _string = value;
    // } else {
    //   value.forEach((item) => {
    //     _string += item.text;
    //   });
    // }
    console.log(
      "inside handleItemClick: ",
      e.target.id,
      e.target.value,
      option
    );
    if (typeof option === "object") {
      let unit_ = getIngredientUnits().filter(
        (u) => !u.isKey && u.long === option.long
      );
      if (unit_) {
        setFormData({
          ...formData,
          ingredient: { ...formData.ingredient, unit: unit_[0] },
        });
      }
    } else if (e.target?.value) {
      let index = -1;
      let _unit = getIngredientUnits()
        .filter((u) => !u.isKey)
        .filter((u, i) => {
          index = i;
          return u.long.toLowerCase() === e.target.value.toLowerCase();
        });
      console.log(" _unit: ", _unit);
      if (_unit[0]) {
        setFormData({
          ...formData,
          ingredient: { ...formData.ingredient, unit: _unit[0] },
        });
      }
    }
  };
  const handleFocus = (type) => {
    let shouldShrink =
      unitHelper.length > 0 ||
      typeof formData.ingredient.unit.long !== "undefined";
    let shouldFocus = type === "focus" ? true : false;
    setFocusState({
      ...focusState,
      unit: {
        shrink: shouldShrink,
        focus: shouldFocus,
      },
    });
  };

  return (
    <FormControl className={classes.margin}>
      <Autocomplete
        {...defaultProps}
        id="unit-select-autocomplete"
        fullWidth
        autoSelect
        autoComplete
        getOptionDisabled={(option) => option.isKey}
        onChange={handleChange}
        classes={{
          root: clsx(
            classes.autoCompleteRoot,
            focusState.unit.focus && classes.autoCompleteRootFocused
          ),
          popper: classes.autoCompletePopper,
          listbox: classes.autoCompleteListbox,
          paper: classes.autoCompletePaper,
          loading: classes.loading,
          noOptions: classes.noOptions,
          groupLabel: classes.groupLabel,
          groupUl: classes.groupUl,
          option: classes.autoCompleteOption,
          inputFocused: props.InputProps.classes.focused,
          input: props.InputProps.classes.input,
          inputRoot: props.InputProps.classes.root,
          endAdornment: classes.endAdornment,
          clearIndicator: classes.clearIndicator,
        }}
        renderInput={(params) => {
          // Don't delete this. Needed to use value inline here.
          delete params.inputProps.value;
          return (
            <TextField
              id={props.id}
              value={unitHelper}
              fullWidth
              onChange={handleChange}
              onFocus={() => handleFocus("focus")}
              onBlur={() => handleFocus("blur")}
              onKeyDown={(e) => handleKeyPress(e)}
              {...props}
              {...params}
            />
          );
        }}
        renderOption={(option, { ...state }) => {
          const ignore = (e) => {
            return e.preventDefault();
          };
          const parts = getParts(option);
          if (!option.isKey) {
            return (
              <div
                className={clsx(
                  classes.option,
                  "option-div",
                  unitHelper.length > 0 && classes.optionWithValue
                )}
                onFocus={(e) => console.log("did focus", e)}
                value={option.long}
                onClick={(e) => handleItemClick(e, option)}
              >
                {parts.map((part, index, array) => (
                  <span
                    key={index}
                    style={{
                      color: part.match ? theme.palette.primary.main : "#000",
                      padding: part.text === " " && "0px 2px",
                    }}
                    value={option.long}
                    onClick={(e) => handleItemClick(e, option)}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            );
          }
          if (option.isKey) {
            return (
              <div className={classes.keyContainer}>
                <div className={classes.strikethroughContainerThing}>
                  <div className={classes.strikethroughUpper}></div>
                  <div className={classes.strikethroughLower}></div>
                </div>
                <div className={classes.textContainer} onClick={ignore}>
                  {parts.map((part, index) => (
                    <span
                      key={index}
                      style={{
                        color: part.match
                          ? theme.palette.secondary.main
                          : "#000",
                        margin: part.text === "_" && "10px",
                      }}
                      onClick={ignore}
                    >
                      {part.text.toUpperCase()}
                    </span>
                  ))}
                </div>
                <div className={classes.strikethroughContainerThing}>
                  <div className={classes.strikethroughUpper}></div>
                  <div className={classes.strikethroughLower}></div>
                </div>
              </div>
            );
          }
        }}
      />
    </FormControl>
  );
};
export default UnitSelectCompact;