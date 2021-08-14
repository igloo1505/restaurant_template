import React, {
  Fragment,
  useState,
  useEffect,
  createRef,
  forwardRef,
} from "react";
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
import initialFormData from "../util/initialFormData";

// TODO check deviceHeight and if room, shift form downward and tilt banner along corner of form
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
    top: "50%",
    transform: "translate(-50%, -50%)",
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
  recipe: { resetFormData, myRecipes, myFavorites },
  // tryAutoLogin,
}) => {
  // const [slideIn, setSlideIn] = useState(false);
  const router = useRouter();
  //!!! The only reason half of this form state isn't in Redux is because I installed Apple's beta OS on my macbook and now Chrome just about starts it on fire... and Safari doesn't have **** for devtools.
  const [formData, setFormData] = useState({
    categories: [],
    title: `Recipe One`,
    imgUrl: null,
    description: `Some bomb ass recipe`,
    prepTime: "12",
    cookTime: "16",
    servings: "4",
    servingUnit: "Cups",
    directions: ["Add stuff to pan", "Take stuff out of pan"],
    direction: "",
    ingredients: [
      {
        text: "Item One",
        optional: false,
        amount: 1,
        unit: { long: "Tablespoons", short: "tbsp", key: "Volume" },
      },
      {
        text: "Item Two",
        optional: false,
        amount: 14,
        unit: { long: "Tablespoons", short: "tbsp", key: "Volume" },
      },
      {
        text: "Item Three",
        optional: true,
        amount: 140,
        unit: { long: "Cups", short: "cups", key: "Volume" },
      },
      {
        text: "Item Four",
        optional: true,
        amount: 1,
        unit: { long: "Cups", short: "cups", key: "Volume" },
      },
      {
        text: "Item Five",
        optional: true,
        amount: 1,
        unit: { long: "Cups", short: "cups", key: "Volume" },
      },
      {
        text: "Item Six",
        optional: true,
        amount: 1,
        unit: { long: "Cups", short: "cups", key: "Volume" },
      },
    ],
    ingredient: {
      text: "",
      optional: false,
      amount: 1,
      unit: { long: "Cups", short: "cups", key: "Volume" },
    },
  });
  useEffect(() => {
    // setFormData(initialFormData);
    setActiveStep(0);
  }, [resetFormData]);

  const [placeHolder, setPlaceHolder] = useState(false);
  const handleFormChange = (e) => {
    if (e) {
      if (e.target.name === "servingUnit") {
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
        <AdjustForDrawerContainer>
          <main
            className={clsx(
              classes.layout,
              drawerIsOpen && classes.layoutShifted
            )}
          >
            <SlideComponent>
              <AddRecipeFormContainer
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
            </SlideComponent>
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
  recipe: state.recipes,
});

export default connect(mapStateToProps)(AddRecipe);

// eslint-disable-next-line react/display-name
const SlideComponent = forwardRef(
  (props, ref) => {
    console.log("ref", ref);
    return (
      <Slide
        direction="right"
        in={true}
        ref={ref}
        timeout={{ appear: 500, enter: 500, exit: 500 }}
        mountOnEnter
        unmountOnExit
      >
        {props.children}
      </Slide>
    );
  }
  // )
);

// const _SlideComponent = ({ ...props }) => {
//   // console.log("ref", props, ref);
//   console.log("...props", props);
//   return (
//     <Slide
//       direction="right"
//       in={true}
//       ref={props.ref}
//       timeout={{ appear: 300, enter: 500, exit: 500 }}
//       mountOnEnter
//       unmountOnExit
//     >
//       {props.children}
//     </Slide>
//   );
// }
