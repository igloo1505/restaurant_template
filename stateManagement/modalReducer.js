import * as Types from "./TYPES";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  dismissible: true,
  variant: null,
};

const modalReducer = createReducer(initialState, (builder) => {
  builder.addCase(Types.SHOW_MODAL, (state, action) => {
    return {
      ...state,
      isOpen: true,
    };
  });
  builder.addCase(Types.HIDE_MODAL, (state, action) => {
    return {
      ...state,
      isOpen: false,
    };
  });
  builder.addCase(Types.HIDE_ALERT, (state, action) => {
    return {
      ...state,
      isOpen: false,
    };
  });
});

export default modalReducer;
