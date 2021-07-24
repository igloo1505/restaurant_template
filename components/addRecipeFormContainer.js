import React, { useState, useEffect, Fragment, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import {
  ConnectorComponent,
  StepIconComponent,
} from "../components/AddRecipeStepper";
import FormBanner from "../components/FormBanner";
import { StepOneForm } from "../components/addRecipeForms";
import StepTwoForm from "../components/stepTwoAddRecipeForm";
import StepThreeForm from "../components/StepThreeForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.secondary.main,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    paddingTop: "0px  !important",
    boxShadow: `0px 0px 0px ${theme.palette.grey[400]}, 0px 0px 0px ${theme.palette.grey[300]}`,
    transform: "scale(1)",
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    [theme.breakpoints.up("lg")]: {
      // maxHeight: "90vh",
      display: "grid",
      // gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
      // gridTemplateRows: "auto auto minmax(0px, 200px)",
      // gridTemplateRows: "auto auto 1fr",
      gridTemplateAreas: '"banner" "stepper" "form"',
    },
    transition: theme.transitions.create(
      ["box-shadow", "transform", "background"],
      {
        duration: 500,
      }
    ),
    "&:hover": {
      boxShadow: `8px 8px 14px ${theme.palette.grey[400]}, -8px 8px 14px ${theme.palette.grey[300]}`,
      //   transform: "scale(1.1)",
      transition:
        "box-shadow 1500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,transform 1500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background 1500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important",
    },
  },
  addBoxShadow: {
    boxShadow: `6px 6px 12px ${theme.palette.grey[400]}, -6px 6px 12px ${theme.palette.grey[300]}`,
    transition:
      "box-shadow 1500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,transform 1500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background 1500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important",
  },
  button: {
    color: "#fff",
    backgroundColor: theme.palette.secondary.main,
    marginLeft: theme.spacing(1),
    padding: "0px",
    boxShadow: "4px 4px 6px #cc540e, -4px -4px 6px #ff6c12",
    transition: theme.transitions.create(["box-shadow"], {
      duration: 500,
    }),
    "&:hover": {
      boxShadow: "2px 2px 6px #cc540e, -2px -2px 6px #ff6c12",
      "&:before": {
        boxShadow: "0px 0px 5px #468cde, -0px -0px 5px #5cb6ff",
      },
    },

    "&::before": {
      content: '""',
      position: "absolute",
      height: "calc(100% - 10px)",
      width: "calc(100% - 10px)",
      borderRadius: "4px",
      boxShadow: "2px 2px 5px #4386d4, -2px -2px 5px #5fbcff",
      // boxShadow: "inset 7px 7px 5px #4386d4, inset -7px -7px 5px #5fbcff",
      transition: theme.transitions.create(["box-shadow"], {
        duration: 350,
      }),
    },
    "& > .MuiButton-label": {
      padding: "6px 16px",
      // margin: "1px 1px",
      borderRadius: "5px",
      // background: "linear-gradient(145deg, #57acff, #4991e6)",
      background: "#51a1ff",
      // boxShadow: "5px 5px 8px #468cde, -5px -5px 8px #5cb6ff",
      // backgroundColor: theme.palette.primary.light,
      "&:hover": {
        // padding: "5px 15px",
        // margin: "1px 1px",
      },
    },
  },
  stepLabelRoot: {
    color: "#fff",
  },
  stepLabelActive: { color: "#fff !important" },
  stepLabelCompleted: {
    color: "#fff !important",
    fontWeight: "400 !important",
  },
  stepperRoot: {
    backgroundColor: theme.palette.secondary.main,
    gridArea: "stepper",
  },
  formWrapper: {
    gridArea: "form",
  },
  buttons: {
    marginTop: "24px",
    display: "flex",
    justifyContent: "flex-end",
  },
  backButton: {
    color: "#fff",
    backgroundColor: theme.palette.secondary.main,
    padding: 0,
    boxShadow: "4px 4px 6px #cc540e, -4px -4px 6px #ff6c12",
    "&:hover": {
      boxShadow: "2px 2px 6px #cc540e, -2px -2px 6px #ff6c12",
      // boxShadow: "0px 0px 0px #cc540e, -0px -0px 0px #ff6c12",
      "&:before": {
        boxShadow: "2px 2px 6px #cc540e, -2px -2px 6px #ff6c12",
      },
    },
    "&::before": {
      content: '""',
      position: "absolute",
      height: "calc(100% - 10px)",
      width: "calc(100% - 10px)",
      borderRadius: "4px",
      // boxShadow: "inset 5px 5px 8px #cc540e, inset -5px -5px 8px #ff6c12",
      boxShadow: "inset 2px 2px 6px #cc540e, inset -2px -2px 6px #ff6c12",
      // boxShadow: "inset 2px 2px 5px #468cde, inset -2px -2px 5px #5cb6ff",
      transition: theme.transitions.create(
        ["box-shadow", "transform", "background-color"],
        {
          duration: 500,
        }
      ),
      "&:hover": {
        boxShadow: "2px 2px 6px #cc540e, -2px -2px 6px #ff6c12",
      },
    },
  },
  backButtonLabel: {
    // background: `${theme.palette.secondary.main} !important`
  },
  nextButton: { boxShadow: "4px 4px 6px #cc540e, -4px -4px 6px #ff6c12" },
}));

const AddRecipeFormContainer = (
  {
    activeStep,
    steps,
    formData,
    setFormData,
    handleFormChange,
    placeHolder,
    setPlaceHolder,
    setActiveStep,
  },

  ref
) => {
  const [paperLifted, setPaperLifted] = useState(false);
  const [formHeightLimit, setFormHeightLimit] = useState(400);
  const classes = useStyles();
  useEffect(() => {
    setTimeout(() => setPaperLifted(true), 300);
  }, []);

  const handleNext = () => {
    // TODO authenticate before transition
    if (activeStep === 2) {
      return console.log("formData", formData);
    }
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div ref={ref}>
      <Paper
        className={clsx(
          classes.paper,
          paperLifted && classes.addBoxShadow,
          "addBoxShadow"
        )}
        style={{
          gridTemplateRows: `auto auto fit-content(${formHeightLimit}px)`,
        }}
      >
        <FormBanner>Add Recipe</FormBanner>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ConnectorComponent activeStep={activeStep} />}
          classes={{ root: classes.stepperRoot }}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                StepIconComponent={StepIconComponent}
                StepIconProps={{ index, activeStep }}
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
            <div className={classes.formWrapper}>
              {getStepContent(
                activeStep,
                formData,
                setFormData,
                handleFormChange,
                placeHolder,
                setPlaceHolder
              )}
            </div>
            <div className={classes.buttons}>
              {activeStep !== 0 && (
                <Button
                  onClick={handleBack}
                  // className={(classes.button, classes.backButton)}
                  classes={{
                    root: clsx(classes.backButton),
                    label: classes.backButtonLabel,
                  }}
                >
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                classes={{ root: classes.button, label: classes.nextButton }}
              >
                {activeStep === steps.length - 1 ? "Submit Recipe" : "Next"}
              </Button>
            </div>
          </Fragment>
        </Fragment>
      </Paper>
    </div>
  );
};

export default forwardRef(AddRecipeFormContainer);

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
        />
      );
    case 2:
      return (
        <StepThreeForm
          formData={formData}
          handleFormChange={handleFormChange}
          setFormData={setFormData}
        />
      );
    default:
      throw new Error("Unknown step");
  }
};
