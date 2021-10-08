import * as Types from "./TYPES"
import { getAllRecipesFromUser } from "./recipeActions";
import store from "./store";

const initialState = {
  loggedIn: false,
  triedAutoLogin: false,
  allUsers: [],
  filtered: null,
  loading: false,
  self: {
    token: null,
    _id: null,
    userName: null,
    profileImgUrl: null,
  },
  userSettings: {
    allowKeyboardShortcuts: true,
    allowNotifications: true,
    allowRecipeReviews: true,
    keyboardShortcuts: [
      {
        key: "Shift",
        code: "ShiftLeft",
        keyCode: 16,
        isSpecialKey: true,
        isActive: false

      },
      {
        key: "Meta",
        code: "MetaLeft",
        keyCode: 91,
        isSpecialKey: true,
        isActive: false
      },
      {
        key: "i",
        code: "KeyI",
        keyCode: 73,
        isSpecialKey: false,
        isActive: false
      },
    ],
    isSettingShortcuts: false,
    currentActiveKeys: [],
    skListeners: {
      shiftKey: false,
      ctrlKey: false,
      metaKey: false,
      altKey: false,
    }
  },
  error: null,
};



export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case Types.AUTO_LOGIN_SUCCESS:
    case Types.AUTHENTICATE_USER:

      let newPayload = { ...action.payload };
      if (newPayload?.userProfileData) {
        delete newPayload.userProfileData;
      }
      return {
        ...state,
        loggedIn: true,
        triedAutoLogin: true,
        loading: false,
        self: newPayload,
      };
    case Types.REMOVE_RECIPE_REVIEW_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        triedAutoLogin: true,
        loading: false,
        self: action.payload.updatedUser,
      };
    case Types.LOGOUT:
      return initialState;
    case Types.AUTO_LOGIN_FAIL:
      return {
        ...state,
        loggedIn: false,
        triedAutoLogin: true,
        loading: false,
      };

    case Types.RETURN_SINGLE_ITEM:
      return {
        ...state,
        self: { ...state.self },
        filtered: state.allUsers.filter((u) => u._id === action.payload._id),
      };
    case Types.GET_ALL_USERS:
      return {
        ...state,
        self: { ...state.self },
        allUsers: action.payload.user,
      };
    case Types.UPDATE_USER_INFO:
      const filteredUsers = state.allUsers.filter(
        (u) => u._id !== action.payload._id
      );
      filteredUsers.push(action.payload);
      return {
        ...state,
        self: { ...state.self },
        allUsers: filteredUsers,
      };
    case Types.REMOVE_USER:
      let filter = state.allUsers.filter(
        (u) => u._id !== action.payload.user._id
      );
      return {
        ...state,
        self: { ...state.self },
        allUsers: filter,
      };
    case Types.USER_ERROR:
      return {
        ...state,
        self: { ...state.self },
        error: action.payload,
      };
    case Types.REGISTER_NEW_USER:
      // array of 10 users

      return {
        ...state,
        loggedIn: true,
        loading: false,
        allUsers: [...state.allUsers, action.payload._doc],
        self: action.payload,
      };
    case Types.AUTHENTICATION_ERROR:
      return {
        ...state,
        // loggedIn: false,
        allUsers: [],
        loading: false,
        self: { ...state.self },
        error: action.payload,
      };
    case Types.SET_CURRENT_ACTIVE_KEYS:
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          currentActiveKeys: !state.userSettings.isSettingShortcuts ? [] : action?.payload?.map((key) => {
            delete key.icon
            return key
          })
        }
      };
    case Types.SET_LISTENER_KEY:
      console.log("Setting set_listener_key with: ", action.payload);
      let eventData = action?.payload?._e

      console.log('eventData: ', eventData);

      eventData && delete action.payload._e

      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          skListeners: {
            ...state.userSettings.skListeners,
            ...action.payload
          }
        }
      };
    default:
      return state;
  }
}
