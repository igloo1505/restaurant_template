import * as Types from "./TYPES";
import store from "./store";
import { createReducer } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  filters: [],
  myRecipes: null,
  // Return only id's for favorites and bookmarks
  myFavorites: null,
  myBookmarks: null,
  recipeImageUpload: null,
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
        myRecipes: action.payload._myRecipes,
      };
    case Types.ADD_RECIPE_IMAGE:
      return {
        ...state,
        myRecipes: [
          action.payload.updatedRecipe,
          ...state.myRecipes.filter(
            (r) => r._id !== action.payload?.updatedRecipe._id
          ),
        ],
      };
    case Types.SEND_UPLOAD_PROGRESS:
      return {
        ...state,
        recipeImageUpload: action.payload.progress,
      };
    case Types.REMOVE_RECIPE_SUCCESS:
      return {
        ...state,
        myRecipes: state.myRecipes.filter(
          (r) => r._id !== action.payload.recipe._id
        ),
      };
    default:
      return state;
  }
};
export default recipeReducer;
