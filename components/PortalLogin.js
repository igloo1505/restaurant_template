import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import clsx from "clsx";
import {
  validatePassword,
  authenticateUser,
  autoLogin,
} from "../stateManagement/userActions";
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
    left: "50vw",
    transform: "translate(-50%, -50%)",
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

const SignIn = ({ user, props: { setLogin }, authenticateUser, autoLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const classes = useStyles();
  const [validated, setValidated] = useState(true);
  const [passwordValidated, setPasswordValidated] = useState(true);
  useEffect(() => {
    autoLogin();
  }, []);

  const handleSubmit = () => {
    if (validated && passwordValidated) {
      authenticateUser(formData);
    }
  };

  const handleChange = (e) => {
    // removeBoxShadow();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (
      formData.email.length === emailMinLength ||
      formData.password.length === passwordMinLength
    ) {
      // TODO add this back in after route functional!!
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
    <Container component="main" maxWidth="xs" className={classes.container}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
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
          />
          <FormControlLabel
            control={
              <Checkbox
                value={formData.rememberMe}
                name="rememberMe"
                onChange={(e) => handleChangeBoolean(e)}
                color="primary"
                disabled={!validated}
              />
            }
            label="Remember me"
          />
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            classes={{ root: classes.submit, label: classes.buttonText }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={setLogin}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps = (state, props) => ({
  user: state.user,
  props: props,
});

export default connect(mapStateToProps, {
  authenticateUser,
  autoLogin,
})(SignIn);
