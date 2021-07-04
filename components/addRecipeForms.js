import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { GridItem } from "./UIComponents";
import UnitSelect from "./UnitSelect";
import { unitObject } from "../util/appWideData";
import NoSsr from "@material-ui/core/NoSsr";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  textFieldRoot: {
    minWidth: "100%",
    alignSelf: "stretch",
    // border: "1px solid red",
    // alignItems: "stretch",
    "& > div": {
      minWidth: "100%",
      width: "100%",
      // marginRight: 0,
      // paddingRight: 0,
    },
  },
  gridRoot: {
    // padding: "12px 0px 12px 12px",
    "& > .MuiGrid-item": {
      // padding: "12px 0px 12px 12px",
    },
  },
  gridItemRoot: {},
}));

const StepOneFormComponent = ({
  props: {
    handleFormChange,
    formData,
    focusState,
    setFocusState,
    shouldShrinkDescription,
    setShouldShrinkDescription,
    placeHolder,
    setPlaceHolder,
  },
}) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Let's get some information about your recipe!
      </Typography>
      <Grid
        container
        spacing={3}
        className="addRecipeFormContainer"
        classes={{ root: classes.gridRoot }}
      >
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="recipeTitleInput"
            name="title"
            fullWidth
            autoFocus
            multiline
            label="Give it a name: "
            onChange={handleFormChange}
            value={formData.title}
            InputLabelProps={{
              focused: focusState.title.focus,
              shrink: Boolean(formData?.title?.length > 0),
            }}
            inputProps={{ className: "inputListener" }}
            classes={{ root: classes.textFieldRoot }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="recipeServingInput"
            name="servings"
            type="number"
            fullWidth
            label="Servings"
            onChange={handleFormChange}
            inputProps={{ className: "inputListener" }}
            InputLabelProps={{
              focused: focusState.servings.focus,
              shrink: Boolean(formData?.servings?.length > 0),
            }}
            value={formData.servings}
            classes={{ root: classes.textFieldRoot }}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <UnitSelect
            handleFormChange={handleFormChange}
            focusState={focusState}
            formData={formData}
            classes={classes}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="recipeDescriptionInput"
            name="description"
            label="Tell people about it!"
            {...(placeHolder && {
              placeholder:
                "Here's your chance to tell people about the deliciousness in detail.",
            })}
            // placeholder={
            //   shouldShrinkDescription
            //     ?
            //     : null
            // }
            fullWidth
            multiline
            onChange={handleFormChange}
            onClick={() => {
              setShouldShrinkDescription(true);
              // if (
              //   formData?.description?.length &&
              //   formData?.description?.length  0
              // ) {
              setPlaceHolder(true);
              // }
            }}
            onBlur={() => {
              if (formData.description === "") {
                console.log("Running here");
                console.log(formData.description);
                setPlaceHolder(false);
                setTimeout(() => setShouldShrinkDescription(false), 300);
              }
            }}
            value={formData.description}
            classes={{ root: classes.textFieldRoot }}
            inputProps={{ className: "inputListener" }}
            InputLabelProps={{
              focused: focusState.description.focus,
              shrink: shouldShrinkDescription,
            }}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = (state, props) => ({
  network: state.network,
  user: state.user,
  props: props,
});

export const StepOneForm = connect(mapStateToProps)(StepOneFormComponent);

// <Grid item xs={12}>
//           <FormControlLabel
//             control={
//               <Checkbox color="secondary" name="saveAddress" value="yes" />
//             }
//             label="Use this address for payment details"
//           />
//         </Grid>
