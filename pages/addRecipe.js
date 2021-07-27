import React, { Fragment, useState, useEffect, createRef } from "react";
import clsx from "clsx";
import axios from "axios";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Slide from "@material-ui/core/Slide";
import Copyright from "../components/Copyright";
import Loader from "../components/Loader";
import AddRecipeFormContainer from "../components/addRecipeFormContainer";
import {
  UnderNavbar,
  AdjustForDrawerContainer,
} from "../components/UIComponents";
// import Paper from "@material-ui/core/Paper";
// import Grow from "@material-ui/core/Grow";
// import Stepper from "@material-ui/core/Stepper";
// import Step from "@material-ui/core/Step";
// import StepLabel from "@material-ui/core/StepLabel";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import { StepOneForm } from "../components/addRecipeForms";
// import StepTwoForm from "../components/stepTwoAddRecipeForm";
// import {
//   ConnectorComponent,
//   StepIconComponent,
// } from "../components/AddRecipeStepper";
// import { tryAutoLogin } from "../stateManagement/userActions";
// import { autoLoginOnFirstRequest } from "../util/autoLoginOnFirstRequest";

// TODO check deviceheight and if room, shift form downward and tilt banner along corner of form
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    backgroundColor: "transparent",
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

  stepper: {
    padding: theme.spacing(3, 0, 5),
  },

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
  const ref = createRef();
  // const [slideIn, setSlideIn] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    servings: "",
    servingUnit: "cups",
    title: ``,
    description: ``,
    ingredients: [],
    ingredient: {
      text: "",
      optional: false,
    },
    directions: [],
    direction: "",
    prepTime: "",
    cookTime: "",
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
            <Slide
              direction="right"
              in={true}
              timeout={{ appear: 300, enter: 500, exit: 500 }}
              mountOnEnter
              unmountOnExit
            >
              <AddRecipeFormContainer
                ref={ref}
                activeStep={activeStep}
                steps={steps}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                formData={formData}
                setFormData={setFormData}
                handleFormChange={handleFormChange}
                placeHolder={placeHolder}
                setPlaceHolder={setPlaceHolder}
              />
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
