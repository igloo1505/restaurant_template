import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { GridItem } from "./UIComponents";
import UnitSelectDestructed from "./UnitSelectDestructured";
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
    "& > div": {
      minWidth: "100%",
      width: "100%",
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
    setFormData,
    focusState,
    setFocusState,
    shouldShrinkDescription,
    setShouldShrinkDescription,
    placeHolder,
    setPlaceHolder,
  },
}) => {
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(false);

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
            // required
            id="recipeTitleInput"
            name="title"
            fullWidth
            autoFocus
            multiline
            label="Recipe's title "
            onChange={handleFormChange}
            value={formData.title}
            InputLabelProps={{
              focused: focusState.title.focus,
              shrink: Boolean(formData?.title?.length !== 0),
            }}
            inputProps={{ className: "inputListener", pattern: "d*" }}
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
            inputProps={{ className: "inputListener", pattern: "\\d*" }}
            onKeyDown={(e) => {
              // All of this to avoid Safari's shadow user agent
              let allowed = false;
              let regex = /^\d+$/;
              if (regex.test(e.key) || e.code.slice(0, 3) !== "Key") {
                allowed = true;
              }
              if (!allowed) {
                e.preventDefault();
              }
            }}
            value={formData.servings}
            classes={{ root: classes.textFieldRoot }}
            InputLabelProps={{
              focused: focusState.servings.focus,
              shrink: Boolean(formData?.servings?.length !== 0),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <UnitSelectDestructed
            handleFormChange={handleFormChange}
            focusState={focusState}
            formData={formData}
            setFormData={setFormData}
            classes={classes}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            // required
            id="recipeDescriptionInput"
            name="description"
            label="Tell people about it!"
            {...(placeHolder && {
              placeholder:
                "Here's your chance to tell people about the deliciousness in detail.",
            })}
            fullWidth
            multiline
            onChange={handleFormChange}
            onFocus={() => {
              setShouldShrinkDescription(true);
              setPlaceHolder(true);
            }}
            onBlur={() => {
              if (formData.description === "") {
                console.log("Running here");
                console.log(formData.description);
                setPlaceHolder(true);
                setTimeout(() => setShouldShrinkDescription(false), 300);
              }
            }}
            value={formData.description}
            classes={{ root: classes.textFieldRoot }}
            InputLabelProps={{
              focused: focusState.description.focus,
              shrink: shouldShrinkDescription,
            }}
            inputProps={{ className: "inputListener" }}
          />
          <style jsx>{`
            input[type=number]: {
              -webkit-appearance: none;
              -moz-appearance: none;
            }
            ::-webkit-textfield-decoration-container: {
              content: none;
            }
          `}</style>
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

const stepTwoFormComponent = () => {
  return (
    <div>
      <div>Yup</div>
    </div>
  );
};
