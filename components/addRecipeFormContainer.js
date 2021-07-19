import React, { useState, useEffect, Fragment, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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
    transition: theme.transitions.create(
      ["box-shadow", "transform", "background"],
      {
        duration: 1500,
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
  stepperRoot: { backgroundColor: theme.palette.secondary.main },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
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

  const classes = useStyles();
  useEffect(() => {
    setTimeout(() => setPaperLifted(true), 300);
  }, []);

  const handleNext = () => {
    // TODO authenticate before transition
    console.log(formData);
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
