import {
  createReducer,
  createAction,
  current,
  applyMiddleware,
  configureStore,
  createSlice,
} from "@reduxjs/toolkit";
import { createStore } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import userReducer from "./userReducer";
import drawerReducer from "./drawerReducer";
import alertReducer from "./alertReducer";
import uiReducer from "./uiReducer";
import networkReducer from "./networkReducer";
import recipeReducer from "./recipeReducer";
import myGroceryReducer from "./myGroceryReducer";

const initialState = {};

const withDevtools = () => {
  let withTools = process.env.NODE_ENV !== "production" || true;
  return withTools;
};

const store = configureStore({
  reducer: {
    user: userReducer,
    recipes: recipeReducer,
    UI: uiReducer,
    drawer: drawerReducer,
    alert: alertReducer,
    network: networkReducer,
    myGroceries: myGroceryReducer,
  },
  devTools: () => withDevtools(),
});
if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
  window.store = store;
}

export default store;

const makeStore = (context) => store;

export const wrapper = createWrapper(makeStore);
