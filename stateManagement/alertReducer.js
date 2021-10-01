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
    titleColor: "primary",
    title: "",
    variant: null,
    contentText: "",
    confirmation: {
      dismissAction: null,
      confirmAction: null,
    },
  },
  subRecipe: {
    titles: [],
    title: "",
  },
  addImageModal: {
    relevantId: null,
    isOpen: false,
  },
  editLocationModal: {
    relevantId: null,
    isOpen: false,
  },
  skillLevelModal: {
    relevantId: null,
    isOpen: false,
  },
  addProfileImageModal: {
    relevantId: null,
    isOpen: false,
    userProfileImageUploadProgress: null,
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
  recipeReviewModal: {
    isOpen: false,
    relevantRecipe: null,
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
  builder.addCase(Types.SHOW_DELETE_REVIEW_MODAL, (state, action) => {
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
  builder.addCase(Types.SHOW_ADD_IMAGE_MODAL, (state, action) => {
    return {
      ...state,
      dialog: {
        isOpen: true,
        variant: "addRecipeImage",
        title: "Select an Image:",
        titleColor: "primary",
      },
      addImageModal: {
        isOpen: true,
        relevantId: action.payload.recipeId,
      },
    };
  });
  builder.addCase(Types.SHOW_ADD_PROFILE_IMAGE_MODAL, (state, action) => {
    return {
      ...state,
      dialog: {
        isOpen: true,
        variant: "addProfileImage",
        title: "Select an Image:",
        titleColor: "primary",
      },
      addProfileImageModal: {
        isOpen: true,
        relevantId: action.payload.userId,
      },
    };
  });
  builder.addCase(Types.SHOW_EDIT_LOCATION_MODAL, (state, action) => {
    return {
      ...state,
      dialog: {
        isOpen: true,
        variant: "editLocation",
        title: "Current Location:",
        titleColor: "primary",
      },
      editLocationModal: {
        isOpen: true,
        relevantId: action.payload.userId,
      },
    };
  });
  builder.addCase(Types.SHOW_EDIT_SKILL_MODAL, (state, action) => {
    return {
      ...state,
      dialog: {
        isOpen: true,
        variant: "editSkillLevel",
        title: "My Skill Level:",
        titleColor: "primary",
      },
      skillLevelModal: {
        isOpen: true,
        relevantId: action.payload.userId,
      },
    };
  });
  builder.addCase(Types.UPDATE_PROFILE_DATA_SUCCESS, (state, action) => {
    return {
      ...state,
      dialog: {
        ...initialState.dialog,
      },
      editLocationModal: {
        ...initialState.editLocationModal,
      },
    };
  });
  builder.addCase(Types.DISMISS_ADD_IMAGE_MODAL, (state, action) => {
    return {
      ...state,
      addImageModal: {
        isOpen: false,
        relevantId: null,
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
  builder.addCase(Types.ADD_RECIPE_IMAGE_ERROR, (state, action) => {
    console.log("action: ", action);
    return {
      ...state,
      snackbar: {
        isOpen: true,
        transitionDirection: "down",
        variant: "error",
        hideIn: 5000,
        message: "Oh no. Something went wrong.",
        vertical: "top",
        horizontal: "center",
      },
    };
  });
  builder.addCase(Types.ADD_RECIPE_IMAGE, (state, action) => {
    console.log("action: ", action);
    return {
      ...state,
      addImageModal: {
        ...initialState.addImageModal,
      },
      dialog: { ...initialState.dialog },
      snackbar: {
        isOpen: true,
        transitionDirection: "down",
        variant: "success",
        hideIn: 2000,
        message: "Image uploaded",
        vertical: "top",
        horizontal: "right",
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
  builder.addCase(Types.SHOW_RECIPE_REVIEW_MODAL, (state, action) => {
    return {
      ...state,
      recipeReviewModal: {
        ...state.recipeReviewModal,
        isOpen: true,
        relevantRecipe: action.payload,
      },
    };
  });
  builder.addCase(Types.HIDE_RECIPE_REVIEW_MODAL, (state, action) => {
    return {
      ...state,
      recipeReviewModal: {
        ...initialState.recipeReviewModal,
        isOpen: false,
      },
    };
  });
  builder.addCase(Types.SUBMIT_RECIPE_REVIEW_SUCCESS, (state, action) => {
    return {
      ...state,
      recipeReviewModal: {
        ...initialState.recipeReviewModal,
        isOpen: false,
      },
    };
  });
  builder.addCase(Types.SET_SUB_RECIPE_TITLE, (state, action) => {
    return {
      ...state,
      subRecipe: {
        ...state.subRecipe,
        title: action.payload,
      },
    };
  });
  builder.addCase(Types.SUBMIT_SUB_RECIPE_TITLE, (state, action) => {
    return {
      ...state,
      subRecipe: {
        ...state.subRecipe,
        titles: [...state.subRecipe.titles, state.subRecipe.title],
        title: "",
      },
      dialog: {
        ...initialState.dialog,
      },
    };
  });
  builder.addCase(Types.REMOVE_SUB_RECIPE_INDEX, (state, action) => {
    return {
      ...state,
      subRecipe: {
        ...state.subRecipe,
        titles: [
          ...state.subRecipe.titles.slice(0, action.payload),
          ...state.subRecipe.titles.slice(action.payload + 1),
        ],
        title: "",
      },
      dialog: {
        ...initialState.dialog,
      },
    };
  });
});

export default modalReducer;
