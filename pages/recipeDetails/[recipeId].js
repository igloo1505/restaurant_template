/* eslint-disable react/display-name */
import React, { Fragment, useState, useEffect, forwardRef } from "react";
import { connect, useDispatch } from "react-redux";
import Cookies from "cookies";
import mongoose from "mongoose";
import { autoLoginOnFirstRequest } from "../../util/autoLoginOnFirstRequest";
import * as Types from "../../stateManagement/TYPES";
import Recipe from "../../models/Recipe";
import User from "../../models/User";
import {
  UnderNavbar,
  AdjustForDrawerContainer,
} from "../../components/UIComponents";
import Details_Banner from "../../components/recipeDetails/Details_Banner";
import Details_Directions from "../../components/recipeDetails/Details_Directions";
import Details_Gallery from "../../components/recipeDetails/Details_Gallery";
import Details_Ingredients from "../../components/recipeDetails/Details_Ingredients";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme) => ({
  recipeDetailsOuterContainer: {
    height: "100%",
    width: "100%",
    // display: "grid",
    gridColumnGap: "10px",
    display: "flex",
    flexDirection: "column",
    // gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
  },
  upperWrapper: {
    width: "100%",
    // minHeight: "40%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  lowerWrapper: {
    width: "100%",
    height: "60%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
}));

const recipeDetailsById = ({
  UI,
  user,
  recipe,
  usersRecentRecipes,
  hasUser,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (hasUser) {
      dispatch({
        type: Types.AUTO_LOGIN_SUCCESS,
        payload: hasUser,
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
          <div className={classes.upperWrapper}>
            <Details_Gallery recipe={recipe} />
            <Details_Banner recipe={recipe} />
          </div>
          <div className={classes.lowerWrapper}>
            <Details_Ingredients recipe={recipe} />
            <Details_Directions recipe={recipe} />
          </div>
        </div>
      </AdjustForDrawerContainer>
    </Fragment>
  );
};

const mapStateToProps = (state, props) => ({
  user: state.user,
  UI: state.UI,
  // props: props,
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
        });
      if (rememberMe) {
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
  if (userId === _props?.recipe?._id) {
    _props.isOwnRecipe = true;
  }

  console.log("_props: ", inCookies, _props);
  if (!_props.usersRecentRecipes && !_props.recipe) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
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
