import * as Types from "./TYPES";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  dialog: {
    isOpen: false,
    contentText:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero ea optio ipsa facilis. Repellendus praesentium ullam delectus expedita, explicabo corrupti consequatur? Facilis ex praesentium harum at eum delectus porro obcaecati perferendis quod. Eos impedit fugiat alias ducimus incidunt rerum modi magni iusto dolore ipsa, excepturi eligendi pariatur, beatae quas aliquam!",
    title: "Let me do rad stuff",
    confirmation: null,
  },
  snackbar: {
    isOpen: false,
    variant: "success",
    hideIn: null,
    message: "",
  },
};

const modalReducer = createReducer(initialState, (builder) => {
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
      snackbar: { ...state.snackbar, isOpen: false },
    };
  });
});

export default modalReducer;
