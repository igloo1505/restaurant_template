/* eslint-disable react/display-name */
import React, { Fragment, useState, useEffect, forwardRef } from "react";
import { connect, useDispatch } from "react-redux";
import Cookies from "cookies";
import mongoose from "mongoose";
import clsx from "clsx";
import { autoLoginOnFirstRequest } from "../../util/autoLoginOnFirstRequest";
import * as Types from "../../stateManagement/TYPES";
import Recipe from "../../models/Recipe";
import RecipeReview from "../../models/RecipeReview";
// import GroceryItem from "../../models/GroceryItem";
import User from "../../models/User";
import {
  UnderNavbar,
  AdjustForDrawerContainer,
} from "../../components/UIComponents";
import Details_Banner from "../../components/recipeDetails/Details_Banner";
import Details_Directions from "../../components/recipeDetails/Details_Directions";
import Details_Gallery from "../../components/recipeDetails/Details_Gallery";
import Details_Ingredients from "../../components/recipeDetails/Details_Ingredients";
import Details_RecipeReviews from "../../components/recipeDetails/Details_RecipeReviews";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme) => ({
  recipeDetailsOuterContainer: {
    // height: "100%",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "4fr 6fr",
    gridColumnGap: "10px",
    maxWidth: 1280,
    marginRight: "auto",
    marginLeft: "auto",
  },
  leftWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",

    marginLeft: "auto",
    marginRight: 0,
  },
  rightWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  recipeReviewContainer: {
    maxWidth: 1280,
    marginRight: "auto",
    marginLeft: "auto",
  },
}));

const recipeDetailsById = ({
  props: { UI, user, recipe: getServerRecipe, usersRecentRecipes, hasUser },
  user: {
    loggedIn,
    self: { _id: userId },
  },
  currentRecipe: { currentRecipeDetails },
  viewport: { width: deviceWidth },
}) => {
  console.log("getServerRecipe: ", getServerRecipe);
  const [recipe, setRecipe] = useState(getServerRecipe);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("currentRecipeDetails: ", currentRecipeDetails);
    if (currentRecipeDetails) {
      setRecipe(currentRecipeDetails);
    }
  }, [currentRecipeDetails]);
  useEffect(() => {
    if (hasUser && Boolean(!loggedIn || !userId)) {
      dispatch({
        type: Types.AUTO_LOGIN_SUCCESS,
        payload: hasUser,
      });
    }
    if (recipe) {
      dispatch({
        type: Types.SET_RECIPE_DETAILS_RECIPE,
        payload: recipe,
      });
    }
  }, [hasUser]);
  const classes = useStyles();
  console.log("recipe", recipe);
  return (
    <Fragment>
      <AdjustForDrawerContainer>
        <div
          className={classes.recipeDetailsOuterContainer}
          id="details-outer-container"
        >
          <div className={classes.leftWrapper}>
            {recipe.imgUrl && <Details_Gallery recipe={recipe} />}
            <Details_Ingredients recipe={recipe} />
          </div>
          <div className={classes.rightWrapper}>
            <Details_Banner recipe={recipe} />
            <Details_Directions recipe={recipe} />
          </div>
        </div>
        <div className={classes.recipeReviewContainer}>
          <Details_RecipeReviews
            recipeReviews={recipe.recipeReviews}
            recipeId={recipe._id}
          />
        </div>
      </AdjustForDrawerContainer>
    </Fragment>
  );
};

const mapStateToProps = (state, props) => ({
  user: state.user,
  UI: state.UI,
  viewport: state.UI.viewport,
  currentRecipe: state.recipes,
  props: props,
});

export default connect(mapStateToProps)(recipeDetailsById);

export const getServerSideProps = async (ctx) => {
  let _props = {};
  console.log("ctx: ", Object.keys(ctx));
  console.log("params: ", ctx.params);
  let { recipeId: _recipeId } = ctx.params;
  // console.log("req: ", ctx.req);
  // console.log("req.params: ", req.params);
  // let state = store.getState();
  let cookies = new Cookies(ctx.req, ctx.res);
  console.log("cookies: ", cookies.get("token"));
  console.log("cookies: ", cookies.get("userId"));
  let token = cookies.get("token");
  let userId = cookies.get("userId");
  let hasUser = false;
  let rememberMe = cookies.get("rememberMe");
  let inCookies = Boolean(token && userId);

  _props.sendRequest = !inCookies;
  let recipe = await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(async () => {
      let recipe = await Recipe.findById(_recipeId)
        .populate("ingredients")
        .populate("createdBy", {
          email: 1,
          firstName: 1,
          lastName: 1,
          _id: 1,
        })
        .populate({
          path: "recipeReviews",
          options: {
            limit: 10,
            sort: { created: -1 },
            // skip: req.params.pageIndex*10
          },
          populate: {
            path: "submittedBy",
            select:
              "firstName lastName _id -groceryList -myBookmarks -userProfileData",
          },
        });
      if (rememberMe) {
        console.log("rememberMe recipeId: ", rememberMe);
        hasUser = await autoLoginOnFirstRequest(ctx.req, ctx.res);
      }
      if (recipe) {
        _props.recipe = recipe;
        let usersRecentRecipes = await recipe.getUsersRecentRecipes();
        if (usersRecentRecipes) {
          _props.usersRecentRecipes = usersRecentRecipes;
        }
      }
    });
  console.log("_props: ", inCookies, _props);

  return {
    props: {
      recipe: JSON.parse(JSON.stringify(_props.recipe)) || null,
      usersRecentRecipes:
        JSON.parse(JSON.stringify(_props.usersRecentRecipes)) || null,
      sendRequest: _props.sendRequest,
      hasUser: hasUser,
    },
  };
};
