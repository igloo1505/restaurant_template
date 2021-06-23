import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import clsx from "clsx";
import * as Types from "../../stateManagement/TYPES";

// TODO Add conditional state here to switch background of svg, based on 'logged in' state.
const useStyles = makeStyles((theme) => ({
  backgroundSvg: {
    position: "absolute",
    // fill: theme.palette.secondary.main,
    opacity: 1,
  },
  foregroundSvg: {
    // fill: theme.palette.alternative.main,
    fill: "#fff",
  },
}));
const AccountIcon = ({ user }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles();
  const closeMenu = () => {
    dispatch({ type: Types.DISPOSE_ACCOUNT_MENU });
  };
  return (
    <Fragment>
      <svg
        className={clsx(
          classes.backgroundSvg,
          "MuiSvgIcon-root",
          "MuiSvgIcon-fontSizeLarge"
        )}
        style={{ position: "absolute" }}
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M12 4c-4.41 0-8 3.59-8 8 0 1.82.62 3.49 1.64 4.83 1.43-1.74 4.9-2.33 6.36-2.33s4.93.59 6.36 2.33C19.38 15.49 20 13.82 20 12c0-4.41-3.59-8-8-8zm0 9c-1.94 0-3.5-1.56-3.5-3.5S10.06 6 12 6s3.5 1.56 3.5 3.5S13.94 13 12 13z"
          opacity=".3"
        ></path>
      </svg>
      <svg
        className={clsx(
          classes.foregroundSvg,
          "MuiSvgIcon-root",
          "MuiSvgIcon-fontSizeLarge"
        )}
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"></path>
      </svg>
    </Fragment>
  );
};

const mapStateToProps = (state, props) => ({
  props: props,
  user: state.user,
});

export default connect(mapStateToProps)(AccountIcon);
