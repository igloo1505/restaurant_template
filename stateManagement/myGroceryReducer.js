import * as Types from "./TYPES";
import store from "./store";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  myGroceries: [],
  myMealPlan: [],
};

const reducer = createReducer(initialState, (builder) => {
  // builder.addCase(Types.GET_OWN_RECIPES_SUCCESS, (state, action) => {
  //   return {
  //     ...state,
  //     myRecipes: action.payload.myRecipes,
  //   };
  // });
});

export default reducer;
