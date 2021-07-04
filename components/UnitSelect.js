import React, { useState, useEffect, Fragment, useLayoutEffect } from "react";
import { connect } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MuiMenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import { unitObject } from "../util/appWideData";

const useStylesItem = makeStyles((theme) => ({
  keyRoot: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  itemRoot: {
    "&:hover": {
      backgroundColor: "rgba(38, 138, 255, 0.3)",
    },
  },
  noMargin: {
    marginTop: 0,
  },
}));

const UnitSelect = ({
  props: { handleFormChange, focusState, formData, classes },
}) => {
  let [unitKeys, setUnitKeys] = useState([]);
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
      <TextField
        required
        id="recipeServingInput"
        name="servings"
        type="number"
        fullWidth
        select
        label="Unit"
        onChange={handleFormChange}
        inputProps={{ className: "inputListener" }}
        SelectProps={{ variant: "outlined" }}
        value={formData.servings}
        classes={{ root: classes.textFieldRoot }}
        InputLabelProps={{
          focused: focusState.servings.focus,
          shrink: Boolean(formData?.servings?.length > 0),
        }}
      >
        {unitKeys.map((k) => (
          <MenuItem item={k} />
        ))}
      </TextField>
    </Fragment>
  );
};

const mapStateToProps = (state, props) => ({
  props: props,
});

export default connect(mapStateToProps)(UnitSelect);

const MenuItem = ({ item }) => {
  const classes = useStylesItem();
  if (item.key) {
    return (
      <MuiMenuItem
        style={{
          borderBottom: "1px solid #ccc",
          display: "grid",
          gridTemplateColumns: "1fr min-content 1fr",
        }}
        className={clsx(
          classes.keyRoot,
          item.text.toLowerCase() === "weight" && classes.noMargin
        )}
      >
        <Divider variant="middle" />
        <span
          style={{
            width: "fit-content",
            paddingLeft: "5px",
            paddingRight: "5px",
          }}
        >
          {item.text}
        </span>
        <Divider variant="middle" />
      </MuiMenuItem>
    );
  }
  if (!item.key) {
    return <MuiMenuItem className={classes.itemRoot}>{item.text}</MuiMenuItem>;
  }
};
