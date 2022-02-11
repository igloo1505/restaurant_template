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
  currentRecipeDetails: {},
};

const filterById = (itemId, array) => {
  return array.filter((item) => item._id === itemId);
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.ADD_NEW_RECIPE_SUCCESS:
      let _myRecipes = [action.payload.recipe];
      if (state.myRecipes) {
        _myRecipes = [action.payload.recipe, ...state.myRecipes];
      }
      return {
        ...state,
        resetFormData: !state.resetFormData,
        myRecipe: _myRecipes,
      };
    case Types.GET_OWN_RECIPES_SUCCESS:
      return {
        ...state,
        myRecipes: action.payload._myRecipes,
      };
    case Types.SET_RECIPE_DETAILS_RECIPE:
      return {
        ...state,
        currentRecipeDetails: action.payload,
      };
    case Types.SUBMIT_RECIPE_REVIEW_SUCCESS:
      return {
        ...state,
        currentRecipeDetails: action.payload.updatedRecipe,
      };
    case Types.REMOVE_RECIPE_REVIEW_SUCCESS:
      return {
        ...state,
        currentRecipeDetails: action.payload.updatedRecipe,
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
    case Types.AUTO_LOGIN_SUCCESS:
    case Types.AUTHENTICATE_USER:
      return {
        ...state,
        myFavorites: action.payload.myFavorites,
        myBookmarks: action.payload.myBookmarks,
      };
    case Types.REMOVE_RECIPE_SUCCESS:
      return {
        ...state,
        myRecipes: state.myRecipes.filter(
          (r) => r._id !== action.payload.recipe._id
        ),
      };
    case Types.ADD_RECIPE_FAVORITE:
      let _myFavorites = [action.payload.recipeId];
      if (state.myFavorites) {
        _myFavorites = [...state.myFavorites, action.payload.recipeId];
      }
      return {
        ...state,
        myFavorites: _myFavorites,
      };
    case Types.REMOVE_RECIPE_FAVORITE:
      return {
        ...state,
        myFavorites: state.myFavorites.filter(
          (_f) => _f !== action.payload.recipeId
        ),
      };
    case Types.ADD_RECIPE_BOOKMARK:
      let newBookmarks = state.myBookmarks
        ? [...state.myBookmarks, action.payload.bookmarkedRecipe]
        : [action.payload.bookmarkedRecipe];
      return {
        ...state,
        myBookmarks: newBookmarks,
      };
    case Types.REMOVE_RECIPE_BOOKMARK:
      return {
        ...state,
        myBookmarks: state.myBookmarks.filter(
          (b) => b._id !== action.payload.recipeId
        ),
      };
    case Types.SUBMIT_RECIPE_REVIEW_SUCCESS:
      if (state?.myFavorites.includes(action.payload.review)) {
        return;
      }
      // TODO handle user update and recipe update in those reducers in the mornong.
      return {
        ...state,
        myRecipes: [],
        myFavorites: [],
      };
    default:
      return state;
  }
};
export default recipeReducer;
