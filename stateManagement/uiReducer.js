import * as Types from "./TYPES";

const initialState = {
  isClient: false,
  alert: {
    alertText: "",
    alertType: "",
    isOpen: false,
  },
  addRecipe: {
    activeStep: 0,
    allowSubRecipe: false,
    formData: {},
    shortcut: {
      e: false,
      a: false,
      b: false,
      n: false,
      Meta: false,
      Shift: false,
    }
  },
  login: {
    isSignUp: false,
  },
  accountMenu: {
    el: null,
    shouldBeVisible: false,
  },
  settingsModal: {
    isOpen: false,
    settingKeysBackdrop: false,
  },
  Grocery_navbarMenu: {
    el: null,
    shouldBeVisible: false,
  },
  Bookmarks_navbarMenu: {
    el: null,
    shouldBeVisible: false,
  },
  mainDrawer: {
    open: false,
  },
  aboutMeFullScreenDialog: {
    open: false,
  },
  viewport: {
    navHeight: 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isXL: false,
    width: 0,
    height: 0,
  },
  notificationBanner: {
    isOpen: false,
    delay: 3000,
    variant: "secondary",
    message: "",
  },
  leftTab: {
    isOpen: true,
    tabs: [],
  },
  isEditing: false,
  errors: [],
};
const upperLimits = {
  mobile: 850,
  tablet: 1350,
  desktop: 1650,
  XL: 2400,
};
const getDeviceType = (w) => {
  //
  switch (true) {
    case w <= upperLimits.mobile:
      return "isMobile";
    case w <= upperLimits.tablet:
      return "isTablet";
    case w <= upperLimits.desktop:
      return "isDesktop";
    case w >= upperLimits.desktop:
      return "isXL";
    default:
      return null;
  }
};


export default function UIReducer(state = initialState, action) {
  switch (action.type) {
    // case SET_MODAL_CONTENT:
    //   return {
    //     ...state,
    //     alert: { ...state.alert },
    //     accountMenu: { ...state.accountMenu },
    //     leftTab: { ...state.leftTab },
    //   };
    case Types.IS_CLIENT:
      return {
        ...state,
        isClient: true,
      };

    case Types.SET_VIEWPORT_DIMENSIONS: {
      let device = getDeviceType(action.payload.width);
      //
      return {
        ...state,
        alert: { ...state.alert },
        viewport: {
          ...state.viewport,
          width: action.payload.width,
          height: action.payload.height,
          isMobile: device === "isMobile" ? true : false,
          isTablet: device === "isTablet" ? true : false,
          isDesktop: device === "isDesktop" ? true : false,
          isXL: device === "isXL" ? true : false,
        },
        leftTab: { ...state.leftTab },
        accountMenu: { ...state.accountMenu },
      };
    }
    case Types.SET_NAV_HEIGHT:
      return {
        ...state,
        viewport: { ...state.viewport, navHeight: action.payload },
        leftTab: { ...state.leftTab },
        alert: { ...state.alert },
        accountMenu: { ...state.accountMenu },
      };
    case Types.SET_ABOUTME_DIALOG:
      return {
        ...state,
        aboutMeFullScreenDialog: {
          open: action.payload,
        },
      };

    case Types.AUTHENTICATION_ERROR:
      return {
        ...state,
        letTab: { ...state.leftTab },
        alert: {
          alertText: "There was an error logging in.",
          alertType: "danger",
          isOpen: true,
        },
        isEditing: false,
        accountMenu: { ...state.accountMenu },
      };
    case Types.USER_ERROR:
      return {
        ...state,
        letTab: { ...state.leftTab },
        alert: {
          alertText: "An error occurred.",
          alertType: "danger",
          isOpen: true,
        },
        isEditing: false,
        accountMenu: { ...state.accountMenu },
      };
    case Types.REGISTER_NEW_USER:
      return {
        ...state,
        letTab: { ...state.leftTab },
        alert: {
          alertText: "Success.",
          alertType: "success",
          isOpen: true,
        },
        isEditing: false,
        accountMenu: { ...state.accountMenu },
      };
    case Types.REMOVE_USER:
      return {
        ...state,
        letTab: { ...state.leftTab },
        alert: {
          alertText: "User was removed.",
          alertType: "success",
          isOpen: true,
        },
        isEditing: false,
        accountMenu: { ...state.accountMenu },
      };

    case Types.TOGGLE_EDIT_STATE:
      return {
        ...state,
        letTab: { ...state.leftTab },
        alert: { ...state.alert },
        accountMenu: { ...state.accountMenu },
        isEditing: !state.isEditing,
      };
    // !! DO NOT DELETE ABOVE.

    // case Types.TOGGLE_MODAL:
    //   return {
    //     ...state,
    //     modal: {
    //       ...state.modal,
    //       isOpen: !state.modal.isOpen,
    //       wasDismissed: false,
    //       wasAccepted: false,
    //     },
    //     alert: { ...state.alert },
    //     leftTab: { ...state.leftTab },
    //     accountMenu: { ...state.accountMenu },
    //   };
    // case Types.TRIGGER_MODAL:
    // case Types.ERROR_WITH_MODAL:
    //   return {
    //     ...state,
    //     modal: {
    //       ...state.modal,
    //       modalText: action.payload.modalText,
    //       modalHeader: action.payload.modalHeader,
    //       isConfirmation: action.payload.isConfirmation,
    //       isOpen: action.payload.isOpen || true,
    //       wasDismissed: false,
    //       wasAccepted: false,
    //     },
    //     alert: { ...state.alert },
    //     leftTab: { ...state.leftTab },
    //     accountMenu: { ...state.accountMenu },
    //   };
    case Types.OPEN_DRAWER:
      return {
        ...state,
        mainDrawer: { ...state.drawer, open: true },
      };
    case Types.CLOSE_DRAWER:
      return {
        ...state,
        mainDrawer: { ...state.drawer, open: false },
      };
    case Types.SHOW_ACCOUNT_MENU:
      return {
        ...state,
        alert: { ...state.alert },
        leftTab: { ...state.leftTab },
        accountMenu: {
          ...state.accountMenu,
          el: action.payload,
          shouldBeVisible: true,
        },
      };
    case Types.SHOW_GROCERY_MENU:
      return {
        ...state,
        alert: { ...state.alert },
        leftTab: { ...state.leftTab },
        Grocery_navbarMenu: {
          ...state.Grocery_navbarMenu,
          el: action.payload,
          shouldBeVisible: true,
        },
        Bookmarks_navbarMenu: {
          ...initialState.Bookmarks_navbarMenu,
          shouldBeVisible: false,
        },
      };
    case Types.SHOW_BOOKMARK_MENU:
      return {
        ...state,
        alert: { ...state.alert },
        leftTab: { ...state.leftTab },
        Bookmarks_navbarMenu: {
          ...state.Bookmarks_navbarMenu,
          el: action.payload,
          shouldBeVisible: true,
        },
        accountMenu: { ...state.accountMenu, el: null, shouldBeVisible: false },
        Grocery_navbarMenu: {
          ...state.Grocery_navbarMenu,
          el: null,
          shouldBeVisible: false,
        },
      };
    case Types.DISPOSE_ACCOUNT_MENU:
      return {
        ...state,
        accountMenu: { ...state.accountMenu, el: null, shouldBeVisible: false },
      };
    case Types.DISPOSE_GROCERY_MENU:
      return {
        ...state,
        Grocery_navbarMenu: {
          ...state.Grocery_navbarMenu,
          el: null,
          shouldBeVisible: false,
        },
      };
    case Types.DISPOSE_BOOKMARK_MENU:
      return {
        ...state,
        Bookmarks_navbarMenu: {
          ...initialState.Bookmarks_navbarMenu,
          shouldBeVisible: false,
        },
      };
    case Types.TOGGLE_SIGNUP_FORM:
      return {
        ...state,
        login: { ...state.login, isSignUp: !state.login.isSignUp },
      };
    case Types.SET_ADD_RECIPE_STEP: {
      let _newStep = 0
      if (action.payload === "increase") {
        _newStep = state.addRecipe.activeStep < 2 ? state.addRecipe.activeStep + 1 : 2
      }
      if (action.payload === "decrease") {
        _newStep = state.addRecipe.activeStep > 0 ? state.addRecipe.activeStep - 1 : 0
      }
      if (parseInt(action.payload) >= 0) {
        _newStep = parseInt(action.payload)
      }

      return {
        ...state,
        addRecipe: {
          ...state.addRecipe,
          activeStep: _newStep,
        }
      };
    }
    case Types.SET_ALLOW_SUB_RECIPE: {

      return {
        ...state,
        addRecipe: {
          ...state.addRecipe,
          allowSubRecipe: action.payload
        }
      }
    }
    case Types.SET_ADD_RECIPE_FORM_DATA: {
      return {
        ...state,
        addRecipe: {
          ...state.addRecipe,
          formData: action.payload
        }
      }
    }
    case Types.TOGGLE_SETTINGS_MODAL: {
      return {
        ...state,
        settingsModal: {
          ...state.settingsModal,
          isOpen: !state.settingsModal.isOpen,
          ...(action?.payload?.isOpen && { isOpen: action.payload.isOpen })
        }
      }
    }
    // case Types.TOGGLE_ADD_RECIPE_KEYBOARD_SHORTCUTS: {
    //   return {
    //     ...state,
    //     settingsModal: {
    //       ...state.settingsModal,
    //       settingKeysBackdrop: false,
    //     }
    //   }
    // }
    case Types.TOGGLE_SET_KEYS_BACKDROP: {
      return {
        ...state,
        settingsModal: {
          ...state.settingsModal,
          settingKeysBackdrop: !state.settingsModal.settingKeysBackdrop,
          ...(action?.payload?.settingKeysBackdrop && { settingKeysBackdrop: action.payload.settingKeysBackdrop }),
          ...(action?.payload === "hide" && { settingKeysBackdrop: false })
        }
      }
    }
    case Types.SET_NEW_CURRENT_SHORTCUTS: {
      return {
        ...state,
        notificationBanner: {
          ...state.notificationBanner,
          ...action?.payload?.banner
        },
      }
    }
    case Types.HIDE_TOP_NOTIFICATION_BAR: {
      return {
        ...state,
        notificationBanner: {
          ...initialState.notificationBanner,
        }
      }
    }

    default:
      return state;
  }
}



