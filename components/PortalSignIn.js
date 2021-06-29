import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addNewUser } from "../stateManagement/userActions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
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

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    top: "50vh",
    left: "50vw",
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
    width: "100%", // Fix IE 11 issue.
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
}));

const PortalSignIn = ({ user, props: { setLogin }, addNewUser }) => {
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
  });
  const classes = useStyles();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    addNewUser(formData);
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={3} classes={{ root: classes.gridPadding }}>
            <Grid item xs={12} sm={6}>
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
                classes={{ root: classes.textFieldRoot }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="signIn_lastName_input"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={formData.lastName}
                classes={{ root: classes.textFieldRoot }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="signIn_email_input"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                classes={{ root: classes.textFieldRoot }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="signIn_password_input"
                autoComplete="current-password"
                value={formData.password}
                classes={{ root: classes.textFieldRoot }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={formData.rememberMe}
                    name="rememberMe"
                    onChange={(e) => handleChange(e)}
                    color="primary"
                    disabled={Object.keys(validated).every((x) => x === true)}
                  />
                }
                label="Remember me"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={formData.allowEmails}
                    color="primary"
                    name="allowEmails"
                    onChange={handleChange}
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
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={setLogin}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps = (state, props) => ({
  user: state.user,
  props: props,
});

export default connect(mapStateToProps, { addNewUser })(PortalSignIn);
