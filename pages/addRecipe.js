import React, { Fragment, useState, useEffect } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Copyright from "../components/Copyright";
import Typography from "@material-ui/core/Typography";
import { StepOneForm } from "../components/addRecipeForms";
import { tryAutoLogin } from "../stateManagement/userActions";
import {
  UnderNavbar,
  AdjustForDrawerContainer,
} from "../components/UIComponents";
import { set } from "json-cookie";

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

const steps = ["Details", "Ingredients", "Directions"];

const getStepContent = (
  step,
  formData,
  handleFormChange,
  focusState,
  setFocusState,
  shouldShrinkDescription,
  setShouldShrinkDescription,
  placeHolder,
  setPlaceHolder
) => {
  switch (step) {
    case 0:
      return (
        <StepOneForm
          formData={formData}
          handleFormChange={handleFormChange}
          focusState={focusState}
          setFocusState={setFocusState}
          shouldShrinkDescription={shouldShrinkDescription}
          setShouldShrinkDescription={setShouldShrinkDescription}
          placeHolder={placeHolder}
          setPlaceHolder={setPlaceHolder}
        />
      );
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
    triedAutoLogin,
    self: { token, _id },
  },
  UI: {
    viewport: { navHeight },
    portalDrawer: { open: drawerIsOpen },
  },
  network: { loading: isLoading },
  tryAutoLogin,
}) => {
  const initialFocusState = {
    title: {
      focus: false,
      shrink: false,
    },
    servings: {
      focus: false,
      shrink: false,
    },
    description: {
      focus: false,
      shrink: false,
    },
  };
  const [focusState, setFocusState] = useState(initialFocusState);
  const router = useRouter();
  const [formData, setFormData] = useState({
    description: "",
    servings: "",
    title: "",
  });
  const [shouldShrinkDescription, setShouldShrinkDescription] = useState(false);
  const [placeHolder, setPlaceHolder] = useState(false);
  const handleFormChange = (e) => {
    console.log("setting with: ", e.target.name, e.target.value);
    console.log("setting with: ", formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // setFocusState({
    //   ...focusState,
    //   [e.target.name]: {
    //     focus: true,
    //   },
    // });
  };
  const addListeners = () => {
    let ems = document.getElementsByClassName("inputListener");
    let keys = Object.keys(ems);
    if (ems && ems.length !== 0) {
      keys.forEach((k) => {
        ems[k].addEventListener("focus", (e) => {
          e.preventDefault();
          setFocusState({
            ...focusState,
            [e.target.name]: {
              focus: true,
            },
          });
        });
        ems[k].addEventListener("blur", (e) => {
          e.preventDefault();
          if (e.target.name === "description") {
            console.log("Did reach here");
            console.log("e.target.name", e.target.name);
            console.log("formData[e.target.name]", formData[e.target.name]);
            console.log("formData.description", formData.description);
            // if (formData.description.length === 0) {
            //   console.log("length of 0");
            //   console.log("THE WHOLE FUCKING FORM", formData);
            //   console.log("length of :", formData.description);
            //   setPlaceHolder(false);
            //   setTimeout(() => setShouldShrinkDescription(false), 300);
            // }
            // if (formData?.[e.target.name]?.length > 0) {
            //   setShouldShrinkDescription(true);
            // }
          }
          setFocusState({
            ...focusState,
            [e.target.name]: {
              focus: false,
            },
          });
        });
      });
    }
  };
  useEffect(() => {
    addListeners();
  }, []);
  useEffect(() => {
    if (!loggedIn) {
      router.push("/");
    }
  }, [loggedIn, token]);
  useEffect(() => {
    if (!triedAutoLogin) {
      tryAutoLogin();
    }
  }, [triedAutoLogin]);
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
      <CssBaseline />
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
                  {getStepContent(
                    activeStep,
                    formData,
                    handleFormChange,
                    focusState,
                    setFocusState,
                    shouldShrinkDescription,
                    setShouldShrinkDescription,
                    placeHolder,
                    setPlaceHolder
                  )}
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
  network: state.network,
});

export default connect(mapStateToProps, { tryAutoLogin })(AddRecipe);
