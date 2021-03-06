import * as Types from "./TYPES";
import store from "./store";
import { createReducer } from "@reduxjs/toolkit";
import authMiddleware from '../util/authMiddleware';
import { returnShortcutArray, returnFilteredShortcutArray } from './keyboardShortcutArray'

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
  fullScreenRecipeSummary: {
    showRecipeSummary: false,
    relevantRecipe: null,
  },
  keyboardShortcuts: {
    show: false,
    shortcutMenuValue: "",
    shortCutArray: [],
    filteredShortcutArray: null,
  },
  subRecipe: {
    titles: [],
    title: "",
    isSubRecipe: -1,
    latestDirection: "right"
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
      subRecipe: {
        ...state.subRecipe,
        ...(action.payload?.currentSubRecipeIndex && {
          currentSubRecipeIndex: action.payload.currentSubRecipeIndex,
        }),
      },
      keyboardShortcuts: {
        ...state.keyboardShortcuts,
        show: false,
      }
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
    let _newArray = [...state.subRecipe.titles, state.subRecipe.title];
    return {
      ...state,
      subRecipe: {
        ...state.subRecipe,
        titles: _newArray,
        title: "",
        isSubRecipe: _newArray.length - 1,
      },
      dialog: {
        ...initialState.dialog,
      },
    };
  });

  builder.addCase(Types.REMOVE_SUB_RECIPE_INDEX, (state, action) => {
    let newArray = [
      ...state.subRecipe.titles.slice(0, action.payload),
      ...state.subRecipe.titles.slice(action.payload + 1),
    ];
    return {
      ...state,
      subRecipe: {
        ...state.subRecipe,
        titles: newArray,
        title: "",
        isSubRecipe: newArray.length - 1,
      },
      dialog: {
        ...initialState.dialog,
      },
    };
  });
  builder.addCase(Types.SET_SUB_RECIPE_VALUE, (state, action) => {
    return {
      ...state,
      subRecipe: {
        ...state.subRecipe,
        isSubRecipe: action.payload,
      },
    };
  });
  builder.addCase(Types.CLOSE_SUB_RECIPE_MODAL, (state, action) => {
    return {
      ...state,
      dialog: {
        ...state.dialog,
        isOpen: false,
      },
    };
  });
  builder.addCase(Types.LOOP_THROUGH_SUB_RECIPES, (state, action) => {
    let _isSubRecipe = 0;
    let latestDirection = action.payload === "leftKey" ? "right" : "left"
    if (action.payload === "rightKey") {

      _isSubRecipe =
        state.subRecipe.isSubRecipe > -1
          ? state.subRecipe.isSubRecipe - 1
          : state.subRecipe.titles.length - 1;
    }
    if (action.payload === "leftKey") {

      _isSubRecipe =
        state.subRecipe.isSubRecipe < state.subRecipe.titles.length - 1
          ? state.subRecipe.isSubRecipe + 1
          : -1;
    }

    return {
      ...state,
      subRecipe: {
        ...state.subRecipe,
        isSubRecipe: _isSubRecipe,
        latestDirection: latestDirection
      },
    };
  });
  builder.addCase(Types.SET_ADD_RECIPE_STEP, (state, action) => {
    return {
      ...state,
      keyboardShortcuts: {
        ...initialState.keyboardShortcuts,
        show: false,
      }
    };
  });
  builder.addCase(Types.TOGGLE_ADD_RECIPE_KEYBOARD_SHORTCUTS, (state, action) => {
    let _shouldShowShortcutModal = action.payload === "hide" ? false : !state.keyboardShortcuts.show
    if (action.payload?.src === "global" && typeof window !== "undefined") {
      window.sessionStorage.setItem("globalScListener", true)
    }
    return {
      ...state,
      keyboardShortcuts: {
        ...state.keyboardShortcuts,
        show: _shouldShowShortcutModal,
        ...(!_shouldShowShortcutModal && { ...initialState.keyboardShortcuts }),
        ...(!_shouldShowShortcutModal && { filteredShortcutArray: null }),
      }
    }
  });

  builder.addCase(Types.SET_SHORTCUT_MODAL_SEARCH_VALUE, (state, action) => {
    return {
      ...state,
      keyboardShortcuts: {
        ...state.keyboardShortcuts,
        searchValue: action.payload
      }
    };
  });
  builder.addCase(Types.FILTER_KEYBOARD_SHORTCUTS, (state, action) => {
    return {
      ...state,
      keyboardShortcuts: {
        ...state.keyboardShortcuts,
        filteredShortcutArray: action.payload
      }
    };
  });
  builder.addCase(Types.HIDE_SHORTCUT_MENU, (state, action) => {
    return {
      ...state,
      keyboardShortcuts: {
        ...initialState.keyboardShortcuts,
        show: state.keyboardShortcuts.show,
      }
    };
  });
  builder.addCase(Types.SHOW_RECIPE_SUMMARY_FULLSCREEN_MODAL, (state, action) => {
    return {
      ...state,
      // keyboardShortcuts: {
      //   ...initialState.keyboardShortcuts,
      // },
      fullScreenRecipeSummary: {
        ...state.fullScreenRecipeSummary,
        ...action?.payload,
        ...(!action?.payload?.showRecipeSummary && { showRecipeSummary: !state.fullScreenRecipeSummary.showRecipeSummary }),
      },
    };
  });


});

export default modalReducer;
