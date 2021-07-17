import React, { Fragment, useState, useEffect } from "react";
import clsx from "clsx";
import axios from "axios";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import Grow from "@material-ui/core/Grow";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Copyright from "../components/Copyright";
import Typography from "@material-ui/core/Typography";
import { StepOneForm } from "../components/addRecipeForms";
import StepTwoForm from "../components/stepTwoAddRecipeForm";
import Loader from "../components/Loader";
import {
  ColorlibConnector,
  ColorlibStepIcon,
} from "../components/AddRecipeStepper";
// import { tryAutoLogin } from "../stateManagement/userActions";
// import { autoLoginOnFirstRequest } from "../util/autoLoginOnFirstRequest";
import {
  UnderNavbar,
  AdjustForDrawerContainer,
} from "../components/UIComponents";

// TODO check deviceheight and if room, shift form downward and tilt banner along corner of form
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
    backgroundColor: theme.palette.secondary.main,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    paddingTop: "0px  !important",
    transition: theme.transitions.create(["box-shadow"], { duration: 1500 }),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    boxShadow: `6px 6px 12px ${theme.palette.grey[400]}, -6px 6px 12px ${theme.palette.grey[300]}`,
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  stepperRoot: { backgroundColor: theme.palette.secondary.main },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    color: "#fff",
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  stepLabelRoot: {
    color: "#fff",
  },
  stepLabelActive: { color: "#fff !important" },
  stepLabelCompleted: {
    color: "#fff !important",
    fontWeight: "400 !important",
  },
}));

const steps = ["Details", "Ingredients", "Directions"];

const getStepContent = (
  step,
  formData,
  setFormData,
  handleFormChange,
  placeHolder,
  setPlaceHolder
) => {
  switch (step) {
    case 0:
      return (
        <StepOneForm
          formData={formData}
          handleFormChange={handleFormChange}
          setFormData={setFormData}
          placeHolder={placeHolder}
          setPlaceHolder={setPlaceHolder}
        />
      );
    case 1:
      return (
        <StepTwoForm
          formData={formData}
          handleFormChange={handleFormChange}
          setFormData={setFormData}
          placeHolder={placeHolder}
          setPlaceHolder={setPlaceHolder}
        />
      );
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
  // tryAutoLogin,
}) => {
  const [paperLifted, setPaperLifted] = useState(false);
  useEffect(() => {
    setTimeout(() => setPaperLifted(true), 1500);
  }, []);
  const router = useRouter();
  const [formData, setFormData] = useState({
    servings: "",
    servingUnit: "cups",
    title: "",
    description: "",
  });

  const [placeHolder, setPlaceHolder] = useState(false);
  const handleFormChange = (e) => {
    if (e) {
      if (e.target.name === "servingUnit") {
        console.log("e!!!!", e);
      }
      console.log("targets", e.target.name);
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (!loggedIn) {
      router.push("/");
    }
  }, [loggedIn, token]);

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    // TODO authenticate before transition
    console.log(formData);
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  if (isLoading || !loggedIn) {
    return <Loader type="circular" />;
  }
  if (!isLoading && loggedIn) {
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
            <Slide direction="right" in={true} mountOnEnter unmountOnExit>
              <Paper
                className={clsx(classes.paper, paperLifted && "addBoxShadow")}
              >
                <FormBanner>Add Recipe</FormBanner>
                <Stepper
                  alternativeLabel
                  activeStep={activeStep}
                  connector={<ColorlibConnector />}
                  classes={{ root: classes.stepperRoot }}
                >
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel
                        StepIconComponent={ColorlibStepIcon}
                        classes={{
                          label: classes.stepLabelRoot,
                          completed: classes.stepLabelCompleted,
                          active: classes.stepLabelActive,
                        }}
                      >
                        {label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <Fragment>
                  <Fragment>
                    {getStepContent(
                      activeStep,
                      formData,
                      setFormData,
                      handleFormChange,

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
                        {activeStep === steps.length - 1
                          ? "Submit Recipe"
                          : "Next"}
                      </Button>
                    </div>
                  </Fragment>
                </Fragment>
              </Paper>
            </Slide>
            <Copyright />
          </main>
        </AdjustForDrawerContainer>
      </Fragment>
    );
  } else {
    return <div></div>;
  }
};

const mapStateToProps = (state, props) => ({
  user: state.user,
  UI: state.UI,
  props: props,
  network: state.network,
});

export default connect(mapStateToProps)(AddRecipe);

const useBannerStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  bannerRoot: {
    width: "fit-content",
    padding: "10px 20px",
    borderRadius: "17px",
    // backgroundColor: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    // transform: "translateY(-50%)",
    color: "#fff",
  },
  bannerPaper: {
    width: "fit-content",
    height: "fit-content",
    borderRadius: "17px",
    transform: "translateY(0px)",
    background: theme.palette.secondary.dark,
    boxShadow: "none",
    transition: theme.transitions.create(["box-shadow", "transform"], {
      duration: 500,
    }),
  },
  bannerPaperBoxShadow: {
    boxShadow: "6px 6px 12px #b74b0c, -6px 6px 12px #ff7514",
    transition: theme.transitions.create(["box-shadow", "transform"], {
      duration: 500,
    }),
  },
  bannerTransform: { transform: "translateY(-50%)" },
}));

const FormBanner = ({ children }) => {
  const [bannerLifted, setBannerLifted] = useState(false);
  const [bannerTransformed, setBannerTransformed] = useState(false);
  useEffect(() => {
    setTimeout(() => setBannerLifted(true), 800);
    setTimeout(() => setBannerTransformed(true), 500);
  }, []);
  const classes = useBannerStyles();
  return (
    <div className={classes.container}>
      <Paper
        elevation={3}
        className={clsx(
          classes.bannerPaper,
          bannerLifted && classes.bannerPaperBoxShadow,
          bannerTransformed && classes.bannerTransform
        )}
      >
        <Typography
          component="h1"
          variant="h4"
          align="center"
          className={classes.bannerRoot}
        >
          {children}
        </Typography>
      </Paper>
    </div>
  );
};
