/* eslint-disable react/display-name */
import React, { useState, useEffect, forwardRef } from "react";
import { connect, useDispatch } from "react-redux";
import { wrapper } from "../stateManagement/store";
import Cookies from "cookies";
import mongoose from "mongoose";
import Recipe from "../models/Recipe";
// import GroceryItem from "../models/GroceryItem";
import User from "../models/User";
// import Ingredient from "../models/Ingredient";
import {
  UnderNavbar,
  AdjustForDrawerContainer,
} from "../components/UIComponents";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import MyRecipes_leftSection from "../components/myRecipes/MyRecipes_leftSection";
import MyRecipes_rightSection from "../components/myRecipes/MyRecipes_rightSection";
import { connectDB } from "../util/connectDB";
import * as Types from "../stateManagement/TYPES";
// mongoose.set("bufferCommands", false);
// import { deleteRecipe } from "../stateManagement/recipeActions";
// import * as Types from "../stateManagement/TYPES";
import { autoLoginOnFirstRequest } from "../util/autoLoginOnFirstRequest";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    width: "100%",
    display: "grid",
    gridGap: "1rem",
    gridTemplateColumns: "500px 1fr",
    // overflowY: "auto !important",
    // [theme.breakpoints.down("lg")]: {
    //   gridTemplateColumns: "1fr 1fr",
    // },
    [theme.breakpoints.down(960)]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flexStart",
      alignItems: "center",
    },
  },
}));

const myRecipes = ({
  props,
  _myRecipes,
  drawer: { isOpen: drawerOpen },
  recipes: { myRecipes },
  user,
  hasUser,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("_myRecipes: ", _myRecipes);
    if (!myRecipes && _myRecipes) {
      dispatch({
        type: Types.GET_OWN_RECIPES_SUCCESS,
        payload: { _myRecipes },
      });
    }
    //   Change width here
    // setStyles({ gridTemplateColumns: "500px 1fr" });
  }, []);
  useEffect(() => {
    if (hasUser) {
      dispatch({
        type: Types.AUTO_LOGIN_SUCCESS,
        payload: hasUser,
      });
    }
  }, [hasUser]);
  const classes = useStyles();
  return (
    <div>
      <UnderNavbar />
      <AdjustForDrawerContainer overflowHidden={true}>
        <div className={classes.container}>
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
    drawer: state.drawer,
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

// FIXME This worked until I started working with s3, but the uploads worked for a while and all of a sudden querying mongo from getServerSideProps stopped working. There seems to be a common issue with getServerSideProps and the BSON that mongo uses... but this shit worked until last night.
// I think this is an issue with MongoClient trying to import the fs module on the client side. I'll try with Mongoose connection but if that doesn't work will have to move this to seperate API if getServerSideProps is going to work.

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      let state = store.getState();
      console.log("req: ", req);
      let cookies = new Cookies(req, res);
      let hasUser = false;
      let token = cookies.get("token") || state?.user?.self?.token;
      let userId = cookies.get("userId") || state?.user?.self?._id;
      let rememberMe = cookies.get("rememberMe");
      console.log("rememberMe: ", rememberMe);
      console.log("userId: ", userId);
      state.user.self._id;
      if (!userId || !token) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
      if (userId && token) {
        console.log("userId && token: ", userId, token, rememberMe);
        // connectDB().then(async (client) => {
        if (rememberMe) {
          hasUser = await autoLoginOnFirstRequest(req, res);
          console.log("hasUser: ", hasUser);
        }
        // console.log("client: ", client);
        // console.log("ingredients: ", ingredients);
        let recipes = await mongoose
          .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
          })
          .then(async () => {
            let _recipes = await Recipe.find({ createdBy: userId })
              .populate("ingredients")
              .populate("createdBy", { firstName: 1, lastName: 1, _id: 1 })
              .limit(20)
              .sort({
                // Newest first, or recipes[0]
                createdAt: "descending",
              });
            console.log("recipes: ", _recipes);
            // BUG An apparently pretty well known issue with mongo and getServerSideProps causing serialization errors. Come back to this and see if can figure out a hack later.
            // });
            return _recipes;
          });
        return {
          props: {
            _myRecipes: JSON.parse(JSON.stringify(recipes)),
            hasUser: hasUser,
          },
        };
      }
    }
);
