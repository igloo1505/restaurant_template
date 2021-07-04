import {
  createReducer,
  createAction,
  current,
  applyMiddleware,
  configureStore,
} from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import modalReducer from "./modalReducer";
import alertReducer from "./alertReducer";
import uiReducer from "./uiReducer";
import networkReducer from "./networkReducer";

const initialState = {};

const withDevtools = () => {
  let withTools = process.env.NODE_ENV !== "production" || true;
  return withTools;
};

const store = configureStore({
  reducer: {
    user: userReducer,
    UI: uiReducer,
    modal: modalReducer,
    alert: alertReducer,
    network: networkReducer,
  },
  devTools: () => withDevtools(),
});

export default store;
