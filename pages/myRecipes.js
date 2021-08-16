/* eslint-disable react/display-name */
import React, { useState, useEffect, forwardRef } from "react";
import { connect, useDispatch } from "react-redux";
import { wrapper } from "../stateManagement/store";
import Cookies from "cookies";
import Recipe from "../models/Recipe";
import User from "../models/User";
// import Ingredient from "../models/Ingredient";
// import User from "../models/User";
import {
  UnderNavbar,
  AdjustForDrawerContainer,
} from "../components/UIComponents";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import MyRecipes_leftSection from "../components/myRecipes/MyRecipes_leftSection";
import MyRecipes_rightSection from "../components/myRecipes/MyRecipes_rightSection";
import { connectDB } from "../util/connectDB_client_ish";
import * as Types from "../stateManagement/TYPES";
// import { deleteRecipe } from "../stateManagement/recipeActions";
// import * as Types from "../stateManagement/TYPES";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    width: "100%",
    display: "grid",
    gridGap: "1rem",
  },
}));

const myRecipes = ({ props, _myRecipes, recipes: { myRecipes }, user }) => {
  const dispatch = useDispatch();
  const [styles, setStyles] = useState({ gridTemplateColumns: "500px 1fr" });

  useEffect(() => {
    if (myRecipes.length === 0 && _myRecipes) {
      dispatch({
        type: Types.GET_OWN_RECIPES_SUCCESS,
        payload: { _myRecipes },
      });
    }
    //   Change width here
    // setStyles({ gridTemplateColumns: "500px 1fr" });
  }, []);
  const classes = useStyles();
  return (
    <div>
      <UnderNavbar />
      <AdjustForDrawerContainer>
        <div className={classes.container} style={styles}>
          <SlideComponentLeft>
            <MyRecipes_leftSection />
          </SlideComponentLeft>
          <SlideComponentRight>
            <MyRecipes_rightSection />
          </SlideComponentRight>
        </div>
      </AdjustForDrawerContainer>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    user: state.user,
    recipes: state.recipes,
    props: props,
  };
};

export default connect(mapStateToProps)(myRecipes);

const SlideComponentLeft = forwardRef((props, ref) => {
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
});

const SlideComponentRight = forwardRef((props, ref) => {
  return (
    <Slide
      direction="left"
      in={true}
      ref={ref}
      timeout={{ appear: 500, enter: 500, exit: 500 }}
      mountOnEnter
      unmountOnExit
    >
      {props.children}
    </Slide>
  );
});

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      let cookies = new Cookies(req, res);
      let token = cookies.get("token");
      let userId = cookies.get("userId");
      console.log("userId: ", userId);
      if (userId && token) {
        debugger;
        const { db } = await connectDB();
        let recipes = await Recipe.find({ createdBy: userId })
          .populate("ingredients")
          // .populate({ path: "createdBy", select: "user -oneTimePassword" })
          .populate("createdBy", { firstName: 1, lastName: 1, _id: 1 })
          .sort({
            // Newest first, or recipes[0]
            createdAt: "descending",
          });
        // BUG An apparently pretty well known issue with mongo and getServerSideProps causing serialization errors. Come back to this and see if can figure out a hack.
        // let jsonRecipes = JSON.stringify(recipes);
        // let _jsonRecipes = JSON.parse(jsonRecipes);
        // // console.log("jsonRecipes: ", _jsonRecipes, jsonRecipes);
        // store.dispatch({
        //   type: Types.GET_OWN_RECIPES_SERVER,
        //   // payload: JSON.parse(JSON.stringify(recipes)),
        //   payload: _jsonRecipes,
        //   // payload: recipes,
        // });
        return {
          props: {
            _myRecipes: JSON.parse(JSON.stringify(recipes)),
          },
        };
      }
    }
);
