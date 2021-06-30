import React, { Fragment, useState, useEffect } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Copyright from "../components/Copyright";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { StepOneForm } from "../components/addRecipeForms";
import {
  UnderNavbar,
  AdjustForDrawerContainer,
} from "../components/UIComponents";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    position: "absolute",
    left: "50vw",
    top: "80px",
    transform: "translateX(-50%)",
    transition: "transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  layoutShifted: {
    transform: "translateX(calc(-50% + 120px))",
    transition: "transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    // transition: "width 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Shipping address", "Payment details", "Review your order"];

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return <StepOneForm />;
    // case 1:
    //   return <PaymentForm />;
    // case 2:
    //   return <Review />;
    default:
      throw new Error("Unknown step");
  }
};

const AddRecipe = ({
  user: {
    loggedIn,
    self: { token, _id },
  },
  UI: {
    viewport: { navHeight },
    portalDrawer: { open: drawerIsOpen },
  },
}) => {
  const router = useRouter();
  useEffect(() => {
    if (!loggedIn) {
      router.push("/");
    }
  }, [loggedIn, token]);
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Fragment>
      <UnderNavbar />
      <AdjustForDrawerContainer>
        <main
          className={clsx(
            classes.layout,
            drawerIsOpen && classes.layoutShifted
          )}
        >
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Add Recipe
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Fragment>
              {activeStep === steps.length ? (
                <Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order
                    confirmation, and will send you an update when your order
                    has shipped.
                  </Typography>
                </Fragment>
              ) : (
                <Fragment>
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Place order" : "Next"}
                    </Button>
                  </div>
                </Fragment>
              )}
            </Fragment>
          </Paper>
          <Copyright />
        </main>
      </AdjustForDrawerContainer>
    </Fragment>
  );
};

const mapStateToProps = (state, props) => ({
  user: state.user,
  UI: state.UI,
  props: props,
});

export default connect(mapStateToProps)(AddRecipe);
