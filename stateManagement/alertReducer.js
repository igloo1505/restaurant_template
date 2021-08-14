import * as Types from "./TYPES";
import store from "./store";
import { createReducer } from "@reduxjs/toolkit";

const useHorriblePracticeToResetStateAndAvoidTransitionIssue = () => {
  setTimeout(() => {
    // Horribly inefficient but I'm worried about more transition bugs if I leave this the way it was.
    store.dispatch({ type: Types.RESET_SNACKBAR });
  }, 500);
};

const initialState = {
  dialog: {
    isOpen: false,
    relevantId: null,
    title: "",
    variant: null,
    contentText:
      // "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero ea optio ipsa facilis. Repellendus praesentium ullam delectus expedita, explicabo corrupti consequatur? Facilis ex praesentium harum at eum delectus porro obcaecati perferendis quod. Eos impedit fugiat alias ducimus incidunt rerum modi magni iusto dolore ipsa, excepturi eligendi pariatur, beatae quas aliquam!",
      "",
    // isOpen: true,
    // relevantId: "6116020737c12f29bf3727c6",
    // title: "Are you sure?",
    // variant: "deleteRecipe",
    confirmation: {
      dismissAction: null,
      confirmAction: null,
    },
  },
  snackbar: {
    isOpen: false,
    transitionDirection: "up",
    // variant: "error" | "info" | "success" | "warning"
    variant: "success",
    hideIn: 5000,
    message: "",
    vertical: "bottom",
    horizontal: "center",
  },
  booleanSnackbar: {
    isOpen: false,
    transitionDirection: "up",
    variant: "success",
    hideIn: 5000,
    message: "",
    vertical: "bottom",
    horizontal: "center",
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
      dialog: {
        ...state.dialog,
        isOpen: false,
      },
    };
  });
  builder.addCase(Types.RESET_ALERT, (state, action) => {
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
    useHorriblePracticeToResetStateAndAvoidTransitionIssue();
    return {
      ...state,
      snackbar: {
        ...state.snackbar,
        isOpen: false,
      },
    };
  });
  builder.addCase(Types.RESET_SNACKBAR, (state, action) => {
    return {
      ...state,
      snackbar: {
        ...initialState.snackbar,
      },
    };
  });

  // START BOOLEAN SNACKBAR STUFF
  builder.addCase(Types.SHOW_BOOLEAN_SNACKBAR, (state, action) => {
    return {
      ...state,
      booleanSnackbar: {
        ...state.booleanSnackbar,
        ...action.payload,
        isOpen: true,
      },
    };
  });
  builder.addCase(Types.ADD_NEW_RECIPE_SUCCESS, (state, action) => {
    console.log("action: ", action);
    return {
      ...state,
      booleanSnackbar: {
        relevantId: action.payload?.recipe?._id,
        isOpen: true,
        transitionDirection: "up",
        variant: "success",
        hideIn: 5000,
        message: `${action.payload?.recipe.title} added!`,
        undoAction: "deleteRecipe",
        vertical: "bottom",
        horizontal: "center",
      },
    };
  });
  builder.addCase(Types.ADD_NEW_RECIPE_ERROR, (state, action) => {
    console.log("action: ", action);
    return {
      ...state,
      snackbar: {
        isOpen: true,
        transitionDirection: "down",
        variant: "error",
        hideIn: 5000,
        message: "Oh no. There was an error adding that recipe.",
        undoAction: "deleteRecipe",
        vertical: "top",
        horizontal: "center",
      },
    };
  });
  builder.addCase(Types.HIDE_BOOLEAN_SNACKBAR, (state, action) => {
    setTimeout(() => {
      // Horribly inefficient and probably dangerous but I'm worried about more transition bugs if I leave this.
      store.dispatch({ type: Types.RESET_BOOLEAN_SNACKBAR });
    }, 500);
    return {
      ...state,
      booleanSnackbar: {
        ...state.booleanSnackbar,
        isOpen: false,
      },
    };
  });
  builder.addCase(Types.RESET_BOOLEAN_SNACKBAR, (state, action) => {
    return {
      ...state,
      booleanSnackbar: {
        ...initialState.booleanSnackbar,
      },
    };
  });
  builder.addCase(Types.REMOVE_RECIPE_SUCCESS, (state, action) => {
    return {
      ...state,
      booleanSnackbar: {
        ...initialState.booleanSnackbar,
      },
      dialog: {
        ...initialState.dialog,
      },
      snackbar: {
        isOpen: true,
        transitionDirection: "right",
        variant: "success",
        hideIn: 3500,
        message: `${action.payload.recipe.title} was removed successfully.`,
        vertical: "bottom",
        horizontal: "left",
        undoAction: null,
      },
    };
  });
});

export default modalReducer;
