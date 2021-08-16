/* eslint-disable react/display-name */
import React, { useState, useEffect, forwardRef } from "react";
import { connect, useDispatch } from "react-redux";
import { wrapper } from "../stateManagement/store";
import Cookies from "cookies";
import mongoose from "mongoose";
import Recipe from "../models/Recipe";
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
    console.log("_myRecipes: ", _myRecipes);
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

// FIXME This worked until I started working with s3, but the uploads worked for a while and all of a sudden querying mongo from getServerSideProps stopped working. There seems to be a common issue with getServerSideProps and the BSON that mongo uses... but this shit worked until last night.
// I think this is an issue with MongoClient trying to import the fs module on the client side. I'll try with Mongoose connection but if that doesn't work will have to move this to seperate API if getServerSideProps is going to work.

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      console.log("req: ", req);
      let cookies = new Cookies(req, res);
      let token = cookies.get("token");
      let userId = cookies.get("userId");
      console.log("userId: ", userId);
      if (userId && token) {
        console.log("userId && token: ", userId, token);
        // connectDB().then(async (client) => {
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
            // BUG An apparently pretty well known issue with mongo and getServerSideProps causing serialization errors. Come back to this and see if can figure out a hack.
            // });
            return _recipes;
          });
        return {
          props: {
            _myRecipes: JSON.parse(JSON.stringify(recipes)),
          },
        };
      }
    }
);
