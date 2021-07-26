import * as Types from "./TYPES";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  myRecipes: [],
  myFavorites: [],
  byCategory: {
    category: null,
    results: [],
  },
};

const recipeReducer = createReducer(initialState, (builder) => {
  builder.addCase(Types.SHOW_ALERT, (state, action) => {
    return {
      ...state,
      dialog: {
        ...state.dialog,
        ...action.payload,
        isOpen: true,
      },
    };
  });
  builder.addCase(Types.HIDE_ALERT, (state, action) => {
    return {
      ...state,
      dialog: initialState.dialog,
    };
  });
  builder.addCase(Types.ALERT_SUCCESS, (state, action) => {
    return {
      ...state,
      dialog: { ...state.dialog, isOpen: false, confirmation: true },
    };
  });
  builder.addCase(Types.ALERT_FAIL, (state, action) => {
    return {
      ...state,
      dialog: { ...state.dialog, isOpen: false, confirmation: false },
    };
  });
  builder.addCase(Types.SHOW_SNACKBAR, (state, action) => {
    return {
      ...state,
      snackbar: { ...state.snackbar, ...action.payload, isOpen: true },
    };
  });
  builder.addCase(Types.HIDE_SNACKBAR, (state, action) => {
    return {
      ...state,
      snackbar: { ...initialState.snackbar },
    };
  });
});

export default recipeReducer;
