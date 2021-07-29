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
      ...action,
      isOpen: true,
    };
  });
  builder.addCase(Types.HIDE_MODAL, (state, action) => {
    return {
      ...initialState,
    };
  });
  builder.addCase(Types.TOGGLE_MODAL, (state, action) => {
    return {
      ...state,
      ...action,
      isOpen: !state.isOpen,
    };
  });
});

export default modalReducer;
