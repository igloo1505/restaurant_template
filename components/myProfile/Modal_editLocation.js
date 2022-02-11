/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { connect, useDispatch } from "react-redux";
import * as Types from "../../stateManagement/TYPES";
import { updateProfileData } from "../../stateManagement/userActions";
import Button from "@material-ui/core/Button";

const useClasses = makeStyles((theme) => ({
  outerContainer: {
    minWidth: "400px",
    minHeight: "150px",
    padding: "0.75rem 0.75rem 0.75rem 0.75rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "0.75rem",
    gap: "0.75rem",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
}));

const Modal_editLocation = ({
  location: { city: _city, country: _country },
}) => {
  const classes = useClasses();
  const dispatch = useDispatch();
  const [focusState, setFocusState] = useState({
    city: {
      shrink: Boolean(_city),
      focused: false,
    },
    country: {
      shrink: Boolean(_country),
      focused: false,
    },
  });

  const [formData, setFormData] = useState({
    city: _city ? _city : "",
    country: _country ? _country : "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFocusState({
      ...focusState,
      [e.target.name]: {
        ...focusState[e.target.name],
        shrink: Boolean(e.target.name.length !== 0),
      },
    });
  };

  const handleSubmit = () => {
    dispatch(
      updateProfileData({
        location: {
          city: formData.city,
          country: formData.country,
        },
      })
    );
  };

  return (
    <div className={classes.outerContainer}>
      <div className={classes.innerContainer}>
        <TextField
          label="City"
          value={formData.city}
          // onChange={(e) =>
          //   setFormData({
          //     ...formData,
          //     city: e.target.value,
          //   })
          // }
          name="city"
          onChange={handleChange}
          InputLabelProps={{
            focused: focusState.city.focused,
            shrink: focusState.city.shrink,
            // shrink: true,
          }}
          onFocus={() => {
            setFocusState({
              country: {
                shrink: Boolean(formData.country.length !== 0),
                focused: false,
              },
              // city: {
              //   shrink: Boolean(formData.city.length !== 0),
              //   focused: true,
              // },
              city: {
                shrink: true,
                focused: true,
              },
            });
          }}
          onBlur={() => {
            setFocusState({
              country: {
                shrink: Boolean(formData.country.length !== 0),
                focused: false,
              },
              city: {
                shrink: Boolean(formData.city.length !== 0),
                focused: false,
              },
            });
          }}
        />
        <TextField
          label="Country"
          value={formData.country}
          name="country"
          onChange={handleChange}
          InputLabelProps={{
            focused: focusState.country.focused,
            shrink: focusState.country.shrink,
          }}
          onFocus={() => {
            setFocusState({
              country: {
                shrink: Boolean(formData.country.length !== 0),
                focused: true,
              },
              city: {
                shrink: Boolean(formData.city.length !== 0),
                focused: false,
              },
            });
          }}
          onBlur={() => {
            setFocusState({
              country: {
                shrink: Boolean(formData.country.length !== 0),
                focused: false,
              },
              city: {
                shrink: Boolean(formData.city.length !== 0),
                focused: false,
              },
            });
          }}
        />
      </div>
      <div className={classes.buttonContainer}>
        <Button color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  location: state.userProfile.location,
  props: props,
});

export default connect(mapStateToProps)(Modal_editLocation);
