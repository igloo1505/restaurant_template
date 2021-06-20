import {
  createReducer,
  createAction,
  current,
  applyMiddleware,
  configureStore,
} from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import recipeReducer from "./recipeReducer";
import uiReducer from "./uiReducer";
import tacoReducer from "./tacoReducer";

const initialState = {};

const withDevtools = () => {
  let withTools = process.env.NODE_ENV !== "production" || true;
  return withTools;
};

const store = configureStore({
  reducer: {
    user: userReducer,
    UI: uiReducer,
    recipes: recipeReducer,
    tacos: tacoReducer,
  },
  devTools: () => withDevtools(),
});

export default store;
