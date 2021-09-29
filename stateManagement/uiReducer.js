import {
  OPEN_DRAWER,
  CLOSE_DRAWER,
  TOGGLE_EDIT_STATE,
  AUTHENTICATION_ERROR,
  SET_VIEWPORT_DIMENSIONS,
  REGISTER_NEW_USER,
  GET_ALL_USERS,
  SHOW_GROCERY_MENU,
  SET_ABOUTME_DIALOG,
  DISPOSE_GROCERY_MENU,
  DISPOSE_BOOKMARK_MENU,
  SHOW_BOOKMARK_MENU,
  USER_ERROR,
  REMOVE_USER,
  SET_NAV_HEIGHT,
  DISPOSE_ACCOUNT_MENU,
  SHOW_ACCOUNT_MENU,
  IS_CLIENT,
  TOGGLE_SIGNUP_FORM,
} from "./TYPES";

const initialState = {
  isClient: false,
  alert: {
    alertText: "",
    alertType: "",
    isOpen: false,
  },
  login: {
    isSignUp: false,
  },
  accountMenu: {
    el: null,
    shouldBeVisible: false,
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
  // console.log("Wwwww", w);
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
    case IS_CLIENT:
      return {
        ...state,
        isClient: true,
      };

    case SET_VIEWPORT_DIMENSIONS: {
      let device = getDeviceType(action.payload.width);
      // console.log("Device type", device);
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
    case SET_NAV_HEIGHT:
      return {
        ...state,
        viewport: { ...state.viewport, navHeight: action.payload },
        leftTab: { ...state.leftTab },
        alert: { ...state.alert },
        accountMenu: { ...state.accountMenu },
      };
    case SET_ABOUTME_DIALOG:
      return {
        ...state,
        aboutMeFullScreenDialog: {
          open: action.payload,
        },
      };

    // case TRIGGER_ALERT:
    //   return {
    //     ...state,
    //     leftTab: { ...state.leftTab },
    //     alert: action.payload,
    //     accountMenu: { ...state.accountMenu },
    //   };
    // case DISPOSE_ALERT:
    //   return {
    //     ...state,
    //     modal: { ...state.modal },
    //     leftTab: { ...state.leftTab },
    //     alert: initialState.alert,
    //     accountMenu: { ...state.accountMenu },
    //   };
    // case SET_MODAL_INSTANCE:
    //   return {
    //     ...state,
    //     modal: {
    //       ...state.modal,
    //       instance: action.payload,
    //       wasDismissed: false,
    //       wasAccepted: false,
    //     },
    //     alert: { ...state.alert },
    //     leftTab: { ...state.leftTab },
    //     accountMenu: { ...state.accountMenu },
    //   };
    // case MODAL_DISMISSED:
    //   return {
    //     ...state,
    //     modal: {
    //       ...state.modal,
    //       isOpen: false,
    //       wasDismissed: true,
    //       wasAccepted: false,
    //     },
    //     alert: { ...state.alert },
    //     leftTab: { ...state.leftTab },
    //     accountMenu: { ...state.accountMenu },
    //   };
    // case MODAL_CONFIRMED:
    //   return {
    //     ...state,
    //     modal: {
    //       ...state.modal,
    //       isOpen: false,
    //       wasDismissed: false,
    //       wasAccepted: true,
    //     },
    //     alert: { ...state.alert },
    //     leftTab: { ...state.leftTab },
    //     accountMenu: { ...state.accountMenu },
    //   };

    // case UPDATE_USER_INFO:
    //   return {
    //     ...state,
    //     modal: { ...state.modal },
    //     letTab: { ...state.leftTab },
    //     alert: {
    //       alertText: "User was updated successfully",
    //       alertType: "success",
    //       isOpen: true,
    //     },
    //     isEditing: !state.isEditing,
    //     accountMenu: { ...state.accountMenu },
    //   };
    // case EDIT_MENU_ITEM:
    //   return {
    //     ...state,
    //     modal: { ...state.modal },
    //     letTab: { ...state.leftTab },
    //     alert: {
    //       alertText: "Recipe was updated successfully",
    //       alertType: "success",
    //       isOpen: true,
    //     },
    //     isEditing: !state.isEditing,
    //     accountMenu: { ...state.accountMenu },
    //   };
    // !! DO NOT DELETE BELOW.
    case AUTHENTICATION_ERROR:
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
    case USER_ERROR:
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
    case REGISTER_NEW_USER:
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
    case REMOVE_USER:
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

    case TOGGLE_EDIT_STATE:
      return {
        ...state,
        letTab: { ...state.leftTab },
        alert: { ...state.alert },
        accountMenu: { ...state.accountMenu },
        isEditing: !state.isEditing,
      };
    // !! DO NOT DELETE ABOVE.

    // case TOGGLE_MODAL:
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
    // case TRIGGER_MODAL:
    // case ERROR_WITH_MODAL:
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
    case OPEN_DRAWER:
      return {
        ...state,
        mainDrawer: { ...state.drawer, open: true },
      };
    case CLOSE_DRAWER:
      return {
        ...state,
        mainDrawer: { ...state.drawer, open: false },
      };
    case SHOW_ACCOUNT_MENU:
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
    case SHOW_GROCERY_MENU:
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
    case SHOW_BOOKMARK_MENU:
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
    case DISPOSE_ACCOUNT_MENU:
      return {
        ...state,
        accountMenu: { ...state.accountMenu, el: null, shouldBeVisible: false },
      };
    case DISPOSE_GROCERY_MENU:
      return {
        ...state,
        Grocery_navbarMenu: {
          ...state.Grocery_navbarMenu,
          el: null,
          shouldBeVisible: false,
        },
      };
    case DISPOSE_BOOKMARK_MENU:
      return {
        ...state,
        Bookmarks_navbarMenu: {
          ...initialState.Bookmarks_navbarMenu,
          shouldBeVisible: false,
        },
      };
    case TOGGLE_SIGNUP_FORM:
      return {
        ...state,
        login: { ...state.login, isSignUp: !state.login.isSignUp },
      };
    default:
      return state;
  }
}
