import React, { useState, useEffect, Fragment, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect, useStore } from "react-redux";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import Grow from "@material-ui/core/Grow";
import Button from "@material-ui/core/Button";
import {
  ConnectorComponent,
  StepIconComponent,
} from "../components/AddRecipeStepper";
import FormBanner from "../components/FormBanner";
import { StepOneForm } from "../components/addRecipeForms";
import StepTwoForm from "../components/stepTwoAddRecipeForm";
import StepThreeForm from "../components/StepThreeForm";
import {
  addNewRecipe,
  authenticateAddRecipeForm,
} from "../stateManagement/recipeActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.secondary.main,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    paddingTop: "0px  !important",
    boxShadow: `0px 0px 0px ${theme.palette.grey[400]}, 0px 0px 0px ${theme.palette.grey[300]}`,
    overflowY: "auto",
    transform: "scale(1)",
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    [theme.breakpoints.up("md")]: {
      transform: "translateY(-50%)",
      display: "grid",
      gridTemplateAreas: '"banner" "stepper" "form"',
    },
    maxHeight: "calc(90vh - 64px)",
    [theme.breakpoints.down(600)]: {},
    // transition: theme.transitions.create(
    //   ["box-shadow", "transform", "background"],
    //   {
    //     duration: 500,
    //   }
    // ),
    "&:hover": {
      boxShadow: `8px 8px 14px ${theme.palette.grey[400]}, -8px 8px 14px ${theme.palette.grey[300]}`,
      // transition:
      //   "box-shadow 1500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,transform 1500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background 1500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important",
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
        // boxShadow: "0px 0px 5px #468cde, -0px -0px 5px #5cb6ff",
        boxShadow: "none",
      },
    },

    "&::before": {
      content: '""',
      position: "absolute",
      height: "calc(100% - 10px)",
      width: "calc(100% - 10px)",
      borderRadius: "4px",
      boxShadow: "2px 2px 5px #4386d4, -2px -2px 5px #5fbcff",
      transition: theme.transitions.create(["box-shadow"], {
        duration: 350,
      }),
      "&.hideButtons": {
        boxShadow: "none",
        transition: theme.transitions.create(["box-shadow"], {
          duration: 500,
        }),
      },
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
    "&.hideButtons": {
      // opacity: 0,
      backgroundColor: theme.palette.primary.main,
      boxShadow: "none",
      transition: theme.transitions.create(["box-shadow"], {
        duration: 500,
      }),
      "&::before": {
        boxShadow: "none",
        transition: theme.transitions.create(["box-shadow"], {
          duration: 500,
        }),
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
    [theme.breakpoints.down(1150)]: {
      padding: "32px 16px 24px 16px",
    },
  },
  formWrapper: {
    gridArea: "form",
    // minWidth: "min(780px, 75vw)",
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
      boxShadow: "inset 2px 2px 6px #cc540e, inset -2px -2px 6px #ff6c12",
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
    "&.hideButtons": {
      boxShadow: "none",
      transition: theme.transitions.create(["box-shadow"], {
        duration: 500,
      }),
      "&::before": {
        boxShadow: "none",
        transition: theme.transitions.create(["box-shadow"], {
          duration: 500,
        }),
      },
    },
  },
  nextButton: {
    boxShadow: "4px 4px 6px #cc540e, -4px -4px 6px #ff6c12",
    transition: theme.transitions.create(["box-shadow", "background-color"], {
      duration: 500,
    }),
    "&.hideButtons": {
      boxShadow: "none",
      borderRadius: 0,
      backgroundColor: theme.palette.secondary.main,
      transition: theme.transitions.create(["box-shadow", "background-color"], {
        duration: 500,
      }),
    },
  },
  // Not sure if I want to change the button styles for the submission... come back to this later
  // lastStepSubmitButton: {
  //   backgroundColor: `${theme.palette.success.main} !important`,
  //   // transition: theme.transitions.create(["box-shadow", "background-color"], {
  //   //   duration: 500,
  //   // }),
  // },
  // lastStepSubmitButtonLabel: {
  //   backgroundColor: theme.palette.success.main,
  //   transition: theme.transitions.create(["box-shadow", "background-color"], {
  //     duration: 500,
  //   }),
  // },
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
  const store = useStore();
  const [hasMenuOpen, setHasMenuOpen] = useState(false);
  const [paperLifted, setPaperLifted] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    !paperLifted && setTimeout(() => setPaperLifted(true), 300);
  }, []);

  const handleRecipeSubmission = () => {
    // TODO !!! Add validation here!!!
    // if (Object.keys(authenticateAddRecipeForm(formData)).every((i) => i)) {
    //   store.dispatch(addNewRecipe(formData));
    // }
    let data = { ...formData };
    if (formData.ingredient.length > 3) {
      data.ingredients.push(formData.ingredient);
      delete data.ingredient;
    }
    if (formData.direction.length > 3) {
      data.directions.push(formData.direction);
      delete data.direction;
    }
    console.log("Data => ", data);
    store.dispatch(addNewRecipe(data));
  };

  const handleNext = () => {
    // TODO validate before transition to next step
    if (activeStep === 2) {
      console.log("firing now");
      handleRecipeSubmission();
      return console.log("formData", formData);
    }
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <div>
      <Paper
        className={clsx(
          classes.paper,
          paperLifted && classes.addBoxShadow,
          "addBoxShadow"
        )}
        ref={ref}
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
              <GetStepContent
                activeStep={activeStep}
                formData={formData}
                setFormData={setFormData}
                handleFormChange={handleFormChange}
                placeHolder={placeHolder}
                setPlaceHolder={setPlaceHolder}
                hasMenuOpen={hasMenuOpen}
                setHasMenuOpen={setHasMenuOpen}
              />
            </div>
            <div className={classes.buttons}>
              {activeStep !== 0 && (
                <Button
                  onClick={handleBack}
                  // className={(classes.button, classes.backButton)}
                  classes={{
                    root: clsx(
                      classes.backButton,
                      hasMenuOpen && "hideButtons"
                    ),
                    label: clsx(
                      classes.backButtonLabel,
                      hasMenuOpen && "hideButtons"
                    ),
                  }}
                >
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                classes={{
                  root: clsx(
                    classes.button,
                    activeStep === steps.length - 1 &&
                      classes.lastStepSubmitButton,
                    hasMenuOpen && "hideButtons"
                  ),
                  label: clsx(
                    classes.nextButton,
                    activeStep === steps.length - 1 &&
                      classes.lastStepSubmitButtonLabel,
                    hasMenuOpen && "hideButtons"
                  ),
                }}
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

const mapStateToProps = (state, props) => ({
  props: props,
});

export default forwardRef(AddRecipeFormContainer);

const GetStepContent = forwardRef(
  (
    {
      activeStep,
      formData,
      setFormData,
      handleFormChange,
      placeHolder,
      setPlaceHolder,
      hasMenuOpen,
      setHasMenuOpen,
    },
    ref
  ) => {
    console.log("props, ref: ", activeStep, ref);
    // step = 0
    switch (activeStep) {
      case 0:
        return (
          <Grow in={true}>
            <StepOneForm
              formData={formData}
              handleFormChange={handleFormChange}
              setFormData={setFormData}
              placeHolder={placeHolder}
              setPlaceHolder={setPlaceHolder}
              // hasMenuOpen={hasMenuOpen}
              // setHasMenuOpen={setHasMenuOpen}
            />
          </Grow>
        );
      case 1:
        return (
          <Grow in={true}>
            <StepTwoForm
              formData={formData}
              handleFormChange={handleFormChange}
              setFormData={setFormData}
              hasMenuOpen={hasMenuOpen}
              setHasMenuOpen={setHasMenuOpen}
            />
          </Grow>
        );
      case 2:
        return (
          <Grow in={true}>
            <StepThreeForm
              formData={formData}
              handleFormChange={handleFormChange}
              setFormData={setFormData}
              hasMenuOpen={hasMenuOpen}
              setHasMenuOpen={setHasMenuOpen}
            />
          </Grow>
        );
      default:
        throw new Error("Unknown step");
    }
  }
);
