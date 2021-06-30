import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { addNewUser } from "../stateManagement/userActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
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
import Copyright from "../components/Copyright";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    top: "50vh",
    left: "50vw",
    zIndex: -1,
    transform: "translate(-50%, -50%)",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
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
  gridPadding: {
    padding: "1rem 0",
  },
  adornmentRoot: {
    height: "100%",
    zIndex: 1,
    overflow: "hidden",
  },
  adjustForBackdropOpen: {
    backgroundColor: "transparent",
  },
}));

const PortalSignUp = ({
  user,
  modal: { isOpen: modalIsOpen },
  alert: {
    dialog: { isOpen: alertIsOpen },
  },
  props: { setLogin },
  addNewUser,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [transparent, setTransparent] = useState(true);
  useEffect(() => {
    console.log("Did run in this bitch", modalIsOpen, alertIsOpen);
    if (modalIsOpen || alertIsOpen) {
      setTransparent(true);
    }
    if (!modalIsOpen && !alertIsOpen) {
      // setTransparent(false);
    }
  }, [modalIsOpen, alertIsOpen]);
  const [validated, setValidated] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });
  const [formData, setFormData] = useState({
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    allowEmails: true,
    rememberMe: true,
  });
  const classes = useStyles();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChangeBoolean = (e) => {
    setFormData({ ...formData, [e.target.name]: !formData[e.target.name] });
  };

  const handleSubmit = () => {
    addNewUser(formData);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      className={clsx(
        classes.container,
        transparent && classes.adjustForBackdropOpen
      )}
    >
      <div
        className={clsx(
          classes.paper,
          transparent && classes.adjustForBackdropOpen
        )}
      >
        <Avatar className={clsx(classes.avatar)}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={clsx(
            classes.form,
            transparent && classes.adjustForBackdropOpen
          )}
          noValidate
        >
          <Grid
            container
            spacing={3}
            classes={{
              root: clsx(
                classes.gridPadding,
                transparent && classes.adjustForBackdropOpen
              ),
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              className={clsx(transparent && classes.adjustForBackdropOpen)}
            >
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="signIn_firstName_input"
                label="First Name"
                autoFocus
                value={formData.firstName}
                classes={{
                  root: clsx(
                    classes.textFieldRoot,
                    transparent && classes.adjustForBackdropOpen
                  ),
                }}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              className={clsx(transparent && classes.adjustForBackdropOpen)}
            >
              <TextField
                variant="outlined"
                required
                fullWidth
                id="signIn_lastName_input"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={formData.lastName}
                classes={{
                  root: clsx(
                    classes.textFieldRoot,
                    transparent && classes.adjustForBackdropOpen
                  ),
                }}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
              className={clsx(transparent && classes.adjustForBackdropOpen)}
            >
              <TextField
                variant="outlined"
                required
                fullWidth
                id="signIn_email_input"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                classes={{
                  root: clsx(
                    classes.textFieldRoot,
                    transparent && classes.adjustForBackdropOpen
                  ),
                }}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
              className={clsx(transparent && classes.adjustForBackdropOpen)}
            >
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="signIn_password_input"
                autoComplete="current-password"
                value={formData.password}
                classes={{
                  root: clsx(
                    classes.textFieldRoot,
                    transparent && classes.adjustForBackdropOpen
                  ),
                }}
                onChange={handleChange}
                InputProps={{
                  endAdornment: passwordInputAdornment(
                    showPassword,
                    setShowPassword,
                    classes.adornmentRoot
                  ),
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              className={clsx(transparent && classes.adjustForBackdropOpen)}
            >
              <FormControlLabel
                style={{ backgroundColor: "transparent" }}
                control={
                  <Checkbox
                    value={formData.rememberMe}
                    checked={formData.rememberMe}
                    name="rememberMe"
                    onChange={handleChangeBoolean}
                    color="primary"
                    disabled={Object.keys(validated).every((x) => x === true)}
                  />
                }
                label="Remember me"
              />
            </Grid>
            <Grid
              item
              xs={12}
              className={clsx(transparent && classes.adjustForBackdropOpen)}
            >
              <FormControlLabel
                style={{ backgroundColor: "transparent" }}
                control={
                  <Checkbox
                    value={formData.allowEmails}
                    color="primary"
                    checked={formData.allowEmails}
                    name="allowEmails"
                    onChange={handleChangeBoolean}
                  />
                }
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            classes={{ root: classes.submit, label: classes.buttonText }}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid
            container
            justify="flex-end"
            className={clsx(transparent && classes.adjustForBackdropOpen)}
          >
            <Grid
              item
              className={clsx(transparent && classes.adjustForBackdropOpen)}
            >
              <Link href="#" variant="body2" onClick={setLogin}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box
        mt={5}
        className={clsx(transparent && classes.adjustForBackdropOpen)}
      >
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps = (state, props) => ({
  user: state.user,
  modal: state.modal,
  alert: state.alert,
  props: props,
});

export default connect(mapStateToProps, { addNewUser })(PortalSignUp);

const passwordInputAdornment = (
  showPassword,
  setShowPassword,
  adornmentClass
) => {
  return (
    <InputAdornment position="start" classes={{ root: adornmentClass }}>
      <IconButton
        aria-label="toggle password visibility"
        onClick={() => setShowPassword(!showPassword)}
        onMouseDown={(e) => e.preventDefault()}
      >
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
};
