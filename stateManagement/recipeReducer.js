import * as Types from "./TYPES";
import store from "./store";
import { createReducer } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  filters: [],
  myRecipes: [],
  myRecipesServer: [],
  myFavorites: [],
  myBookmarks: [],
  resetFormData: false,
  byCategory: {
    category: null,
    results: [],
  },
  error: null,
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.ADD_NEW_RECIPE_SUCCESS:
      return {
        ...state,
        resetFormData: !state.resetFormData,
        myRecipes: [action.payload.recipe, ...state.myRecipes],
      };
    case Types.GET_OWN_RECIPES_SUCCESS:
      console.log("initialState", state.myRecipes);
      console.log("payload", action.payload);
      return {
        ...state,
        // myRecipes: ["test"],
        myRecipes: action.payload._myRecipes,
      };
    case Types.GET_OWN_RECIPES_SERVER:
      console.log("initialState", state.myRecipes);
      console.log("payload", action.payload);
      return {
        ...state,
        // myRecipes
        // myRecipes:
        //        // state.myRecipes.length !== 0
        //   ? state.myRecipes
        //   : action.payload._myRecipes,
      };
    case HYDRATE:
      console.log("Hydrating", state, action.payload);
      return {
        ...state,
        // myRecipes: action.payload.recipe.myRecipes,
        // myRecipes: action.payload.recipe.myRecipes,
      };
    default:
      return state;
  }
};
export default recipeReducer;
