import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import clsx from "clsx";
import {
  validatePassword,
  authenticateUser,
  tryAutoLogin,
  forgotPassword,
} from "../stateManagement/userActions";
import * as Types from "../stateManagement/TYPES";
// import { removeBoxShadow } from "../stateManagement/uiActions";
import Copyright from "../components/Copyright";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const emailMinLength = 8;
const passwordMinLength = 8;
const emailId = "login_email_input";
const passwordId = "login_password_input";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    position: "absolute",
    top: "50vh",
    zIndex: -1,
    left: "50vw",
    transform: "translate(-50%, -50%)",
  },
  adjustForBackdropOpen: {
    backgroundColor: "transparent",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonText: {
    backgroundColor: "transparent",
  },
  textFieldRoot: {
    overflow: "visible",
  },
  // inputBaseRoot: {
  //   overflow: "visible",
  // },
  // textInputRoot: {
  //   color: theme.palette.common.black,
  //   zIndex: 999999,
  // },
}));

const SignIn = ({
  user,
  props: { setLogin },
  drawer: { isOpen: modalIsOpen },
  alert: {
    dialog: { isOpen: alertIsOpen },
  },
  user: { triedAutoLogin },
  authenticateUser,
  tryAutoLogin,
  forgotPassword,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });
  const initialFocusState = {
    email: {
      focus: false,
      shrink: Boolean(formData.email.length !== 0),
    },
    password: {
      focus: false,
      shrink: Boolean(formData.password.length !== 0),
    },
  };
  const [focusState, setFocusState] = useState(initialFocusState);
  const classes = useStyles();
  const [validated, setValidated] = useState(true);
  const [shouldBeTransparent, setShouldBeTransparent] = useState(true);
  useEffect(() => {
    if (modalIsOpen || alertIsOpen) {
      setShouldBeTransparent(true);
    }
    if (!modalIsOpen && !alertIsOpen) {
      // setShouldBeTransparent(false);
    }
  }, [modalIsOpen, alertIsOpen]);
  const [passwordValidated, setPasswordValidated] = useState(true);

  // ToDO Remove all occurrences of tryAutoLogin except in _app.js
  // useEffect(() => {
  //   console.log("logging here");
  //   if (!triedAutoLogin) {
  //     tryAutoLogin();
  //   }
  // }, []);

  const handleForgotPassword = () => {
    dispatch({
      type: Types.SHOW_MODAL,
      payload: {
        isOpen: true,
        dismissible: false,
        variant: "forgotPassword",
      },
    });
  };
  // TODO make sure initial load doesn't have label overlapping text if autofill is used
  const handleSubmit = () => {
    if (validated && passwordValidated) {
      authenticateUser(formData);
    }
  };

  const handleChange = (e) => {
    setFocusState({
      ...focusState,
      [e.target.name]: {
        focus: true,
        shrink: Boolean(e.target.value.length > 0),
      },
    });
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (
      formData.email.length === emailMinLength ||
      formData.password.length === passwordMinLength
    ) {
      // TODO validate both login forms on client before sending to server
      // setValidated(false);
    }
    if (
      !formData.email.length === emailMinLength &&
      !formData.password.length === passwordMinLength
    ) {
      // setValidated(passwordValidated);
    }
    if (e.target.name === "password") {
      let x = validatePassword(e.target.value);
      // setPasswordValidated(x);
      if (formData.email.length > emailMinLength) {
        // setValidated(x);
      }
    }
  };

  const handleChangeBoolean = (e) => {
    setFormData({ ...formData, [e.target.name]: !formData[e.target.name] });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      className={clsx(
        classes.container,
        shouldBeTransparent && classes.adjustForBackdropOpen
      )}
    >
      <div
        className={clsx(
          classes.paper,
          shouldBeTransparent && classes.adjustForBackdropOpen
        )}
      >
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={clsx(
            classes.form,
            shouldBeTransparent && classes.adjustForBackdropOpen
          )}
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id={emailId}
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            classes={{ root: classes.textFieldRoot }}
            value={formData.email}
            onChange={(e) => handleChange(e)}
            onFocus={(e) =>
              setFocusState({
                password: {
                  focus: false,
                  shrink: Boolean(formData.password.length !== 0),
                },
                email: {
                  focus: true,
                  shrink: Boolean(formData.email.length !== 0),
                },
              })
            }
            onBlur={(e) =>
              setFocusState({
                password: {
                  focus: false,
                  shrink: Boolean(formData.password.length !== 0),
                },
                email: {
                  focus: false,
                  shrink: Boolean(formData.email.length !== 0),
                },
              })
            }
            InputLabelProps={{
              focused: focusState.email.focus,
              shrink: focusState.email.shrink,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus
            name="password"
            label="Password"
            type="password"
            id={passwordId}
            autoComplete="current-password"
            classes={{ root: classes.textFieldRoot }}
            value={formData.password}
            onChange={(e) => handleChange(e)}
            // onClick={() =>
            //   setFocusState({
            //     ...initialFocusState,
            //     password: {
            //       focus: true,
            //       shrink: Boolean(formData.password.length > 0),
            //     },
            //   })
            // }
            // onBlur={() =>
            //   setFocusState({
            //     ...initialFocusState,
            //     password: {
            //       focus: false,
            //       shrink: Boolean(formData.password.length > 0),
            //     },
            //   })
            // }
            InputLabelProps={{
              focused: focusState.password.focus,
              shrink: focusState.password.shrink,
            }}
          />
          <FormControlLabel
            style={{ backgroundColor: "transparent" }}
            control={
              <Checkbox
                value={formData.rememberMe}
                checked={formData.rememberMe}
                name="rememberMe"
                onChange={(e) => handleChangeBoolean(e)}
                color="primary"
                disabled={!validated}
              />
            }
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            classes={{ root: classes.submit, label: classes.buttonText }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container style={{ backgroundColor: "transparent" }}>
            <Grid item xs style={{ backgroundColor: "transparent" }}>
              <Link href="#" variant="body2" onClick={handleForgotPassword}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item style={{ backgroundColor: "transparent" }}>
              <Link href="#" variant="body2" onClick={setLogin}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box
        mt={8}
        className={clsx(shouldBeTransparent && classes.adjustForBackdropOpen)}
      >
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps = (state, props) => ({
  user: state.user,
  drawer: state.drawer,
  alert: state.alert,
  props: props,
});

export default connect(mapStateToProps, {
  authenticateUser,
  tryAutoLogin,
  forgotPassword,
})(SignIn);
