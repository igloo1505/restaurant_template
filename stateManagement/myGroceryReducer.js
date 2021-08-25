import * as Types from "./TYPES";
import store from "./store";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  myGroceries: null,
  myMealPlan: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(Types.ADD_GROCERY_ITEM, (state, action) => {
    return {
      ...state,
      myGroceries: state.myGroceries
        ? [...state.myGroceries, action.payload.groceryItem]
        : [action.payload.groceryItem],
    };
  });
  builder.addCase(Types.AUTHENTICATE_USER, (state, action) => {
    return {
      ...state,
      myGroceries: action.payload.groceryList,
    };
  });
  builder.addCase(Types.AUTO_LOGIN_SUCCESS, (state, action) => {
    console.log("payload", action.payload.groceryList);
    return {
      ...state,
      myGroceries: action.payload.groceryList,
    };
  });
  builder.addCase(Types.REMOVE_GROCERY_ITEM, (state, action) => {
    return {
      ...state,
      myGroceries: state.myGroceries.filter(
        (g) => g._id !== action.payload.removedId
      ),
    };
  });
});

export default reducer;
